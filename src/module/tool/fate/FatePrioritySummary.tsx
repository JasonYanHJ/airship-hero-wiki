import { useMemo } from "react";
import { usePersonalData } from "../../personal/usePersonalData";
import createStyledProTable from "../../../utils/antd-table-utils/createStyledProTable";
import { FateRateUpPriorityData } from "./fateRateUpPriorityDataService";
import { ProColumnType } from "@ant-design/pro-components";
import { Card, Space, Tag } from "antd";
import { ELEMENT_TAG_COLOR } from "../../../assets/consts";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import styled from "styled-components";

const StyledProTable = createStyledProTable<FateRateUpPriorityData>();
const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 0 24px;
  }
`;
const TipStyle: React.CSSProperties = {
  margin: "12px 0",
};

function FatePrioritySummary() {
  const {
    calculatedData: {
      fatePriorityResult: { data: fatePriority, loading },
    },
  } = usePersonalData();
  const summary = useMemo(
    () =>
      [5, 10, 15, 20, 25, 30]
        .map(
          (cost) =>
            fatePriority
              ?.filter((p) => p.awakeningStonesCost === cost)
              .sort((a, b) => b.priority - a.priority)[0]
        )
        .filter((s) => !!s)
        .reverse(),
    [fatePriority]
  );

  const columns: ProColumnType<FateRateUpPriorityData>[] = [
    {
      title: "觉醒石消耗",
      dataIndex: "awakeningStonesCost",
      minWidth: 60,
      align: "center",
    },
    {
      title: "缘分",
      dataIndex: "targets",
      align: "center",
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
      minWidth: 80,
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
    },
    {
      key: "damageEffect",
      title: "伤害提升",
      dataIndex: "damageEffect",
      align: "center",
      minWidth: 110,
      render(_dom, entity) {
        return `${(entity.damageEffect * 100).toFixed(2)}%`;
      },
    },
  ];

  return (
    <StyledCard>
      <Space style={TipStyle}>
        <ArrowDownOutlined />
        觉醒石充足/追求长线收益
      </Space>
      <StyledProTable
        size="small"
        rowKey="awakeningStonesCost"
        loading={loading}
        dataSource={summary}
        columns={columns}
        search={false}
        toolBarRender={false}
        pagination={false}
      />
      <Space style={TipStyle}>
        <ArrowUpOutlined />
        觉醒石紧缺/追求短线收益
      </Space>
    </StyledCard>
  );
}

export default FatePrioritySummary;
