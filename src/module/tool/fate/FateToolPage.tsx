import { PageContainer, ProColumnType } from "@ant-design/pro-components";
import { usePersonalData } from "../../personal/usePersonalData";
import { FateRateUpPriorityData } from "./fateRateUpPriorityDataService";
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
import FatePrioritySummaryList from "./FatePrioritySummary";

// 添加names便于列搜索功能实现
type DataSourceType = FateRateUpPriorityData & {
  names: string;
};

const StyledProTable = createStyledProTable<DataSourceType>();

const FateToolTable = () => {
  const {
    calculatedData: {
      fatePriorityResult: { data: fatePriority, loading },
    },
  } = usePersonalData();
  const createColumnSearchProps = useTableSearch();

  const [stoneCost, setStoneCost] = useState(5);

  const dataSource: DataSourceType[] =
    fatePriority
      ?.filter((f) => f.awakeningStonesCost === stoneCost)
      .map((f) => ({
        ...f,
        names: f.targets
          .map((t) => `${t.name}*${t.targetRate - t.rate}`)
          .join(),
      })) ?? [];

  const columns: ProColumnType<DataSourceType>[] = [
    {
      key: "priority",
      title: "每5颗觉醒石伤害提升",
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
      title: "缘分",
      dataIndex: "targets",
      align: "center",
      ...createColumnSearchProps("names"),
      render(_dom, entity) {
        return (
          <Space direction="vertical">
            {entity.targets.map((target) => (
              <Tag key={target.name}>
                {target.name}
                {target.targetRate - target.rate > 1
                  ? `*${target.targetRate - target.rate}`
                  : ""}
              </Tag>
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
                {hero.toRateUp > 1 ? `*${hero.toRateUp}` : ""}
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
      key: "damageEffect",
      title: "伤害(攻击*爆伤)提升",
      dataIndex: "damageEffect",
      align: "center",
      minWidth: 110,
      render(_dom, entity) {
        return `${(entity.damageEffect * 100).toFixed(2)}%`;
      },
      sorter: (a, b) => a.damageEffect - b.damageEffect,
    },
    {
      title: "觉醒石消耗",
      dataIndex: "awakeningStonesCost",
      minWidth: 60,
      align: "center",
    },
  ];

  return (
    <StyledProTable
      rowKey="names"
      sortDirections={["descend", "ascend"]}
      search={false}
      loading={loading}
      dataSource={dataSource}
      columns={columns}
      columnsState={{
        defaultValue: {
          priority: { disable: true },
          damageEffect: { show: false },
        },
      }}
      toolBarRender={() => [
        <Select
          value={stoneCost}
          onChange={setStoneCost}
          options={new Array(6).fill(undefined).map((_, index) => ({
            label: `消耗${(index + 1) * 5}觉醒石`,
            value: (index + 1) * 5,
          }))}
        />,
      ]}
    />
  );
};

const FateToolPage = () => {
  const { personalCriticalDamageData, setPersonalCriticalDamageData } =
    usePersonalData();
  return (
    <PageContainer
      extra={
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
        />
      }
    >
      <FatePrioritySummaryList />
      <br />
      <FateToolTable />
    </PageContainer>
  );
};

export default FateToolPage;
