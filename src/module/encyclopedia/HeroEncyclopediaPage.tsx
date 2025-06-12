import { PageContainer, ProColumnType } from "@ant-design/pro-components";
import { Hero } from "../../assets/types";
import heros, { getAwakeningDisplayString } from "../../assets/heros";
import {
  AWAKENING_TYPES,
  DISCOVERY_TYPES,
  ELEMENT_TYPES,
  JOB_TYPES,
  RATE_UP_TYPES,
  TYPE_TAG_COLOR,
} from "../../assets/consts";
import { StarFilled } from "@ant-design/icons";
import useTableSearch from "../../utils/antd-table-utils/useTableSearch";
import createFixValuesFilterProps from "../../utils/antd-table-utils/createFixValuesFilterProps";
import createStyledProTable from "../../utils/antd-table-utils/createStyledProTable";
import { Space, Tag } from "antd";

const StyledProTable = createStyledProTable<Hero>();

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
      ...createFixValuesFilterProps("initialRate", [1, 2, 3], {
        texts: [1, 2, 3].map((v) =>
          new Array(v)
            .fill(undefined)
            .map((_, index) => <StarFilled key={index} />)
        ),
      }),
    },
    {
      title: "初始攻击",
      dataIndex: ["initialData", "attack"],
      minWidth: 60,
      sorter: (a, b) => a.initialData.attack - b.initialData.attack,
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
        return getAwakeningDisplayString(entity);
      },
      ...createFixValuesFilterProps("awakening", AWAKENING_TYPES),
    },
    {
      title: "全体发现",
      dataIndex: "discovery_all",
      minWidth: 100,
      ...createFixValuesFilterProps("discovery_all", DISCOVERY_TYPES),
    },
    {
      title: "晋升效果",
      dataIndex: "rateUpEffects",
      minWidth: 100,
      render(_dom, entity) {
        return (
          <Space direction="vertical">
            {entity.rateUpEffects.map(({ type, increment }, index) => (
              <Tag color={TYPE_TAG_COLOR[type]} key={index}>
                {type}+{increment}%
              </Tag>
            ))}
          </Space>
        );
      },
      ...createFixValuesFilterProps("rateUpEffects", RATE_UP_TYPES, {
        cmp(itemValue, selectedValue) {
          return (
            itemValue as {
              type: (typeof RATE_UP_TYPES)[number];
              increment: number;
            }[]
          )
            .map((item) => item.type)
            .includes(selectedValue as (typeof RATE_UP_TYPES)[number]);
        },
      }),
    },
    {
      title: "别名",
      dataIndex: "alias",
      minWidth: 80,
      render(_dom, entity) {
        return (
          <Space>
            {entity.alias.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </Space>
        );
      },
      ...createFixValuesFilterProps(
        "alias",
        heros.flatMap((h) => h.alias),
        {
          filterSearch: true,
          cmp(itemValue, selectedValue) {
            return (itemValue as string[]).includes(selectedValue as string);
          },
        }
      ),
    },
  ];

  return (
    <PageContainer>
      <StyledProTable
        sortDirections={["descend", "ascend"]}
        dataSource={heros}
        rowKey="name"
        columns={columns}
        search={false}
      />
    </PageContainer>
  );
};

export default HeroEncyclopediaPage;
