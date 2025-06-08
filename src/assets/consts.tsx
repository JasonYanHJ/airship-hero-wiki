export const ELEMENT_TYPES = ["火", "水", "土", "风"] as const;
export const JOB_TYPES = ["坦克", "近战", "远程", "辅助"] as const;
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
