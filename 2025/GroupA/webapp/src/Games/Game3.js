// src/Games/Game3.js
import React, { useEffect, useState } from 'react';
import './Game3.css';

const Game3 = () => {
    const [started, setStarted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [answer, setAnswer] = useState('');
    const [step, setStep] = useState('loading');
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(0);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (started) {
            fetch(`${process.env.PUBLIC_URL}/game3_questions.json`)
                .then(res => res.json())
                .then(data => {
                    const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 10);
                    setQuestions(shuffled);
                    setStep('question');
                })
                .catch(err => {
                    console.error('問題の読み込みに失敗しました:', err);
                    setStep('error');
                });
        }
    }, [started]);

    const handleSubmit = () => {
        const userAnswer = answer.trim().toLowerCase();

        const currentQuestion = questions[current];

        // 複数解答があるか、単一解答かに応じて処理
        const correctAnswers = Array.isArray(currentQuestion.answers)
            ? currentQuestion.answers
            : [currentQuestion.answer];

        const normalizedCorrectAnswers = correctAnswers.map(a =>
            typeof a === 'string' ? a.trim().toLowerCase() : ''
        );

        const correct = normalizedCorrectAnswers.includes(userAnswer);
        setIsCorrect(correct);
        if (correct) setScore(score + 1);

        setHistory(prev => [
            ...prev,
            {
                question: currentQuestion.question,
                userAnswer: answer,
                correctAnswer: currentQuestion.answer || correctAnswers[0],
                correctAnswers: Array.isArray(currentQuestion.answers) ? currentQuestion.answers : null
            }
        ]);

        setStep('result');
    };

    const nextQuestion = () => {
        setAnswer('');
        if (current + 1 < questions.length) {
            setCurrent(current + 1);
            setStep('question');
        } else {
            setStep('finish');
        }
    };

    if (!started) {
        return (
            <div className="game-container fade-in">
                <h2>📸 スマホからの情報漏洩を防げ！</h2>
                <p className="question-text">
                    SNSに投稿した写真から色んな情報が分かるって知ってた？<br />
                    どんな情報が読み取れるか試してみよう！
                </p>
                <hr />
                <p>あなたのSNSに，ある写真がアップされました.<br />でもその写真には意外な「手がかり」が...</p>
                <p>あなたはこの写真から何を読み取れる？<br />調査を開始して，隠された情報を探し出そう！</p>
                <div className="button-group">
                    <button onClick={() => setStarted(true)}>ゲームを始める！</button>
                </div>
            </div>
        );
    }

    if (step === 'loading') return <div className="game-container">読み込み中...</div>;
    if (step === 'error') return <div className="game-container">エラー：問題が読み込めませんでした。</div>;

    const currentQ = questions[current];

    return (
        <div className="game-container">
            {step === 'question' && (
                <div className="fade-in">
                    <h2>投稿（{current + 1} / {questions.length}）</h2>
                    <hr />
                    <p>{currentQ.caption}</p>
                    <img
                        src={process.env.PUBLIC_URL + currentQ.image}
                        alt="SNS投稿"
                        className="question-image"
                    />
                    <hr />
                    <p>{currentQ.question}</p>
                    <input
                        type="text"
                        value={answer}
                        onChange={e => setAnswer(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'Enter') handleSubmit();
                        }}
                        placeholder="答えを入力..."
                    />
                    <div className="button-group">
                        <button onClick={handleSubmit}>答える</button>
                    </div>
                </div>
            )}

            {step === 'result' && (
                <div className="fade-in">
                    <div className={`feedback-box ${isCorrect ? '' : 'error'}`}>
                        <h3>{isCorrect ? '✅ 正解！' : '❌ 不正解！'}</h3>
                        <p>
                            正解：
                            <strong>
                                {(Array.isArray(questions[current].answers)
                                    ? questions[current].answers
                                    : [questions[current].answer]
                                ).join(" / ")}
                            </strong>
                        </p>
                    </div>
                    <div className="button-group">
                        <button onClick={nextQuestion}>
                            {current + 1 === questions.length ? '結果を見る' : '次の問題へ'}
                        </button>
                    </div>
                </div>
            )}

            {step === 'finish' && (
                <div className="fade-in">
                    <div className="feedback-box">
                        <h2>おつかれさま！どうだった？</h2>
                        <p>スコア：{score} / {questions.length}</p>
                        <hr />
                        <h3>解答履歴：</h3>
                        <ul style={{ textAlign: 'left', padding: "0 1em" }}>
                            {history.map((item, i) => (
                                <li key={i} style={{ marginBottom: "1em" }}>
                                    <strong>【問題{i + 1}】</strong>
                                    {Array.isArray(item.correctAnswers)
                                        ? item.correctAnswers.map(a => a.trim().toLowerCase()).includes(item.userAnswer.trim().toLowerCase())
                                            ? " ✅ 正解"
                                            : " ❌ 不正解"
                                        : item.userAnswer.trim().toLowerCase() === item.correctAnswer.trim().toLowerCase()
                                            ? " ✅ 正解"
                                            : " ❌ 不正解"}<br />
                                    {item.question}<br />
                                    あなたの回答：{item.userAnswer}<br />
                                    正解：
                                    {Array.isArray(item.correctAnswers)
                                        ? item.correctAnswers.join(" / ")
                                        : item.correctAnswer}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="button-group">
                        <button onClick={() => setStep('summary2')}>おわりに</button>
                    </div>
                </div>
            )}

            {step === 'summary2' && (
                <div className="fade-in">
                    <h2>おわりに</h2>
                    <hr />
                    <p>
                        このシナリオでは，SNSに投稿された写真からどんな情報が読み取れるかを体験してもらったよ．
                        何気なく投稿してる写真にも，意外な“手がかり”が隠れてたね．
                    </p>
                    <div className="summary-points">
                        <ul>
                            <li>位置情報を消したつもりでも，写真1枚で居場所が特定される可能性がある．</li>
                            <li>知らぬ間に個人情報が外部に漏れてしまうリスクがある．</li>
                            <li>投稿する前に，写り込んでいる情報を見直すことがとても重要．</li>
                        </ul>
                    </div>
                    <p>
                        普段から「ちょっとした注意」を意識することで，情報漏洩のリスクを大きく減らすことができるよ．
                        これからも安心・安全なネット利用を心がけよう！
                    </p>
                    <div className="button-group">
                        <button onClick={() => window.location.href = "/webapp/app"}>ホームに戻る</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Game3;
