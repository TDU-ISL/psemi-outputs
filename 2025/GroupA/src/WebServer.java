package src;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;


public class WebServer {

    public static void main(String[] args) throws Exception {
        // 1) ポート 8080 にバインド
        Server server = new Server(8080);

        // 2) コンテキスト / を用意
        ServletContextHandler ctx =
            new ServletContextHandler(ServletContextHandler.SESSIONS);
        ctx.setContextPath("/");

        // 3) サーブレットを登録
        ctx.addServlet(AccountServlet.class,  "/addAccount");
        ctx.addServlet(RankingServlet.class, "/api/ranking");
        ctx.addServlet(ResetServlet.class,   "/resetRanking");

        server.setHandler(ctx);

        // 4) 起動
        server.start();
        System.out.println("★Jetty started on http://localhost:8080");
        server.join();
    }
}