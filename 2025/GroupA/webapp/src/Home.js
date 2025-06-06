// src/Home.js
import React from 'react';
import './Home.css'; // 独自スタイルを使用する場合はこのファイルを作成

const Home = () => {
    return (
        <div className="home">
            <h1>ようこそ！</h1>
            <p>東京電機大学，情報セキュリティ研究室へ！．</p>
            <a href="/webapp/app" className="App-link">ゲームを始める✨</a>
        </div>
    );
};

export default Home;

//使っていないファイル．