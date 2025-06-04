import React, { useEffect, useState } from 'react';
import './Game2.css';

const Game2 = () => {
    const [questions, setQuestions] = useState([]);
    const [originalQuestions, setOriginalQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [step, setStep] = useState("loading");
    const [result, setResult] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(0);
    const [history, setHistory] = useState([]);
    //const [reviewMode, setReviewMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/questions.json`)
            .then(response => {
                if (!response.ok) throw new Error("ネットワークエラー");
                return response.json();
            })
            .then(data => {
                const dataWithIndex = data.map((q, i) => ({ ...q, originalIndex: i }));
                const shuffled = dataWithIndex.sort(() => 0.5 - Math.random());
                setQuestions(shuffled);
                setOriginalQuestions(dataWithIndex);
                setLoading(false);
                setStep("intro"); // 読み込み後はintroにする
            })
            .catch(err => {
                console.error("問題の読み込みに失敗しました:", err);
                setError(true);
                setLoading(false);
                setStep("error");
            });
    }, []);

    const handleAnswer = (userAnswer) => {
        const question = questions[current];
        const correctAnswer = question.isSafe;
        const correct = userAnswer === correctAnswer;

        setResult(correct ? "✅ 正解！" : "❌ 不正解！");
        setIsCorrect(correct);
        if (correct) setScore(score + 1);

        setHistory(prev => [
            ...prev,
            {
                index: question.originalIndex,
                userAnswer,
                correctAnswer,
                explanation: question.explanation
            }
        ]);

        setStep("result");
    };

    const nextQuestion = () => {
        if (current + 1 < questions.length) {
            setCurrent(current + 1);
            setStep("question");
            setResult(null);
        } else {
            setStep("finish");
        }
    };

    const startReviewMode = () => {
        const wrongIndexes = history
            .filter(h => h.userAnswer !== h.correctAnswer)
            .map(h => h.index);

        const uniqueIndexes = [...new Set(wrongIndexes)];
        const reviewQuestions = uniqueIndexes.map(i => ({
            ...originalQuestions[i],
            originalIndex: i
        }));

        if (reviewQuestions.length === 0) {
            setStep("done");
        } else {
            setQuestions(reviewQuestions);
            setCurrent(0);
            setScore(0);
            setHistory([]);
            //setReviewMode(true);
            setStep("question");
        }
    };

    if (loading) return <div className="game-container">読み込み中...</div>;
    if (error) return <div className="game-container">エラー：問題が読み込めませんでした。</div>;

    const question = questions[current];

    return (
        <div className="game-container">
            {step === "intro" && (
                <div className="fade-in">
                    <h1>ようこそ！ISL-Lookへ！</h1>
                    <p className="question-text">フィッシングメールを見抜く力どれだけある？<br />ここで試してみよう！</p>
                    <hr />
                    <p>
                        大学で使用するISL-Lookというメールソフトに，様々なメールが届きました．<br />
                        最近流行ってるフィッシングメールかも...？
                    </p>
                    <p>慎重に確認していこう...！</p>
                    <button onClick={() => setStep("question")}>ゲームを始める！</button>
                </div>
            )}

            {step === "question" && (
                <div className="fade-in">
                    <h2>フィッシングメール...？（{current + 1} / {questions.length}）</h2>
                    <div className="email-box">
                        <p><strong>差出人：</strong>{question.sender}</p>
                        <p><strong>件名：</strong>{question.subject}</p>
                        <pre style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
                            {question.body}
                        </pre>
                    </div>
                    <div className="button-group">
                        <button className="safe-button" onClick={() => handleAnswer(true)}>このメールは安全！</button>
                        <button className="danger-button" onClick={() => handleAnswer(false)}>このメールは危険！</button>
                    </div>
                </div>
            )}

            {step === "result" && (
                <div className="fade-in">
                    <div className={`feedback-box ${isCorrect ? '' : 'error'}`}>
                        <h3>{result}</h3>
                        <p>{question.explanation}</p>
                    </div>
                    <div className="button-group">
                        <button onClick={nextQuestion}>
                            {current + 1 === questions.length ? "結果を見る" : "次の問題へ"}
                        </button>
                    </div>
                </div>
            )}

            {step === "finish" && (
                <div className="fade-in">
                    <div className="feedback-box">
                        <h2>おつかれさま！どうだった？</h2>
                        <p>スコア：<strong>{score} / {questions.length}</strong></p>
                        <hr />
                        <h3>解答履歴：</h3>
                        <ul style={{ textAlign: "left", padding: "0 1em" }}>
                            {history.map((item, i) => (
                                <li key={i} style={{ marginBottom: "1em" }}>
                                    <strong>【問題{item.index + 1}】</strong>
                                    {item.userAnswer === item.correctAnswer ? " ✅ 正解" : " ❌ 不正解"}<br />
                                    <span>{item.explanation}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="button-group">
                        <button onClick={() => window.location.href = "/webapp/app"}>ホームに戻る</button>
                        <button onClick={startReviewMode}>復習をもう一度</button>
                    </div>
                </div>
            )}

            {step === "done" && (
                <div className="fade-in">
                    <div className="feedback-box">
                        <h2>おめでとう！全問クリア！</h2>
                        <p>完璧だね！もう復習する問題はないよ！</p>
                    </div>
                    <div className="button-group">
                        <button onClick={() => window.location.href = "/webapp/app"}>ホームに戻る</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Game2;
