import { CaretRightOutlined, InfoCircleTwoTone } from "@ant-design/icons";
import { Collapse, Space } from "antd";
import { useAtom } from "jotai";
import { atomFamily, atomWithStorage } from "jotai/utils";
import { ReactNode } from "react";

const tipAtomFamily = atomFamily((key: string) =>
  atomWithStorage("newbie-tip-open-" + key, true)
);

function NewbieTip({
  tipKey,
  tipContent,
}: {
  tipKey: string;
  tipContent: ReactNode;
}) {
  const [open, setOpen] = useAtom(tipAtomFamily(tipKey));

  return (
    <Collapse
      size="small"
      bordered={false}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined
          style={{ color: "rgba(0,0,0,0.65)" }}
          rotate={isActive ? 90 : 0}
        />
      )}
      items={[
        {
          key: tipKey,
          label: (
            <Space size={4}>
              <b style={{ color: "#1778ff" }}>新手提示</b>
              <InfoCircleTwoTone />
            </Space>
          ),
          children: tipContent,
        },
      ]}
      activeKey={open ? [tipKey] : []}
      onChange={() => setOpen(!open)}
    />
  );
}

export default NewbieTip;
