// import React from "react";

// function Ranking() {
// 　return (
//     <div>
//     　<h2>ランキング発表！👑</h2>
//     　<p>ここでは，ゲームの結果をランキング形式で発表します．</p>
//     </div>
// 　);
// }

// export default Ranking;

import { useEffect, useState } from 'react';
function Ranking() {
    const [rankingList, setRankingList] = useState([]);
    useEffect(() => {
        fetch('/api/ranking')
          .then(res => res.json())
          .then(data => setRankingList(data))
          .catch(err => console.error(err));
    }, []);

    
    if (!rankingList.length) return <p>ランキングがありません</p>;

    return (
        <div>
          <h2>パスワード強度ランキング</h2>
          <table>
            <thead><tr><th>順位</th><th>ユーザー名</th><th>強度スコア</th></tr></thead>
            <tbody>
              {rankingList.map((rec, index) => (
                <tr key={rec.name}>
                  <td>{index + 1}</td>
                  <td>{rec.name}</td>
                  <td>{rec.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    );
}
export default Ranking;
