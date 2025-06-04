package src;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.ServletException;
import java.io.IOException;

/**
 * ランキングをリセットするサーブレット
 * POST /resetRanking で呼び出す
 */
@WebServlet("/resetRanking")               // ← お好み（WebServer 側と揃えれば OK）
public class ResetServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        // DB の accounts テーブルを全削除
        AccountManager manager = new AccountManager();
        manager.resetAccounts();

        // 204 No Content を返すだけ
        resp.setStatus(HttpServletResponse.SC_NO_CONTENT);
    }
}
