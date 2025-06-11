import { PageContainer, useBreakpoint } from "@ant-design/pro-components";
import { Card, Divider, Flex, List, Space, Tag } from "antd";
import jade_choices from "../../../assets/jade_choices";
import { DollarOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { JadeChoiceItem } from "../../../assets/types";

const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 0px 8px;
    padding-bottom: 28px;
  }
`;
const RewardTag: React.FC<{ choice: JadeChoiceItem }> = ({ choice }) => (
  <Tag style={{ marginInlineEnd: 0 }}>
    {choice.reward}
    {choice.amount > 1 ? `*${choice.amount}` : ""}
  </Tag>
);
const JadeCost: React.FC<{ choice: JadeChoiceItem }> = ({ choice }) => (
  <Space size={2}>
    {choice.cost}
    <DollarOutlined />
  </Space>
);

const JadeChoiceList = () => {
  const screens = useBreakpoint();
  const smallScreen = ["xs", "sm"].includes(screens!);

  return (
    <StyledCard>
      <List
        dataSource={jade_choices}
        renderItem={(item, index) => (
          <div>
            <Divider>{index + 1}层</Divider>
            <Flex justify="space-around">
              {item.map((choice, i) =>
                smallScreen ? (
                  <Space
                    key={i}
                    style={{ width: "33%" }}
                    direction="vertical"
                    align="center"
                  >
                    <RewardTag choice={choice} />
                    <JadeCost choice={choice} />
                  </Space>
                ) : (
                  <Space key={i} style={{ minWidth: "12rem" }}>
                    <JadeCost choice={choice} />
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
  return (
    <PageContainer>
      <JadeChoiceList />
    </PageContainer>
  );
};

export default JadeToolPage;
