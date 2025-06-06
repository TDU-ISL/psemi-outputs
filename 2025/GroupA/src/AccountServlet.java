package src;
import jakarta.servlet.ServletException;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;


@WebServlet("/addAccount")
public class AccountServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        // パスワード強度を数値スコア化（後述のcalculateScore関数を利用）
        int score = PasswordUtil.calculateScore(password);
        
        // AccountManagerを利用してDBに保存
        AccountManager manager = new AccountManager();
        manager.addAccount(username, password, score);
        
        // （必要に応じて）レスポンス処理、例: ランキングページへリダイレクト
        // resp.sendRedirect(req.getContextPath() + "/app/ranking");
        resp.setStatus(HttpServletResponse.SC_NO_CONTENT);
    }
}
