import React from "react";
import Header from "./Header"; // ヘッダーを読み込み
import Navigation from "./Navigation"; // ナビゲーションバーを読み込み

// Layoutコンポーネント: 子コンポーネントを受け取る
export default function Layout({ children }) {
    return (
        <div>
            {/* ヘッダー */}
            <Header />

            {/* ナビゲーションバー */}
            <Navigation />

            {/* メインコンテンツ */}
            <main style={{ marginTop: "5rem" }}>
                {children}
            </main>
        </div>
    );
}