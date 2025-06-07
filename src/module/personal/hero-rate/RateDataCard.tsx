import { Card, Typography } from "antd";
import RateDataModalForm from "./RateDataModalForm";
import { usePersonalData } from "../usePersonalData";
import { AWAKENING_TYPES, AWAKENING_TYPES_DATA } from "../../../assets/consts";

const RateDataCard = () => {
  const { calculatedData } = usePersonalData();

  return (
    <Card title="英雄星级数据" extra={<RateDataModalForm />}>
      <Typography.Paragraph>
        <ul>
          <Typography.Title level={5}>汇总信息如下：</Typography.Title>
          <Typography.Text strong>养成</Typography.Text>
          <li>觉醒英雄：{calculatedData.awakenHerosCount}</li>
          <li>5星英雄：{calculatedData.rate5HerosCount}</li>
          <li>4星英雄：{calculatedData.rate4HerosCount}</li>
          <li>3星英雄：{calculatedData.rate3HerosCount}</li>
          <Typography.Text strong>持有效果</Typography.Text>
          {AWAKENING_TYPES.map((type) => (
            <li key={type}>
              觉醒骑士持有效果-{type}：
              {
                calculatedData.awakeningData[
                  type as keyof typeof AWAKENING_TYPES_DATA
                ]
              }
              {type === "攻击速度" ? "" : "%"}
            </li>
          ))}
        </ul>
      </Typography.Paragraph>
    </Card>
  );
};

export default RateDataCard;
