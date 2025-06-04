import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // BootstrapのJSファイルをインポート
import "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom"; // React Routerをインポート
import AccessLogs from "./components/AccessLogs"; // アクセスログ用
import AccessTrendChart from "./components/AccessTrendChart"; // アクセス数の推移チャート用
import FilterSearch from "./components/FilterSearch";
import Layout from "./components/Layout"; // Layoutをインポート
import ShodanModal from "./components/ShodanModal"; // Shodanモーダル用
import StatusDistributionChart from "./components/StatusDistributionChart"; // ステータスコードの分布チャート用
import './index.css';
import Analytics from "./pages/Analytics"; // アナリティクスページ用コンポーネント
import Settings from "./pages/Settings"; // 設定ページ用コンポーネント

function MainApp() {
    const [logs, setLogs] = useState([]);
    const [filterIp, setFilterIp] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [selectedIp, setSelectedIp] = useState(null);
    const [shodanInfo, setShodanInfo] = useState(null);
    const [accessTrend, setAccessTrend] = useState({});
    const [isFixed, setIsFixed] = useState(false);
    const [isFilterVisible, setIsFilterVisible] = useState(true);
    const [isLoadingShodan, setIsLoadingShodan] = useState(false);
    const [shodanErrorMessage, setShodanErrorMessage] = useState("");
    const [navBarHeight, setNavBarHeight] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const updateNavBarHeight = () => {
            const navBar = document.querySelector(".navbar");
            if (navBar) {
                console.log("Navbar height:", navBar.offsetHeight); // 高さを確認
                setNavBarHeight(navBar.offsetHeight);
            }
        };

        // 初回測定に遅延を追加（DOM描画が完全に終わってから）
        setTimeout(updateNavBarHeight, 0);

        // ウィンドウのリサイズ時にも高さを再計算
        window.addEventListener("resize", updateNavBarHeight);

        return () => {
            window.removeEventListener("resize", updateNavBarHeight);
        };
    }, []);

    // スクロール位置に応じてフィルタの固定状態を切り替える
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsFixed(scrollTop > 100); // 100px以上スクロールで固定
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/logs")
            .then((response) => {
                setLogs(response.data);
                const trend = {};
                response.data.forEach((log) => {
                    const date = new Date(log.date);
                    const minute = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
                    trend[minute] = (trend[minute] || 0) + 1;
                });
                setAccessTrend(trend);
            })
            .catch((error) => {
                console.error("Error fetching logs:", error);
            });
    }, []);

    const handleIpClick = (ip) => {
        if (ip === selectedIp) {
            return;
        }
        setSelectedIp(ip);
        setShodanInfo(null);
        setShodanErrorMessage(""); // エラーメッセージをクリア
        setIsLoadingShodan(true); // Shodanデータ取得中フラグを設定

        // 5秒後にタイムアウト処理を追加
        const timeoutId = setTimeout(() => {
            setIsLoadingShodan(false);
            setShodanErrorMessage("このIPアドレスに対する情報はShodanに登録されていません");
        }, 5000); // 5000ms = 5秒

        axios
            .get(`http://localhost:5000/api/shodan/${ip}`)
            .then((response) => {
                clearTimeout(timeoutId); // データ取得成功時はタイムアウトをクリア
                setShodanInfo(response.data);
                setIsLoadingShodan(false);
            })
            .catch((error) => {
                clearTimeout(timeoutId); // エラー時もタイムアウトをクリア
                console.error("Error fetching Shodan data:", error);
                setIsLoadingShodan(false);
                setShodanErrorMessage("このIPアドレスに対する情報はShodanに登録されていません"); // エラーメッセージを設定
            });
    };

    // ユーザー入力をサニタイズしてフィルタリングする
    const sanitizeInput = (input) => {
        // 不正な文字（例：<>など）を取り除く
        return input.replace(/[<>]/g, "").trim();
    };

    const filteredLogs = logs.filter((log) => {
        const sanitizedIp = sanitizeInput(filterIp);
        const sanitizedStatus = sanitizeInput(filterStatus);

        return (
            (!sanitizedIp || log.ip.includes(sanitizedIp)) &&
            (!sanitizedStatus || log.status.toString() === sanitizedStatus)
        );
    });

    const filteredStatusCounts = {};
    filteredLogs.forEach((log) => {
        filteredStatusCounts[log.status] =
            (filteredStatusCounts[log.status] || 0) + 1;
    });

    const statusColors = {
        200: "rgba(75, 192, 192, 0.6)",
        404: "rgba(255, 99, 132, 0.6)",
        500: "rgba(153, 102, 255, 0.6)",
        403: "rgba(255, 159, 64, 0.6)",
        302: "rgba(54, 162, 235, 0.6)",
        default: "rgba(201, 203, 207, 0.6)",
    };

    const backgroundColors = Object.keys(filteredStatusCounts).map(
        (status) => statusColors[status] || statusColors.default
    );

    const chartData = {
        labels: Object.keys(filteredStatusCounts),
        datasets: [
            {
                label: "HTTP ステータスコードの分布",
                data: Object.values(filteredStatusCounts),
                backgroundColor: backgroundColors,
            },
        ],
    };

    const trendLabels = Object.keys(accessTrend).sort(
        (a, b) => new Date(a) - new Date(b)
    );
    const trendData = trendLabels.map((key) => accessTrend[key]);

    const formattedLabels = trendLabels.map((key) => {
        const date = new Date(key);
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const formattedTime = date.getHours() % 12 || 12;
        const period = date.getHours() >= 12 ? "PM" : "AM";
        return `${dayNames[date.getDay()]} ${date.getDate()} ${formattedTime} ${period}`;
    });

    const accessTrendData = {
        labels: formattedLabels,
        datasets: [
            {
                label: "アクセス数の推移",
                data: trendData,
                backgroundColor: "rgba(54, 162, 235, 0.8)",
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div style={{ overflowX: "hidden" }}>
            {/* フィルタ検索コンポーネント */}
            <FilterSearch
                filterIp={filterIp}
                setFilterIp={setFilterIp}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                isFixed={isFixed}
                isFilterVisible={isFilterVisible}
                setIsFilterVisible={setIsFilterVisible} // 省略表示ボタンの制御
            />

            {/* /App時の説明セクション */}
            {(location.pathname === "/App" || location.pathname === "/app" || location.pathname.startsWith("/app/")) && (
                <div className="container mt-4 mb-4">
                    <h2 className="text-center">このアプリについて</h2>
                    <p className="text-center">
                        このダッシュボードでは、サーバーログの可視化を行い、HTTPステータスコードの分布やアクセス数の推移をリアルタイムで確認できます。
                    </p>
                    <p className="text-center">
                        アクセスログを分析することで、セキュリティ対策やインシデント対応を迅速に行うことが可能になります。
                    </p>
                </div>
            )}

            {/* チャートやログのコンポーネント */}
            <div className="container-fluid mt-5 pt-5" style={{ marginTop: `${navBarHeight}px` }}>
                <StatusDistributionChart chartData={chartData} chartOptions={chartOptions} />
                <AccessTrendChart accessTrendData={accessTrendData} chartOptions={chartOptions} />
                <AccessLogs filteredLogs={filteredLogs} handleIpClick={handleIpClick} />
            </div>

            {/* Shodanモーダル */}
            {selectedIp && (
                <ShodanModal
                    selectedIp={selectedIp}
                    isLoading={isLoadingShodan}
                    shodanInfo={shodanInfo}
                    setSelectedIp={setSelectedIp}
                    shodanErrorMessage={shodanErrorMessage}
                />
            )}
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <Layout> {/* Layoutで全体をラップ */}
                <Routes>
                    <Route path="/App" element={<MainApp />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </Layout>
        </Router>
    );
}
