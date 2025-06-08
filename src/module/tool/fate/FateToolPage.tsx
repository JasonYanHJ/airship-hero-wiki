import { PageContainer, ProColumnType } from "@ant-design/pro-components";
import { usePersonalData } from "../../personal/usePersonalData";
import {
  FateRateUpPriorityData,
  MAX_FATE_STEP,
} from "./fateRateUpPriorityDateService";
import { InputNumber, Select, Space, Tag, Tooltip } from "antd";
import {
  AWAKENING_TYPES,
  ELEMENT_TAG_COLOR,
  FATE_TYPES,
  TYPE_TAG_COLOR,
} from "../../../assets/consts";
import createStyledProTable from "../../../utils/antd-table-utils/createStyledProTable";
import { QuestionCircleOutlined } from "@ant-design/icons";
import useTableSearch from "../../../utils/antd-table-utils/useTableSearch";
import createFixValuesFilterProps from "../../../utils/antd-table-utils/createFixValuesFilterProps";
import { HERO_NAMES } from "../../../assets/heros";
import { useState } from "react";
import styled from "styled-components";

// 添加names便于列搜索功能实现
type DataSourceType = FateRateUpPriorityData & {
  names: string;
};

const StyledProTable = styled(createStyledProTable<DataSourceType>())`
  .ant-pro-table-list-toolbar-right > div {
    flex-wrap: wrap;
  }
`;

const FateToolTable = () => {
  const {
    calculatedData: { fatePriority },
    personalCriticalDamageData,
    setPersonalCriticalDamageData,
  } = usePersonalData();
  const createColumnSearchProps = useTableSearch();

  const [combinationCount, setCombinationCount] = useState(1);

  const dataSource: DataSourceType[] = fatePriority
    .find((f) => f.type === combinationCount)!
    .data.map((f) => ({
      ...f,
      names: f.targets.map((t) => `${t.name}*${t.targetRate - t.rate}`).join(),
    }));

  const columns: ProColumnType<DataSourceType>[] = [
    {
      title: " 伤害提升/觉醒石",
      dataIndex: "priority",
      minWidth: 100,
      align: "center",
      render(_dom, entity) {
        return entity.priority === -1 ? "-" : `${entity.priority.toFixed(2)}%`;
      },
      sorter: (a, b) => a.priority - b.priority,
      defaultSortOrder: "descend",
    },
    {
      title: "觉醒石消耗",
      dataIndex: "awakeningStonesCost",
      minWidth: 80,
      align: "center",
      sorter: (a, b) => a.awakeningStonesCost - b.awakeningStonesCost,
    },
    {
      title: "缘分",
      dataIndex: "targets",
      align: "center",
      ...createColumnSearchProps("names"),
      render(_dom, entity) {
        return (
          <Space direction="vertical">
            {entity.targets.map((target) => (
              <Tag key={target.name}>{target.name}</Tag>
            ))}
          </Space>
        );
      },
    },
    {
      title: "需要觉醒的英雄",
      dataIndex: "herosToRateUp",
      align: "center",
      minWidth: 100,
      render(_dom, entity) {
        return (
          <Space direction="vertical">
            {entity.herosToRateUp.map((hero) => (
              <Tag key={hero.name} color={ELEMENT_TAG_COLOR[hero.element]}>
                {hero.name}
              </Tag>
            ))}
          </Space>
        );
      },
      ...createFixValuesFilterProps("herosToRateUp", HERO_NAMES, {
        filterSearch: true,
        cmp: (itemValue, selectedValue) =>
          (itemValue as FateRateUpPriorityData["herosToRateUp"])
            .map((hero) => hero.name)
            .includes(selectedValue as (typeof HERO_NAMES)[number]),
      }),
    },
    {
      title: "缘分提升效果",
      dataIndex: "fateRateUpEffect",
      minWidth: 120,
      align: "center",
      render(_dom, entity) {
        return (
          <Space direction="vertical">
            {entity.fateRateUpEffect.map(({ type, increment }) => (
              <Tag color={TYPE_TAG_COLOR[type]} key={type}>
                {type}*{(increment * 100).toFixed(2)}%
              </Tag>
            ))}
          </Space>
        );
      },
      ...createFixValuesFilterProps("fateRateUpEffect", FATE_TYPES, {
        cmp: (itemValue, selectedValue) =>
          (itemValue as FateRateUpPriorityData["fateRateUpEffect"])
            .map((effect) => effect.type)
            .includes(selectedValue as string),
      }),
    },
    {
      title: "英雄觉醒效果",
      dataIndex: "heroRateUpEffect",
      minWidth: 120,
      align: "center",
      render(_dom, entity) {
        return (
          <Space direction="vertical">
            {entity.heroRateUpEffect.map(({ type, increment }) => (
              <Tag color={TYPE_TAG_COLOR[type]} key={type}>
                {type}+{increment}%
              </Tag>
            ))}
          </Space>
        );
      },
      ...createFixValuesFilterProps("heroRateUpEffect", AWAKENING_TYPES, {
        cmp: (itemValue, selectedValue) =>
          (itemValue as FateRateUpPriorityData["heroRateUpEffect"])
            .map((effect) => effect.type)
            .includes(selectedValue as string),
      }),
    },
    {
      title: "伤害(攻击*爆伤)提升",
      dataIndex: "damageEffect",
      align: "center",
      minWidth: 110,
      render(_dom, entity) {
        return `${(entity.damageEffect * 100).toFixed(2)}%`;
      },
      sorter: (a, b) => a.damageEffect - b.damageEffect,
    },
  ];

  return (
    <StyledProTable
      rowKey="names"
      sortDirections={["descend", "ascend"]}
      search={false}
      dataSource={dataSource}
      columns={columns}
      toolBarRender={() => [
        <InputNumber
          style={{ width: 280 }}
          addonBefore={
            <Space>
              英雄面板暴击伤害
              <Tooltip title="英雄现有的爆伤会影响伤害计算，建议填入主力输出的上艇暴击伤害进行计算">
                <QuestionCircleOutlined style={{ width: 14 }} />
              </Tooltip>
            </Space>
          }
          addonAfter="%"
          step={10}
          value={personalCriticalDamageData}
          onChange={(value) =>
            value && value >= 100 && setPersonalCriticalDamageData(value)
          }
        />,
        <Select
          value={combinationCount}
          onChange={setCombinationCount}
          options={new Array(MAX_FATE_STEP).fill(undefined).map((_, index) => ({
            label: `提升${index + 1}组`,
            value: index + 1,
          }))}
        />,
      ]}
    />
  );
};

const FateToolPage = () => {
  return (
    <PageContainer>
      <FateToolTable />
    </PageContainer>
  );
};

export default FateToolPage;
