import { PageContainer, ProLayout } from "@ant-design/pro-components";
import route from "./route";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledProLayout = styled(ProLayout)`
  .ant-layout-sider.ant-pro-sider {
    background-color: white;
  }

  // 手机端减少两侧内边距
  @media only screen and (max-width: 768px) {
    .ant-pro-page-container-children-container {
      padding-inline: 12px;
    }
  }
`;

const Layout = () => {
  const navigate = useNavigate();

  return (
    <StyledProLayout
      title="飞艇Wiki"
      route={route}
      menuItemRender={(item, dom) => (
        <div onClick={() => item.path && navigate(item.path)}>{dom}</div>
      )}
    >
      <PageContainer>
        <Outlet />
      </PageContainer>
    </StyledProLayout>
  );
};

export default Layout;
