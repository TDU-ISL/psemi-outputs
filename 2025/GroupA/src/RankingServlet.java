package src;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.ServletException;

import com.google.gson.Gson;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;


@WebServlet("/api/ranking")
public class RankingServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        AccountManager manager = new AccountManager();
        List<AccountRecord> records = manager.getAccountsByStrengthDesc();
        
        // JSON形式でレスポンスを返す
        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();
        out.print(new Gson().toJson(records));
        out.flush();
    }


// public void resetAccounts() {
//     String sql = "DELETE FROM accounts";
    
//     try (Connection conn = DriverManager.getConnection(DB_URL);
//          Statement stmt = conn.createStatement()) {
//         stmt.executeUpdate(sql);
//     } catch (SQLException e) {
//         e.printStackTrace();
//     }
// }
}