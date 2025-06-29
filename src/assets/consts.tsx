export const ELEMENT_TYPES = ["火", "水", "土", "风"] as const;
export const JOB_TYPES = ["坦克", "近战", "远程", "辅助"] as const;
export const RATE_UP_TYPES = [
  "魔石获得量",
  "魔力获得量",
  "金属获得量",
  "攻击",
  "攻击速度",
  "穿透",
  "暴击率",
  "暴击伤害",
  "暴击抵抗率",
  "跳过关卡的概率",
  "生命",
  "防御",
] as const;
export const AWAKENING_TYPES_DATA = {
  攻击: [10, 20, 30],
  暴击伤害: [3, 5, 10],
  穿透: [3, 5, 10],
  攻击速度: [1, 2, 3],
  暴击率: [1, 2, 3],
  暴击抵抗率: [1, 2, 3],
  生命: [10, 20, 30],
  防御: [3, 5, 10],
} as const;
export const AWAKENING_TYPES = Object.keys(AWAKENING_TYPES_DATA);
export const DISCOVERY_TYPES = [
  "攻击",
  "穿透",
  "暴击率",
  "暴击抵抗率",
  "生命",
  "防御",
] as const;
export const FATE_TYPES = ["攻击", "生命", "防御", "穿透"] as const;
export const ELEMENT_TAG_COLOR = {
  火: "magenta",
  水: "blue",
  土: "gold",
  风: "green",
};
export const TYPE_TAG_COLOR: { [key: string]: string } = {
  攻击: "magenta",
  暴击伤害: "blue",
  穿透: "gold",
  攻击速度: "green",
  魔石获得量: "purple",
  魔力获得量: "cyan",
  金属获得量: "cyan",
};
export const JADES_TYPE = [
  "觉醒石",
  "镐子",
  "钻石",
  "3星灵魂自选",
  "3星骑士召集券",
  "召集券",
  "委托书",
  "传说四阶装备箱",
  "传说三阶武器箱",
  "传说三阶装备箱",
  "火属性高级召集券",
  "风属性高级召集券",
  "土属性高级召集券",
  "水属性高级召集券",
  "2星灵魂自选",
  "2星骑士召集券",
  "友情骑士召集券",
  "力量精髓",
  "魔法粉末",
  "水枪",
  "星彩蓝宝石",
  "核心",
  "新年宝箱",
  "随机资源宝箱",
] as const;
export const RESOURCE_TAG_COLOR: { [key: string]: string } = {
  觉醒石: "purple",
  镐子: "cyan",
  钻石: "cyan",
  "3星灵魂自选": "gold",
  "3星骑士召集券": "gold",
  召集券: "gold",
};
