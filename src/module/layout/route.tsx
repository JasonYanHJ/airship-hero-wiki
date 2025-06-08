import {
  BookOutlined,
  SearchOutlined,
  SmileFilled,
  UserOutlined,
} from "@ant-design/icons";
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
    {
      path: "/encyclopedia/fate",
      name: "缘分图鉴",
      icon: <BookOutlined />,
    },
    {
      path: "/tool/fate",
      name: "补缘分自查表",
      icon: <SearchOutlined />,
    },
    {
      path: "/personal",
      name: "个人数据",
      icon: <UserOutlined />,
    },
  ],
};

export default route;
