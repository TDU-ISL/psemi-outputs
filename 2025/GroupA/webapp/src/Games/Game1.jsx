import { useState } from 'react';
import './Game1.css';

const Game1 = () => {
    const [step, setStep] = useState(1);
    const [accountName, setAccountName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [strengthReason, setStrengthReason] = useState('');
    const [errors, setErrors] = useState({ accountName: false, password: false, message: '' });

    const checkPasswordStrength = (password) => {
        const lengthCriteria = password.length >= 8;      // 8文字以上（基本条件）
        const longLengthCriteria = password.length >= 12; // 12文字以上（強い条件）
        const veryLongLengthCriteria = password.length >= 16; // 16文字以上（非常に強い条件）
        const numberCriteria = /\d/.test(password);       // 数字あり
        const lowercaseCriteria = /[a-z]/.test(password); // 小文字あり
        const uppercaseCriteria = /[A-Z]/.test(password); // 大文字あり
        const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password); // 記号あり
        const repeatCharCriteria = !/(.)\1{2,}/.test(password); // 同じ文字の連続を避ける
        const commonPatterns = ['123456', 'password', 'qwerty', 'abc123'];
        const containsCommonPattern = commonPatterns.some(pattern => password.toLowerCase().includes(pattern));

        let score = 0;
        if (lengthCriteria) score++;
        if (longLengthCriteria) score++;
        if (veryLongLengthCriteria) score++;
        if (numberCriteria) score++;
        if (lowercaseCriteria) score++;
        if (uppercaseCriteria) score++;
        if (specialCharCriteria) score++;
        if (repeatCharCriteria) score++;
        if (!containsCommonPattern) score++;

        if (score >= 9 && veryLongLengthCriteria) { // 16文字以上 + 高スコア
            return {
                strength: '非常に強い',
                reason: (
                    <p className="reason-text">
                        凄いね！完璧だよ！<br />
                        他のアカウントでも，この強度を目指してパスワードを設定してね！
                    </p>
                )
            };
        } else if (score >= 7 && longLengthCriteria) { // 12文字以上 + 高スコア
            return {
                strength: '強い',
                reason: (
                    <p className="reason-text">
                        もう少し工夫すれば，さらに強くできるよ！<br />
                        例えば，記号や大文字を加えてみたらどうかな？？
                    </p>
                )
            };
        } else if (score >= 5) { // 中程度
            return {
                strength: '中程度',
                reason: (
                    <p className="reason-text">
                        もう少し工夫できるといいね！<br />
                        記号や大文字を加えるとより強くなるよ！<br />
                        さらに長さを12文字以上にしてみたらどうかな？？
                    </p>
                )
            };
        } else {
            return {
                strength: '弱い',
                reason: (
                    <p className="reason-text">
                        パスワードが短すぎるかな？<br />
                        8文字以上で，数字や記号を加えて強化しよう！<br />
                        同じ文字の繰り返しを避けるようにしてね！
                    </p>
                )
            };
        }
    };

    const handleSubmit = async () => {
        const hasAccountError = accountName.trim() === '';
        const hasPasswordError = password.trim() === '';

        if (password.length > 20) {
            setErrors({
                accountName: hasAccountError,
                password: true,
                message: 'パスワードは最大20文字にしてください．'
            });
            return;
        }

        if (hasAccountError || hasPasswordError) {
            setErrors({
                accountName: hasAccountError,
                password: hasPasswordError,
                message: 'アカウント名とパスワードを入力してください．'
            });
            return;
        }

        setErrors({ accountName: false, password: false, message: '' });
        const result = checkPasswordStrength(password);

  try {
    const res = await fetch("/addAccount", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ username: accountName, password })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (e) {
    alert("保存失敗: " + e.message);
    return;
  }

        setFeedback(result.strength);        
        setStrengthReason(result.reason);

        if (result.strength === '強い' || result.strength === '非常に強い') {
            setStep(4);
        } else {
            setStep(3);
        }
    };

    const togglePasswordView = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="game-container">
            {step === 1 && (
                <div className="welcome-screen fade-in">
                    <h1>ようこそ！FriendNestへ！</h1>
                    <p className="question-text">みんなはどうやってパスワードを決めてる？<br />ここで強度を試してみよう！</p>
                    <hr />
                    <p>
                        最近新しくFriendNestってSNSが流行ってるみたい！<br />
                        どんなSNSだろう...？
                    </p>
                    <p>早速アカウントを作ってみよう！</p>
                    <button onClick={() => setStep(2)}>ゲームを始める！</button>
                </div>
            )}

            {step === 2 && (
                <form className="form-screen fade-in" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <h2>アカウント作成</h2>

                    {errors.message && (
                        <p className="error-message">{errors.message}</p>
                    )}

                    <label>アカウント名</label>
                    <input
                        type="text"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        placeholder="アカウント名を入力"
                        className={errors.accountName ? 'input-error' : ''}
                    />

                    <label>パスワード</label>
                    <div className="password-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="パスワードを入力"
                            className={errors.password ? 'input-error' : ''}
                        />
                        <button type="button" className="eye-button" onClick={togglePasswordView}>
                            <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </button>
                    </div>

                    <button type="submit">アカウント作成</button>
                </form>
            )}

            {step === 3 && (
                <div className="feedback-screen fade-in">
                    <h3>パスワード強度: {feedback}</h3>
                    <p>{strengthReason}</p>
                    <button onClick={() => setStep(2)}>もう一度試す</button>
                </div>
            )}

            {step === 4 && (
                <div className="success-screen fade-in">
                    <h2>おめでとう！</h2>
                    <p className="reason-text">
                        {feedback}パスワードが作れたよ！
                    </p>
                    {strengthReason}
                    <p>大学生活でも使用するパスワードに気を付けよう！</p>
                    <button onClick={() => window.location.href = '/webapp/app'}>ホームに戻る</button>
                </div>
            )}
        </div>
    );
};

export default Game1;
