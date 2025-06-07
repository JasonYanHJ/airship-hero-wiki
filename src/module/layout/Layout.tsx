import { PageContainer, ProLayout } from "@ant-design/pro-components";
import route from "./route";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledProLayout = styled(ProLayout)`
  .ant-layout-sider.ant-pro-sider {
    background-color: white;
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
