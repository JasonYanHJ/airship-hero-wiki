import { ProColumnType, ProTable } from "@ant-design/pro-components";
import { Hero } from "../../assets/types";
import heros from "../../assets/heros";
import { AWAKENING_TYPES_DATA } from "../../assets/consts";
import { StarFilled } from "@ant-design/icons";

const HeroEncyclopediaPage = () => {
  const columns: ProColumnType<Hero>[] = [
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "初始星级",
      dataIndex: "initialRate",
      render(value) {
        return new Array(value)
          .fill(undefined)
          .map((_, index) => <StarFilled key={index} />);
      },
    },
    {
      title: "属性",
      dataIndex: "element",
    },
    {
      title: "职业",
      dataIndex: "job",
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
    },
    {
      title: "全体发现",
      dataIndex: "discovery_all",
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
