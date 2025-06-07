import { ProColumnType, ProTable } from "@ant-design/pro-components";
import { Hero } from "../../assets/types";
import heros from "../../assets/heros";
import {
  AWAKENING_TYPES,
  AWAKENING_TYPES_DATA,
  DISCOVERY_TYPES,
  ELEMENT_TYPES,
  JOB_TYPES,
} from "../../assets/consts";
import { StarFilled } from "@ant-design/icons";
import useTableSearch from "../../utils/antd-table-utils/useTableSearch";
import createFixValuesFilterProps from "../../utils/antd-table-utils/createFixValuesFilterProps";
import styled from "styled-components";

const StyledProTable = styled(ProTable<Hero>)`
  // 内容过长时允许左右滑动
  .ant-table-wrapper {
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

const HeroEncyclopediaPage = () => {
  const createColumnSearchProps = useTableSearch();
  const columns: ProColumnType<Hero>[] = [
    {
      title: "名称",
      dataIndex: "name",
      minWidth: 80,
      ...createColumnSearchProps("name"),
    },
    {
      title: "初始星级",
      dataIndex: "initialRate",
      minWidth: 65,
      render(value) {
        return new Array(value)
          .fill(undefined)
          .map((_, index) => <StarFilled key={index} />);
      },
      ...createFixValuesFilterProps(
        "initialRate",
        [1, 2, 3],
        [1, 2, 3].map((v) =>
          new Array(v)
            .fill(undefined)
            .map((_, index) => <StarFilled key={index} />)
        )
      ),
    },
    {
      title: "属性",
      dataIndex: "element",
      minWidth: 70,
      ...createFixValuesFilterProps("element", ELEMENT_TYPES),
    },
    {
      title: "职业",
      dataIndex: "job",
      minWidth: 70,
      ...createFixValuesFilterProps("job", JOB_TYPES),
    },
    {
      title: "每级觉醒提升",
      minWidth: 100,
      render(_dom, entity) {
        const increment =
          AWAKENING_TYPES_DATA[entity.awakening][entity.initialRate - 1];
        return `${entity.awakening} +${increment}${
          entity.awakening !== "攻击速度" ? "%" : ""
        }`;
      },
      ...createFixValuesFilterProps("awakening", AWAKENING_TYPES),
    },
    {
      title: "全体发现",
      dataIndex: "discovery_all",
      minWidth: 100,
      ...createFixValuesFilterProps("discovery_all", DISCOVERY_TYPES),
    },
  ];

  return (
    <StyledProTable
      dataSource={heros}
      rowKey="name"
      columns={columns}
      search={false}
    />
  );
};

export default HeroEncyclopediaPage;
