import { PageContainer, ProColumnType } from "@ant-design/pro-components";
import { Fate } from "../../assets/types";
import { ELEMENT_TAG_COLOR, FATE_TYPES } from "../../assets/consts";
import useTableSearch from "../../utils/antd-table-utils/useTableSearch";
import createFixValuesFilterProps from "../../utils/antd-table-utils/createFixValuesFilterProps";
import { fates } from "../../assets/fates";
import { Space, Tag, Typography } from "antd";
import heros, {
  getAwakeningDisplayString,
  HERO_NAMES,
} from "../../assets/heros";
import createStyledProTable from "../../utils/antd-table-utils/createStyledProTable";

const StyledProTable = createStyledProTable<Fate>();

const FateEncyclopediaPage = () => {
  const createColumnSearchProps = useTableSearch();
  const columns: ProColumnType<Fate>[] = [
    {
      title: "名称",
      dataIndex: "name",
      width: "20%",
      ...createColumnSearchProps("name"),
      render(_dom, entity) {
        return (
          <Typography.Text
            style={{ width: "clamp(90px, 20vw, 180px)" }}
            ellipsis={{ tooltip: entity.name }}
          >
            {entity.name}
          </Typography.Text>
        );
      },
    },
    {
      title: "每级提升",
      minWidth: 120,
      render(_dom, entity) {
        return `${entity.type} +${entity.incresePerLevel}%`;
      },
      ...createFixValuesFilterProps("type", FATE_TYPES),
      sorter: (a, b) => a.incresePerLevel - b.incresePerLevel,
    },
    {
      title: "英雄",
      dataIndex: "heros",
      render(_dom, entity) {
        return (
          <Space>
            {entity.heros.map((name) => {
              const hero = heros.find((h) => h.name === name)!;
              return (
                <Tag key={name} color={ELEMENT_TAG_COLOR[hero.element]}>
                  {name}({getAwakeningDisplayString(hero)})
                </Tag>
              );
            })}
          </Space>
        );
      },
      ...createFixValuesFilterProps("heros", HERO_NAMES, {
        filterSearch: true,
        cmp: (itemValue, selectedValue) =>
          (itemValue as Fate["heros"]).includes(
            selectedValue as Fate["heros"][number]
          ),
      }),
    },
  ];

  return (
    <PageContainer>
      <StyledProTable
        dataSource={fates}
        rowKey="name"
        columns={columns}
        search={false}
      />
    </PageContainer>
  );
};

export default FateEncyclopediaPage;
