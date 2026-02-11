import { ProLayout } from "@ant-design/pro-components";
import route from "./route";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledProLayout = styled(ProLayout)`
  .ant-layout-sider.ant-pro-sider {
    background-color: white;
  }

  // 手机端减少两侧内边距
  @media only screen and (max-width: 768px) {
    .ant-page-header {
      padding-inline: 24px;
    }
    .ant-pro-page-container-children-container {
      padding-inline: 12px;
    }
  }
`;

const Layout = () => {
  const navigate = useNavigate();

  return (
    <StyledProLayout
      // 使用HashRouter时的功能适配
      location={{ pathname: window.location.hash.slice(1) }}
      logo={<img src="https://h5-res.sjzt2020.com/20250619/origin/role_info.png" alt="logo" style={{ height: 32 }} />}
      title="飞艇Wiki"
      route={route}
      menuItemRender={(item, dom) => (
        <div onClick={() => item.path && navigate(item.path)}>{dom}</div>
      )}
    >
      <Outlet />
    </StyledProLayout>
  );
};

export default Layout;
