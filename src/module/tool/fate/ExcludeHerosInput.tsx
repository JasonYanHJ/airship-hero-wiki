import { Select } from "antd";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const excludedHerosAtom = atomWithStorage<string[]>("excluded-heros", []);

const ExcludeHerosInput = () => {
  const [excludedHeros, setExcludedHeros] = useAtom(excludedHerosAtom);
  return (
    <div>
      <Select
        value={excludedHeros}
        onChange={(v) => setExcludedHeros(v)}
        prefix="不考虑下列角色的觉醒："
        mode="multiple"
        placeholder="请选择"
        style={{ minWidth: 260 }}
        options={[
          { value: "比比" },
          { value: "水星" },
          { value: "猎奥坎" },
          { value: "米克" },
          { value: "巴赫一号" },
          { value: "巴赫二号" },
          { value: "巴赫三号" },
          { value: "巴赫四号" },
          { value: "吕布" },
          { value: "貂蝉" },
          { value: "孙策" },
          { value: "大乔" },
          { value: "杜莎利斯" },
          { value: "瓦尔基里" },
          { value: "帕拉斯" },
          { value: "耶梦加得" },
          { value: "泰西斯" },
          { value: "伊莉丝" },
          { value: "小乔" },
          { value: "周瑜" },
        ]}
      />
    </div>
  );
};

export default ExcludeHerosInput;
export { excludedHerosAtom };
