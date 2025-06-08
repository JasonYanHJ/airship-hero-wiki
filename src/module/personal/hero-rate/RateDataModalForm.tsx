import {
  ModalForm,
  ProFormDependency,
  ProFormInstance,
  ProFormSlider,
} from "@ant-design/pro-components";
import {
  Button,
  Divider,
  InputNumber,
  message,
  Modal,
  Space,
  Tabs,
  Typography,
} from "antd";
import heros, { HERO_NAMES } from "../../../assets/heros";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { groupBy } from "lodash";
import { useMemo, useRef, useState } from "react";
import { ELEMENT_TYPES } from "../../../assets/consts";
import { Hero } from "../../../assets/types";
import {
  calculateRateRelatedData,
  getNormalizedPersonalHeroRateData,
} from "./rateDataService";
import { usePersonalData } from "../usePersonalData";

const getHeroSlideMarks = (initialRate: number) => {
  const marks: { [key: number]: string } = {
    0: "未获得",
    1: " ",
    2: " ",
    3: " ",
    4: " ",
    5: "5星",
    6: " ",
    7: " ",
    8: " ",
    9: " ",
    10: "满觉醒",
  };
  if (initialRate === 2) {
    delete marks[1];
  } else if (initialRate === 3) {
    delete marks[1];
    delete marks[2];
  }
  return marks;
};

const renderRate = (rate: number) => {
  return new Array(5).fill(undefined).map((_, index) => (
    <span key={index}>
      {rate <= index ? (
        <StarOutlined />
      ) : (
        <StarFilled
          style={{
            color: rate <= index + 5 ? "rgb(241 194 56)" : "rgb(233 126 181)",
          }}
        />
      )}
    </span>
  ));
};

const RateSlider: React.FC<{ hero: Hero }> = ({ hero }) => {
  return (
    <div style={{ padding: "0 12px" }}>
      <ProFormDependency name={[hero.name]}>
        {(value) => {
          return (
            <ProFormSlider
              name={hero.name}
              label={
                <Space>
                  <b>{hero.name}</b>
                  {renderRate(value[hero.name])}
                </Space>
              }
              min={0}
              max={10}
              fieldProps={{
                tooltip: {
                  formatter: (value) =>
                    !value
                      ? "未获得"
                      : value <= 5
                      ? `${value}星`
                      : `觉醒${value - 5}星`,
                },
              }}
              step={null}
              marks={getHeroSlideMarks(hero.initialRate)}
            />
          );
        }}
      </ProFormDependency>
    </div>
  );
};

const SetAllTool: React.FC<{
  setAll: (rate: number) => void;
  resetAll: () => void;
}> = ({ setAll, resetAll }) => {
  const [rate, setRate] = useState(10);
  return (
    <Space>
      <Space.Compact>
        <InputNumber
          min={3}
          max={10}
          value={rate}
          onChange={(value) => value && setRate(value)}
          style={{ width: 90 }}
          addonAfter="星"
        />
        <Button
          type="primary"
          onClick={() =>
            Modal.confirm({
              title: `确认全部设为${
                rate <= 5 ? `${rate}星` : `觉醒${rate - 5}星`
              }？`,
              content:
                "提示：你可以选择一个现在拥有英雄最多的星级，将所有英雄全部设置为该星级，再逐个调整其他英雄的星级。",
              onOk: () => setAll(rate),
            })
          }
        >
          批量设置
        </Button>
      </Space.Compact>
      <Button
        onClick={() =>
          Modal.confirm({
            title: `确认重置？`,
            content: "将重置为上一次录入后的结果",
            onOk: () => resetAll(),
          })
        }
      >
        重置
      </Button>
    </Space>
  );
};

const RateDataModalForm = () => {
  const formRef = useRef<ProFormInstance>();
  const [currentTab, setCurrentTab] =
    useState<(typeof ELEMENT_TYPES)[number]>("火");
  const { personalHeroRateData, setPersonalHeroRateData } = usePersonalData();

  const herosGroupedByElementAndJob: [string, [string, Hero[]][]][] = useMemo(
    () =>
      Object.entries(groupBy(heros, "element")).map(
        ([element, elementedHeros]) => [
          element,
          Object.entries(groupBy(elementedHeros, "job")),
        ]
      ),
    []
  );

  return (
    <ModalForm
      key={JSON.stringify(personalHeroRateData)}
      formRef={formRef}
      initialValues={personalHeroRateData}
      trigger={<Button type="primary">录入数据</Button>}
      modalProps={{ forceRender: true }}
      onFinish={async (values) => {
        return new Promise<boolean>((resolve) => {
          const normalizedData = getNormalizedPersonalHeroRateData(values);
          const relatedData = calculateRateRelatedData(normalizedData);
          Modal.confirm({
            title: "确认录入？",
            content: (
              <Typography.Paragraph>
                <ul>
                  <Typography.Text strong>
                    英雄汇总信息如下，请与游戏中实际数值核对：
                  </Typography.Text>
                  <li>觉醒英雄：{relatedData.awakenHerosCount}</li>
                  <li>5星英雄：{relatedData.rate5HerosCount}</li>
                  <li>4星英雄：{relatedData.rate4HerosCount}</li>
                  <li>3星英雄：{relatedData.rate3HerosCount}</li>
                  <li>
                    觉醒骑士持有效果-攻击：{relatedData.awakeningData["攻击"]}%
                  </li>
                </ul>
              </Typography.Paragraph>
            ),
            okText: "确认录入",
            cancelText: "返回修改",
            onOk: () => {
              setPersonalHeroRateData(normalizedData);
              message.success("保存数据成功");
              resolve(true);
            },
            onCancel: () => {
              resolve(false);
            },
          });
        });
      }}
    >
      <SetAllTool
        setAll={(rate) =>
          formRef.current?.setFieldsValue(
            Object.fromEntries(HERO_NAMES.map((name) => [name, rate]))
          )
        }
        resetAll={() => formRef.current?.resetFields()}
      />
      <Tabs
        activeKey={currentTab}
        onChange={(key) => setCurrentTab(key as (typeof ELEMENT_TYPES)[number])}
        items={herosGroupedByElementAndJob.map(([element, elementedHeros]) => ({
          key: element,
          label: <b style={{ fontSize: 16 }}>{element}</b>,
          forceRender: true,
          children: elementedHeros.map(([job, jobedHeros]) => (
            <div key={job}>
              <Divider>
                {element} · {job}
              </Divider>
              {jobedHeros.map((hero) => (
                <RateSlider key={hero.name} hero={hero} />
              ))}
            </div>
          )),
        }))}
      />
    </ModalForm>
  );
};

export default RateDataModalForm;
