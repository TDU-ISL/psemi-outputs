// src/pages/MainApp.js
import React from 'react';
import ScenarioSlider from "../components/ScenarioSlider";
import './MainApp.css'; // 横スクロール用のスタイル

const MainApp = () => {
    return (
        <div style={{ overflowX: "hidden" }}>
            <div className="container mt-4 mb-4" style={{ paddingBottom: "10px" }}>
                <h2>ようこそ！情報セキュリティ研究室へ！</h2>
                <hr />
                <p>
                    ここでは，ゲームを通して<strong>情報セキュリティ</strong>の啓発活動を行います．<br />
                    全４つのシナリオに挑戦しよう！🎶
                </p>
                <p>
                    シナリオ①：パスワードの強度判定<br />
                    シナリオ②：フィッシングメールの判別<br />
                    シナリオ③：SNS投稿の危険性<br />
                    シナリオ④：アプリの過剰な権限要求
                </p>
            </div>

            {/* 横スクロール可能なスライダー形式のシナリオ一覧 */}
            <ScenarioSlider />
        </div>
    );
};

export default MainApp;
