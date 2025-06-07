import { ProColumnType, ProTable } from "@ant-design/pro-components";
import { Fate } from "../../assets/types";
import { ELEMENT_TAG_COLOR, FATE_TYPES } from "../../assets/consts";
import useTableSearch from "../../utils/antd-table-utils/useTableSearch";
import createFixValuesFilterProps from "../../utils/antd-table-utils/createFixValuesFilterProps";
import styled from "styled-components";
import { fates } from "../../assets/fates";
import { Space, Tag } from "antd";
import heros, { getAwakeningDisplayString } from "../../assets/heros";

const StyledProTable = styled(ProTable<Fate>)`
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

const FateEncyclopediaPage = () => {
  const createColumnSearchProps = useTableSearch();
  const columns: ProColumnType<Fate>[] = [
    {
      title: "名称",
      dataIndex: "name",
      width: "20%",
      minWidth: 100,
      ellipsis: true,
      ...createColumnSearchProps("name"),
    },
    {
      title: "每级提升",
      width: 120,
      render(_dom, entity) {
        return `${entity.type} +${entity.incresePerLevel}%`;
      },
      ...createFixValuesFilterProps("type", FATE_TYPES),
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
    },
  ];

  return (
    <StyledProTable
      dataSource={fates}
      rowKey="name"
      columns={columns}
      search={false}
    />
  );
};

export default FateEncyclopediaPage;
