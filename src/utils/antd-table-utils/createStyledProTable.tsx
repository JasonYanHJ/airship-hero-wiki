import { ProTable } from "@ant-design/pro-components";
import styled from "styled-components";

export default function createStyledProTable<
  DataSourceType extends Record<string, unknown>
>() {
  return styled(ProTable<DataSourceType>)`
    // 内容过长时允许左右滑动
    .ant-table-container {
      overflow-x: auto;
      overflow-y: hidden;
    }
    @media only screen and (max-width: 768px) {
      // 手机端减少两侧内边距
      .ant-pro-card .ant-pro-card-body {
        padding-inline: 12px;
      }
    }
  `;
}
