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

const HeroEncyclopediaPage = () => {
  const createColumnSearchProps = useTableSearch();
  const columns: ProColumnType<Hero>[] = [
    {
      title: "名称",
      dataIndex: "name",
      ...createColumnSearchProps("name"),
    },
    {
      title: "初始星级",
      dataIndex: "initialRate",
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
      ...createFixValuesFilterProps("element", ELEMENT_TYPES),
    },
    {
      title: "职业",
      dataIndex: "job",
      ...createFixValuesFilterProps("job", JOB_TYPES),
    },
    {
      title: "每级觉醒提升",
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
      ...createFixValuesFilterProps("discovery_all", DISCOVERY_TYPES),
    },
  ];

  return (
    <ProTable<Hero>
      dataSource={heros}
      rowKey="name"
      columns={columns}
      search={false}
    />
  );
};

export default HeroEncyclopediaPage;
