import { Collapse, Space, Tag } from "antd";
import { usePersonalData } from "../../personal/usePersonalData";
import { sum } from "lodash";
import jade_choices from "../../../assets/jade_choices";
import { DollarCircleOutlined } from "@ant-design/icons";
import { JADES_TYPE, RESOURCE_TAG_COLOR } from "../../../assets/consts";

const JadeChoiceSummary = () => {
  const {
    personalJadeChoiceData: { choices },
  } = usePersonalData();

  const validUntil =
    choices.findIndex((c) => sum(c) === 0) < 0
      ? 61
      : choices.findIndex((c) => sum(c) === 0);

  const validChoices = choices.slice(0, validUntil);
  const details = validChoices.flatMap((selects, level) =>
    selects.flatMap((selected, index) =>
      selected ? jade_choices[level][index] : []
    )
  );

  const jadeCost = sum(details.map((d) => d.cost));
  const rewardsMap = (
    JADES_TYPE.map((type) => [
      type,
      sum(details.filter((d) => d.reward === type).map((d) => d.amount)),
    ]) as [(typeof JADES_TYPE)[number], number][]
  ).filter(([, amount]) => amount > 0);

  return (
    <Collapse
      style={{
        position: "sticky",
        top: 12,
        zIndex: 2,
        margin: "0 12px",
        background: "#f9f9f9",
        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
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
              {rewardsMap.length > 0 ? (
                rewardsMap.map(
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
