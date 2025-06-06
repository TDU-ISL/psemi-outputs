// src/components/Game4App.js
import { useEffect, useState } from 'react';

const monsterList = [
    { name: "スライム", hp: 5, score: 10, emoji: "🟢" },
    { name: "ゴブリン", hp: 10, score: 20, emoji: "👹" },
    { name: "ドラゴン", hp: 20, score: 40, emoji: "🐉" }
];

const Game4App = ({ onFinish }) => {
    const [score, setScore] = useState(0);
    const [currentMonster, setCurrentMonster] = useState(generateMonster());
    const [currentHP, setCurrentHP] = useState(currentMonster.hp);
    const [timeLeft, setTimeLeft] = useState(30); // 制限時間（秒）

    function generateMonster() {
        const index = Math.floor(Math.random() * monsterList.length);
        return monsterList[index];
    }

    useEffect(() => {
        if (timeLeft <= 0) {
            if (onFinish) onFinish(score);
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft, onFinish, score]);

    const handleClick = () => {
        const attack = Math.floor(Math.random() * 4) + 1;
        const newHP = currentHP - attack;

        if (newHP <= 0) {
            setScore(score + currentMonster.score);
            const newMonster = generateMonster();
            setCurrentMonster(newMonster);
            setCurrentHP(newMonster.hp);
        } else {
            setCurrentHP(newHP);
        }
    };

    return (
        <div className="fade-in">
            <h2>🎮 TapMonster 改</h2>
            <p>制限時間内にできるだけ多くのモンスターを倒そう！</p>
            <div style={{ fontSize: '5em', margin: '1em 0' }}>
                {currentMonster.emoji}
            </div>
            <p><strong>{currentMonster.name}</strong>（HP: {currentHP}）</p>
            <button onClick={handleClick} style={{ padding: '1em 2em', fontSize: '1.2em' }}>
                攻撃！
            </button>
            <p>スコア: <strong>{score}</strong></p>
            <p>残り時間: {timeLeft} 秒</p>
        </div>
    );
};

export default Game4App;
