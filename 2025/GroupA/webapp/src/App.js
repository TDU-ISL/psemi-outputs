import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // BootstrapのJSファイルをインポート
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from "./components/Layout"; // Layoutをインポート
import Game1 from './Games/Game1'; // ゲームページ
import Game2 from './Games/Game2'; // ゲームページ
import Game3 from './Games/Game3'; // ゲームページ
import Game4 from './Games/Game4'; // ゲームページ
import './index.css';
import MainApp from './pages/MainApp'; // MainAppをインポート
import Ranking from "./pages/Ranking"; // アナリティクスページ用コンポーネント
import Settings from "./pages/Settings"; // アナリティクスページ用コンポーネント


export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/webapp/app" element={<MainApp />} />
          <Route path="/webapp/app/ranking" element={<Ranking />} />
          <Route path="/webapp/app/settings" element={<Settings />} />
          <Route path="/webapp/app/game1" element={<Game1 />} />
          <Route path="/webapp/app/game2" element={<Game2 />} />
          <Route path="/webapp/app/game3" element={<Game3 />} />
          <Route path="/webapp/app/game4" element={<Game4 />} />
        </Routes>
      </Layout>
    </Router>
  );
}