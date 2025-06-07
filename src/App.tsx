import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";
import "./App.css";
import Layout from "./module/layout/Layout";
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from "react-router-dom";
import PageNotFound from "./module/layout/PageNotFound";
import WelcomePage from "./module/welcome/WelcomPage";
import HeroEncyclopediaPage from "./module/encyclopedia/HeroEncyclopediaPage";

dayjs.locale("zh-cn");

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route
              path="/encyclopedia/hero"
              element={<HeroEncyclopediaPage />}
            />
          </Route>

          <Route path="/" element={<Navigate to="/welcome" replace />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
