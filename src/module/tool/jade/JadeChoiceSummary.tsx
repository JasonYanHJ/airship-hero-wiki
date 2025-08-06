import { Collapse, Space, Tag } from "antd";
import { DollarCircleOutlined } from "@ant-design/icons";
import { RESOURCE_TAG_COLOR } from "../../../assets/consts";
import { PersonalJadeChoiceData } from "./jadeChoiceDataService";
import calculateRewards from "./calculateRewards";

const JadeChoiceSummary = ({
  choices,
  rewardValues,
  style,
}: {
  choices: PersonalJadeChoiceData["choices"];
  rewardValues: PersonalJadeChoiceData["settings"]["rewardValues"];
  style?: React.CSSProperties;
}) => {
  const { jadeCost, rewardsMap } = calculateRewards(choices, rewardValues);

  return (
    <Collapse
      style={{
        background: "#f9f9f9",
        ...style,
      }}
      items={[
        {
          key: "default",
          label: (
            <b>
              玉石消耗：
              <Space size={2}>
                {jadeCost}
                <DollarCircleOutlined />
              </Space>
            </b>
          ),
          children: (
            <Space wrap size={8}>
              {Object.keys(rewardsMap).length > 0 ? (
                Object.entries(rewardsMap).map(
                  ([type, amount]) =>
                    amount > 0 && (
                      <Tag
                        color={RESOURCE_TAG_COLOR[type]}
                        style={{ marginInlineEnd: 0 }}
                        key={type}
                      >
                        {type}
                        {amount > 1 ? `*${amount}` : ""}
                      </Tag>
                    )
                )
              ) : (
                <span>暂无收益</span>
              )}
            </Space>
          ),
        },
      ]}
      defaultActiveKey={["default"]}
    />
  );
};

export default JadeChoiceSummary;
