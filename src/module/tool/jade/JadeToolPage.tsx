import { PageContainer, useBreakpoint } from "@ant-design/pro-components";
import { Card, Checkbox, Divider, Flex, List, Space, Tag } from "antd";
import jade_choices from "../../../assets/jade_choices";
import { DollarOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { JadeChoiceItem } from "../../../assets/types";
import { usePersonalData } from "../../personal/usePersonalData";
import { useCallback } from "react";
import { cloneDeep, sum } from "lodash";
import JadeChoiceSummary from "./JadeChoiceSummary";
import { RESOURCE_TAG_COLOR } from "../../../assets/consts";
import BestJadeSolutionModal from "./BestJadeSolutionModal";

const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 0px 8px;
    padding-bottom: 28px;
  }
`;
const RewardTag: React.FC<{ choice: JadeChoiceItem }> = ({ choice }) => (
  <Tag style={{ marginInlineEnd: 0 }} color={RESOURCE_TAG_COLOR[choice.reward]}>
    {choice.reward}
    {choice.amount > 1 ? `*${choice.amount}` : ""}
  </Tag>
);
const JadeCost: React.FC<{
  choice: JadeChoiceItem;
  level: number;
  index: number;
}> = ({ choice, level, index }) => (
  <Space>
    <JadeCheckBox level={level} index={index} />
    <Space size={2}>
      {choice.cost}
      <DollarOutlined />
    </Space>
  </Space>
);
const JadeCheckBox: React.FC<{
  level: number;
  index: number;
}> = ({ level, index }) => {
  const {
    personalJadeChoiceData: { choices },
    setPersonalJadeChoiceData,
  } = usePersonalData();

  const validUntil =
    choices.findIndex((c) => sum(c) === 0) < 0
      ? 61
      : choices.findIndex((c) => sum(c) === 0);

  const handleCheck = useCallback(
    (level: number, index: number, checked: boolean) => {
      setPersonalJadeChoiceData((data) => {
        const choices = cloneDeep(data.choices);
        choices[level][index] = checked ? 1 : 0;
        return {
          ...data,
          choices: choices,
        };
      });
    },
    [setPersonalJadeChoiceData]
  );

  return (
    <Checkbox
      disabled={level > validUntil}
      checked={Boolean(choices[level][index])}
      onChange={(e) => handleCheck(level, index, e.target.checked)}
    />
  );
};

const JadeChoiceList = () => {
  const screens = useBreakpoint();
  const smallScreen = ["xs", "sm"].includes(screens!);

  return (
    <StyledCard>
      <List
        dataSource={jade_choices}
        renderItem={(item, level) => (
          <div>
            <Divider>{level + 1}层</Divider>
            <Flex justify="space-around">
              {item.map((choice, index) =>
                smallScreen ? (
                  <Space
                    key={index}
                    style={{ width: "33%" }}
                    direction="vertical"
                    align="center"
                  >
                    <RewardTag choice={choice} />
                    <JadeCost level={level} index={index} choice={choice} />
                  </Space>
                ) : (
                  <Space key={index} style={{ minWidth: "12rem" }}>
                    <JadeCost level={level} index={index} choice={choice} />
                    <RewardTag choice={choice} />
                  </Space>
                )
              )}
            </Flex>
          </div>
        )}
      />
    </StyledCard>
  );
};

const JadeToolPage = () => {
  const {
    personalJadeChoiceData: {
      choices,
      settings: { rewardValues },
    },
  } = usePersonalData();

  return (
    <PageContainer extra={[<BestJadeSolutionModal key="best-solution" />]}>
      <JadeChoiceSummary
        choices={choices}
        rewardValues={rewardValues}
        style={{
          position: "sticky",
          top: 12,
          zIndex: 2,
          margin: "0 12px",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
        }}
      />
      <br />
      <JadeChoiceList />
    </PageContainer>
  );
};

export default JadeToolPage;
