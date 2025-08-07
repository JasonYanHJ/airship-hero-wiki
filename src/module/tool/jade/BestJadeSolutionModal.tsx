import {
  ModalForm,
  ProFormDigit,
  ProFormInstance,
} from "@ant-design/pro-components";
import { Button, message, Space, Tooltip, Typography } from "antd";
import { usePersonalData } from "../../personal/usePersonalData";
import { ReactNode, useCallback, useRef, useState } from "react";
import { PersonalJadeChoiceData } from "./jadeChoiceDataService";
import calculateBestJadeSolution from "./calculateBestJadeSolution";
import JadeChoiceSummary from "./JadeChoiceSummary";
import calculateRewards from "./calculateRewards";
import { QuestionCircleOutlined } from "@ant-design/icons";

type Solution = ReturnType<typeof calculateBestJadeSolution>;

const tips: Record<string, ReactNode> = {
  玉石总数: (
    <Space direction="vertical" style={{ wordBreak: "break-all" }}>
      <p>
        <b>推荐值：399/403/自定义</b>
      </p>
      <p>403为零氪完成所有任务获取的玉石总数；399为除去矿山任务的总数。</p>
    </Space>
  ),
  觉醒石: (
    <Space direction="vertical" style={{ wordBreak: "break-all" }}>
      <p>
        <b>推荐值：3068/6136/9204/12272/15340/更高</b>
      </p>
      <p>
        将觉醒石价值等价为50/100/150/200/250/更多片三星碎片的价值；三星碎片价值按61.36计算。
      </p>
      <p>
        假设你每天稳定换3档觉醒石，那么你该设置价值为第4档（200碎片，12272钻）的价值；每天觉醒石5档换满的应该将觉醒石价值设为高于15340的自定义值。
      </p>
    </Space>
  ),
  "3星骑士召集券": (
    <Space direction="vertical" style={{ wordBreak: "break-all" }}>
      <p>
        <b>推荐值：4908.8</b>
      </p>
      <p>等价为80片三星碎片的价值；三星碎片价值按61.36计算。</p>
    </Space>
  ),
  "3星灵魂自选": (
    <Space direction="vertical" style={{ wordBreak: "break-all" }}>
      <p>
        <b>推荐值：61.36</b>
      </p>
      <p>
        一抽4%概率出三星骑士，100抽保底1三星，折合出货率5%；10张召集券11抽；1骑士=80碎片；因此价值为270/0.05/1.1/80=61.36。
      </p>
    </Space>
  ),
  镐子: (
    <Space direction="vertical" style={{ wordBreak: "break-all" }}>
      <p>
        <b>推荐值：400/更高</b>
      </p>
      <p>
        矿山购买镐子最后一档为400钻/镐，每天买满镐子的可以考虑设置为更高的价值。
      </p>
    </Space>
  ),
  召集券: (
    <Space direction="vertical" style={{ wordBreak: "break-all" }}>
      <p>
        <b>推荐值：270/300</b>
      </p>
      <p>
        活动交易所每张召集券270钻；如果在买满的情况下仍然不够抽，可以考虑设置为300。
      </p>
    </Space>
  ),
  钻石: (
    <Space direction="vertical" style={{ wordBreak: "break-all" }}>
      <p>
        <b>推荐值：1</b>
      </p>
      <p>不建议修改为其他值。</p>
    </Space>
  ),
};

function BestJadeSolutionModal() {
  const {
    personalJadeChoiceData: { settings },
  } = usePersonalData();
  const formRef = useRef<ProFormInstance<PersonalJadeChoiceData["settings"]>>();
  const [solution, setSolution] = useState<Solution | null>(null);
  const { setPersonalJadeChoiceData } = usePersonalData();

  const handleCalculate = useCallback(() => {
    if (!formRef.current) return;
    formRef.current
      .validateFields()
      .then(() => {
        if (!formRef.current) return;
        const values = formRef.current.getFieldsValue();
        setSolution(calculateBestJadeSolution(values));
      })
      .catch(() => {
        message.warning("请完整填写数据");
      });
  }, []);

  return (
    <ModalForm<PersonalJadeChoiceData["settings"]>
      formRef={formRef}
      title="计算最佳玉石方案"
      trigger={<Button>计算最佳玉石方案</Button>}
      submitter={false}
      initialValues={settings}
      layout="horizontal"
      onFinish={async (values) => {
        setPersonalJadeChoiceData((data) => ({
          ...data,
          choices: solution!.choices,
          settings: values,
        }));
        message.success("已应用该方案");
        return true;
      }}
    >
      <Typography>
        <Typography.Paragraph>
          <blockquote>
            使用说明：
            <ol>
              <li>设置你活动所能获取的玉石总数</li>
              <li>根据个人情况，将活动中的各类奖励衡量为钻石数量</li>
              <li>
                点击下方“
                <QuestionCircleOutlined />
                ”标识，查看推荐设置以及说明
              </li>
              <li>数据设置完毕后，点击“计算”按钮计算最佳方案</li>
              <li>
                最后，你可以查看系统计算方案的奖励获得情况，并选择是否应用该方案
              </li>
            </ol>
          </blockquote>
        </Typography.Paragraph>
      </Typography>
      <ProFormDigit
        label={
          <Space size={2}>
            玉石总数
            <Tooltip trigger="click" title={tips["玉石总数"]}>
              <QuestionCircleOutlined style={{ color: "grey" }} />
            </Tooltip>
          </Space>
        }
        name="jades"
        min={0}
        fieldProps={{ precision: 0 }}
        formItemProps={{ rules: [{ required: true }] }}
      />
      {Object.keys(settings.rewardValues).map((key) => (
        <ProFormDigit
          key={key}
          label={
            <Space size={2}>
              <span>{key}价值</span>
              <Tooltip trigger="click" title={tips[key]}>
                <QuestionCircleOutlined style={{ color: "grey" }} />
              </Tooltip>
            </Space>
          }
          name={["rewardValues", key]}
          min={0}
          formItemProps={{ rules: [{ required: true }] }}
        />
      ))}
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <Button type="primary" onClick={handleCalculate}>
          计算最佳方案
        </Button>
      </div>
      {solution && (
        <SolutionDisplay
          solution={solution}
          rewardValues={formRef.current!.getFieldsValue().rewardValues}
        />
      )}
    </ModalForm>
  );
}

function SolutionDisplay({
  solution,
  rewardValues,
}: {
  solution: Solution;
  rewardValues: PersonalJadeChoiceData["settings"]["rewardValues"];
}) {
  const {
    personalJadeChoiceData: { choices: oldChoices },
  } = usePersonalData();
  const {
    jadeCost: oldJadeCost,
    rewardsMap: oldRewardsMap,
    totalValue: oldTotalValue,
  } = calculateRewards(oldChoices, rewardValues);
  const { jadeCost, rewardsMap, totalValue } = calculateRewards(
    solution.choices,
    rewardValues
  );

  return (
    <div>
      <div>
        <JadeChoiceSummary
          choices={solution.choices}
          rewardValues={rewardValues}
        />
      </div>
      <Typography style={{ margin: "16px 0" }}>
        <Typography.Paragraph>
          <b>与原方案比较：</b>
          <ul>
            <li>
              玉石消耗：{jadeCost}
              <span
                style={{ color: jadeCost - oldJadeCost > 0 ? "green" : "red" }}
              >
                {" "}
                ({jadeCost - oldJadeCost > 0 && "+"}
                {jadeCost - oldJadeCost})
              </span>
            </li>
            <li>
              <Space size={2}>
                总价值
                <Tooltip
                  trigger="click"
                  title="按当前设置的各类奖励价值进行比较"
                >
                  <QuestionCircleOutlined style={{ color: "grey" }} />
                </Tooltip>
              </Space>
              ：{totalValue.toFixed(0)}
              <span
                style={{
                  color: totalValue - oldTotalValue > 0 ? "green" : "red",
                }}
              >
                {" "}
                ({totalValue - oldTotalValue > 0 && "+"}
                {(totalValue - oldTotalValue).toFixed(0)})
              </span>
            </li>
            {Object.keys(rewardValues).map((key) => (
              <li key={key}>
                {key}：{rewardsMap[key] ?? 0}
                <span
                  style={{
                    color:
                      (rewardsMap[key] ?? 0) - (oldRewardsMap[key] ?? 0) > 0
                        ? "green"
                        : "red",
                  }}
                >
                  {" "}
                  (
                  {(rewardsMap[key] ?? 0) - (oldRewardsMap[key] ?? 0) > 0 &&
                    "+"}
                  {(rewardsMap[key] ?? 0) - (oldRewardsMap[key] ?? 0)})
                </span>
              </li>
            ))}
          </ul>
        </Typography.Paragraph>
      </Typography>
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <Button type="primary" htmlType="submit">
          应用该方案
        </Button>
      </div>
    </div>
  );
}

export default BestJadeSolutionModal;
