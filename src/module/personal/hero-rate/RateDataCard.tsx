import { Card, Col, Row } from "antd";
import { usePersonalData } from "../usePersonalData";
import {
  AWAKENING_TYPES,
  AWAKENING_TYPES_DATA,
  FATE_TYPES,
  RATE_UP_TYPES,
} from "../../../assets/consts";
import { fates } from "../../../assets/fates";
import styled from "styled-components";
import { ReactNode } from "react";

const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 16px 40px;
  }
`;

function ResponsiveCol({ children }: { children: ReactNode }) {
  return (
    <Col
      xs={{ flex: "100%" }}
      sm={{ flex: "50%" }}
      md={{ flex: "50%" }}
      lg={{ flex: "33%" }}
      xl={{ flex: "25%" }}
    >
      {children}
    </Col>
  );
}

const RateDataCard = () => {
  const {
    calculatedData: { rateRalated, fateRalated },
  } = usePersonalData();

  return (
    <Row gutter={[16, 16]}>
      <ResponsiveCol>
        <StyledCard style={{ height: "100%" }} title="养成">
          <ul>
            <li>觉醒英雄：{rateRalated.awakenHerosCount}</li>
            <li>5星英雄：{rateRalated.rate5HerosCount}</li>
            <li>4星英雄：{rateRalated.rate4HerosCount}</li>
            <li>3星英雄：{rateRalated.rate3HerosCount}</li>
          </ul>
        </StyledCard>
      </ResponsiveCol>
      <ResponsiveCol>
        <StyledCard style={{ height: "100%" }} title="觉醒持有效果">
          <ul>
            {AWAKENING_TYPES.map((type) => (
              <li key={type}>
                {type}：
                {
                  rateRalated.awakeningData[
                    type as keyof typeof AWAKENING_TYPES_DATA
                  ]
                }
                {type === "攻击速度" ? "" : "%"}
              </li>
            ))}
          </ul>
        </StyledCard>
      </ResponsiveCol>
      <ResponsiveCol>
        <StyledCard style={{ height: "100%" }} title="缘分">
          <ul>
            <li>
              满级缘分：{fateRalated.maxFateCount}/{fates.length}
            </li>
            {FATE_TYPES.map((type) => (
              <li key={type}>
                {type}：{fateRalated.fateRateEffectData[type]}%
              </li>
            ))}
          </ul>
        </StyledCard>
      </ResponsiveCol>
      <ResponsiveCol>
        <StyledCard style={{ height: "100%" }} title="晋升效果">
          <ul>
            {RATE_UP_TYPES.map((type) => (
              <li key={type}>
                {type}：
                {[
                  "暴击率",
                  "暴击伤害",
                  "暴击抵抗率",
                  "跳过关卡的概率",
                ].includes(type)
                  ? "+"
                  : "*"}
                {rateRalated.rateUpEffectData[type]}%
              </li>
            ))}
          </ul>
        </StyledCard>
      </ResponsiveCol>
    </Row>
  );
};

export default RateDataCard;
