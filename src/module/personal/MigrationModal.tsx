import { UsbOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";
import { Button, Input, message, Space, Tabs, Typography } from "antd";
import { PersonalInputData, usePersonalData } from "./usePersonalData";
import { useMemo, useState } from "react";
import { validatePersonalHeroRateData } from "./hero-rate/rateDataService";
import { validatePersonalCriticalDamageData } from "../tool/fate/criticalDamageDataService";
import { validatePersonalJadeChoiceData } from "../tool/jade/jadeChoiceDataService";

// 添加新的个人数据种类后，需要在此文件修改三处：数据验证、数据设置、数据获取

function parsePersonalData(dataString: string): PersonalInputData | undefined {
  try {
    const data = JSON.parse(dataString) as PersonalInputData;
    try {
      validatePersonalHeroRateData(data?.personalHeroRateData);
    } catch (err) {
      throw Error(`英雄星级数据错误 ${err instanceof Error && err.message}`);
    }
    try {
      validatePersonalCriticalDamageData(data?.personalCriticalDamageData);
    } catch (err) {
      throw Error(`英雄爆伤数据错误 ${err instanceof Error && err.message}`);
    }
    try {
      validatePersonalJadeChoiceData(data?.personalJadeChoiceData);
    } catch (err) {
      throw Error(`玉石方案数据错误 ${err instanceof Error && err.message}`);
    }
    return data;
  } catch (err) {
    console.log("验证失败", err);
    if (!(err instanceof Error)) return undefined;

    if (err instanceof SyntaxError) message.error("导入失败：数据格式错误");
    else message.error(`导入失败：${err.message}`);

    return undefined;
  }
}

const MigrateToPanel = () => {
  const {
    setPersonalHeroRateData,
    setPersonalCriticalDamageData,
    setPersonalJadeChoiceData,
  } = usePersonalData();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMigrate = () => {
    setLoading(true);
    setTimeout(() => {
      const personalData = parsePersonalData(data);
      if (!personalData) {
        setLoading(false);
        return;
      }

      setPersonalHeroRateData(personalData.personalHeroRateData);
      setPersonalCriticalDamageData(personalData.personalCriticalDamageData);
      setPersonalJadeChoiceData(personalData.personalJadeChoiceData);

      message.success("导入成功");
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <Typography.Paragraph>
        <Button loading={loading} type="primary" onClick={handleMigrate}>
          点击导入
        </Button>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Input.TextArea
          rows={10}
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="将“导出数据”中复制的数据粘贴在此处，然后点击上方按钮导入数据"
        />
      </Typography.Paragraph>
    </>
  );
};

const MigrateFromPanel = () => {
  const {
    personalHeroRateData,
    personalCriticalDamageData,
    personalJadeChoiceData,
  } = usePersonalData();
  const dataString = useMemo(
    () =>
      JSON.stringify({
        personalHeroRateData,
        personalCriticalDamageData,
        personalJadeChoiceData,
      }),
    [personalCriticalDamageData, personalHeroRateData, personalJadeChoiceData]
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(dataString);
      message.success("复制成功");
    } catch (err) {
      message.error("复制失败");
      console.error("复制失败:", err);
    }
  };

  return (
    <>
      <Typography.Paragraph>
        <Button type="primary" onClick={handleCopy}>
          点击复制
        </Button>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <pre>
          <Typography.Paragraph
            style={{ marginBottom: 0 }}
            ellipsis={{
              rows: 10,
              expandable: "collapsible",
              symbol(expanded) {
                return (
                  <span style={{ color: "grey" }}>
                    {expanded ? "收起" : "展开"}
                  </span>
                );
              },
            }}
          >
            {dataString}
          </Typography.Paragraph>
        </pre>
      </Typography.Paragraph>
    </>
  );
};

const MigrationModal = () => {
  return (
    <ModalForm
      title="数据迁移"
      trigger={
        <Button>
          <Space>
            <UsbOutlined />
            数据迁移
          </Space>
        </Button>
      }
      submitter={false}
      modalProps={{ destroyOnHidden: true }}
    >
      <Tabs
        items={[
          {
            key: "migrate-from",
            label: "导出数据",
            children: <MigrateFromPanel />,
          },
          {
            key: "migrate-to",
            label: "导入数据",
            children: <MigrateToPanel />,
          },
        ]}
      />
    </ModalForm>
  );
};

export default MigrationModal;
