// src/components/Navigation.js
import { faChartLine, faCog, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import "./SidebarMenu.css"; // ← サイドメニュー用CSSを読み込む

export default function Navigation() {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        document.body.classList.add("js");
        const timer = setTimeout(() => {
            document.body.classList.add("header-color");
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* ナビゲーションバー（ヘッダー） */}
            <header className="custom-header" role="banner">
                <div className="header-wrapper">
                    {/* 左：ハンバーガーメニュー */}
                    <div className="header-left">
                        <button
                            className="icon-wrapper"
                            aria-label="メニューを開く"
                            onClick={() => setMenuOpen(true)}
                        >
                            <img src={`${process.env.PUBLIC_URL}/icons/nav_open.svg`} alt="menu" />
                        </button>
                    </div>

                    {/* 右：ナビゲーションリンク */}
                    <div className="header-right">
                        <ul className="nav-links">
                            <li>
                                <Link to="/webapp/app">
                                    <FontAwesomeIcon icon={faHome} /> ホーム
                                </Link>
                            </li>
                            <li>
                                <Link to="/webapp/app/ranking">
                                    <FontAwesomeIcon icon={faChartLine} /> ランキング発表！
                                </Link>
                            </li>
                            <li>
                                <Link to="/webapp/app/settings">
                                    <FontAwesomeIcon icon={faCog} /> 設定ページ
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>

            {/* オーバーレイ（メニューが開いているとき） */}
            {menuOpen && <div className="sidebar-overlay" onClick={() => setMenuOpen(false)} />}

            {/* サイドメニュー本体 */}
            <aside className={`sidebar-menu ${menuOpen ? "open" : ""}`} role="navigation">
                <div className="sidebar-content">
                    {/* 閉じるボタン */}
                    <button
                        className="close-button"
                        aria-label="メニューを閉じる"
                        onClick={() => setMenuOpen(false)}
                    >
                        <img src={`${process.env.PUBLIC_URL}/icons/nav_close.svg`} alt="close" />
                    </button>

                    {/* ロゴとサブテキスト */}
                    <div className="sidebar-logo">
                        <img
                            src={`${process.env.PUBLIC_URL}/icons/ISL.svg`}
                            alt="ISL Logo"
                            className="sidebar-logo-image"
                        />
                        <p className="sidebar-subtext">
                            Tokyo Denki University．<br />
                            Information Security Lab．
                        </p>
                        <p className="sidebar-subtext-small">
                            Humans are the weakest link in the information security chain．
                        </p>
                    </div>

                    {/* メニュー項目 */}
                    <nav>
                        <ul className="sidebar-links">
                            <li><a href="/webapp/app">Top．</a></li>
                            <li><a href="https://blog.isl.im.dendai.ac.jp/" target="_blank" rel="noopener noreferrer">About Us．</a></li>
                            <li><a href="https://www.dendai.ac.jp/" target="_blank" rel="noopener noreferrer">University．</a></li>
                            <li><a href="https://www.isl.im.dendai.ac.jp/" target="_blank" rel="noopener noreferrer">Products．</a></li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
}
