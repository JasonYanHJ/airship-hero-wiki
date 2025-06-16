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
import FateEncyclopediaPage from "./module/encyclopedia/FateEncyclopediaPage";
import PersonalDataPage from "./module/personal/PersonalDataPage";
import { PersonalDataProvider } from "./module/personal/personalDataContext";
import FateToolPage from "./module/tool/fate/FateToolPage";
import JadeToolPage from "./module/tool/jade/JadeToolPage";
import OcrTestPage from "./module/ocr-test/OcrTestPage";

dayjs.locale("zh-cn");

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <PersonalDataProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/welcome" element={<WelcomePage />} />
              <Route
                path="/encyclopedia/hero"
                element={<HeroEncyclopediaPage />}
              />
              <Route
                path="/encyclopedia/fate"
                element={<FateEncyclopediaPage />}
              />
              <Route path="/tool/jade" element={<JadeToolPage />} />
              <Route path="/tool/fate" element={<FateToolPage />} />
              <Route path="/personal" element={<PersonalDataPage />} />
              <Route path="/ocr-test" element={<OcrTestPage />} />
            </Route>

            <Route path="/" element={<Navigate to="/welcome" replace />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </PersonalDataProvider>
    </ConfigProvider>
  );
};

export default App;
