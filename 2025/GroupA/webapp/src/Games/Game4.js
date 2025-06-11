import { useEffect, useState } from 'react';
import './Game4.css';

const Game4 = () => {
  const [questions, setQuestions] = useState([]);
  const [originalQuestions, setOriginalQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [step, setStep] = useState('loading');
  const [result, setResult] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // JSON 読み込み
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/permissions.json`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        const withIndex = data.map((q, i) => ({ ...q, originalIndex: i }));
        setQuestions(withIndex);
        setOriginalQuestions(withIndex);
        setLoading(false);
        setStep('intro');
      })
      .catch(() => {
        setError(true);
        setLoading(false);
        setStep('error');
      });
  }, []);

  // 判定処理
  const handleAnswer = (userAnswer) => {
    const q = questions[current];
    const correct = userAnswer === q.isSafe;
    setResult(correct ? '✅ 正解！' : '❌ 不正解！');
    setIsCorrect(correct);
    if (correct) setScore(score + 1);

    setHistory((prev) => [
      ...prev,
      {
        index: q.originalIndex,
        userAnswer,
        correctAnswer: q.isSafe,
        explanation: q.explanation,
      },
    ]);
    setStep('result');
  };

  const nextQuestion = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setStep('question');
      setResult(null);
    } else {
      setStep('finish');
    }
  };

  if (loading) return <div className="game-container">読み込み中...</div>;
  if (error) return <div className="game-container">エラー：問題が読めませんでした</div>;

  const q = questions[current];

  return (
    <div className="game-container">
      {step === 'intro' && (
        <div className="fade-in">
          <h1>アプリの権限、ちゃんと見てる？</h1>
          <p className="question-text">
            インストール時の「アクセス許可」に潜むリスクをクイズ形式でチェック！
          </p>
          <button onClick={() => setStep('question')}>スタート！</button>
        </div>
      )}

      {step === 'question' && (
        <div className="fade-in">
          <h2>権限クイズ（{current + 1} / {questions.length}）</h2>
          <div className="permission-box">
            <ul>
              {q.permissions.map((perm, i) => (
                <li key={i}>{perm}</li>
              ))}
            </ul>
          </div>
          <div className="button-group">
            <button
              className="safe-button"
              onClick={() => handleAnswer(true)}
            >
              妥当な権限
            </button>
            <button
              className="danger-button"
              onClick={() => handleAnswer(false)}
            >
              過剰な権限
            </button>
          </div>
        </div>
      )}

      {step === 'result' && (
        <div className="fade-in">
          <div className={`feedback-box ${isCorrect ? '' : 'error'}`}>
            <h3>{result}</h3>
            <p>{q.explanation}</p>
          </div>
          <button onClick={nextQuestion}>
            {current + 1 === questions.length ? '結果を見る' : '次の問題へ'}
          </button>
        </div>
      )}

      {step === 'finish' && (
        <div className="fade-in">
          <h2>終了！スコア：{score} / {questions.length}</h2>
          <ul className="history">
            {history.map((h, i) => (
              <li key={i}>
                <strong>【問題 {h.index + 1}】</strong>
                {h.userAnswer === h.correctAnswer ? ' ✅' : ' ❌'} – {h.explanation}
              </li>
            ))}
          </ul>
          <button onClick={() => window.location.href = '/webapp/app'}>ホームへ</button>
        </div>
      )}
    </div>
  );
};

export default Game4;
