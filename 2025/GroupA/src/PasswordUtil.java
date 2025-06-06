package src;
public class PasswordUtil {
    // パスワード強度スコアを計算する
    public static int calculateScore(String password) {
        if (password == null || password.isEmpty()) return 0;
        int score = 0;
        
        // 文字種チェック
        boolean hasLower = password.matches(".*[a-z].*");
        boolean hasUpper = password.matches(".*[A-Z].*");
        boolean hasDigit = password.matches(".*\\d.*");
        boolean hasSymbol = password.matches(".*[^A-Za-z0-9].*");
        if (hasLower) score += 10;
        if (hasUpper) score += 10;
        if (hasDigit) score += 10;
        if (hasSymbol) score += 10;
        
        // 長さチェック
        int length = password.length();
        if (length >= 16) {
            score += 30;
        } else if (length >= 12) {
            score += 20;
        } else if (length >= 8) {
            score += 10;
        } else if (length < 5) {
            score -= 20;  // 極端に短い場合の減点
        }
        
        // 構成の偏りチェック
        if ((hasLower || hasUpper) && !hasDigit && !hasSymbol) {
            // 英字のみ
            score -= 10;
        }
        if (!hasLower && !hasUpper && hasDigit && !hasSymbol) {
            // 数字のみ
            score -= 10;
        }
        // キーボードの典型的な連続パターンをチェック（簡易版）
        String lower = password.toLowerCase();
        String[] commonSeq = {"abcdefghijklmnopqrstuvwxyz", "0123456789", "qwertyuiop", "asdfghjkl", "zxcvbnm"};
        for (String seq : commonSeq) {
            if (seq.contains(lower)) {
                score -= 10;
                break;
            }
        }
        
        // 辞書チェック（簡易版: よくある単語やパスワード）
        String[] commonWords = {"password", "123456", "qwerty", "abc123", "letmein", "admin"};
        for (String w : commonWords) {
            if (lower.equals(w)) {
                return 0;  // よくあるパスワードなら強度を0に
            }
            if (lower.contains(w)) {
                score -= 30;
                break;
            }
        }
        
        // スコアを0〜100の範囲に丸める
        if (score < 0) score = 0;
        if (score > 100) score = 100;
        return score;
    }
}
