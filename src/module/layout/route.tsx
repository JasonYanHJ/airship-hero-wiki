import { BookOutlined, SmileFilled } from "@ant-design/icons";
import { ProLayoutProps } from "@ant-design/pro-components";
import { GetProp } from "antd";

const route: GetProp<ProLayoutProps, "route"> = {
  path: "/",
  routes: [
    {
      path: "/welcome",
      name: "欢迎",
      icon: <SmileFilled />,
    },
    {
      path: "/encyclopedia/hero",
      name: "英雄图鉴",
      icon: <BookOutlined />,
    },
  ],
};

export default route;
