import {
  ModalForm,
  ProFormDigit,
  ProFormInstance,
} from "@ant-design/pro-components";
import { Button, message, Space, Tooltip, Typography } from "antd";
import { usePersonalData } from "../../personal/usePersonalData";
import { useCallback, useRef, useState } from "react";
import { PersonalJadeChoiceData } from "./jadeChoiceDataService";
import calculateBestJadeSolution from "./calculateBestJadeSolution";
import JadeChoiceSummary from "./JadeChoiceSummary";
import calculateRewards from "./calculateRewards";
import { QuestionCircleOutlined } from "@ant-design/icons";

type Solution = ReturnType<typeof calculateBestJadeSolution>;

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
              <li>数据设置完毕后，点击“计算”按钮计算最佳方案</li>
              <li>
                最后，你可以查看系统计算方案的奖励获得情况，并选择是否应用该方案
              </li>
            </ol>
          </blockquote>
        </Typography.Paragraph>
      </Typography>
      <ProFormDigit
        label="玉石总数"
        name="jades"
        min={0}
        fieldProps={{ precision: 0 }}
        formItemProps={{ rules: [{ required: true }] }}
      />
      {Object.keys(settings.rewardValues).map((key) => (
        <ProFormDigit
          key={key}
          label={key + "价值"}
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
                <Tooltip title="按当前设置的各类奖励价值进行比较">
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
