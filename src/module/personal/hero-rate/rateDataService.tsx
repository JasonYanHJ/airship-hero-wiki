import { AWAKENING_TYPES, AWAKENING_TYPES_DATA } from "../../../assets/consts";
import heros, {
  getAwakeningIncrement,
  HERO_NAMES,
} from "../../../assets/heros";

export type PersonalHeroRateData = Record<(typeof HERO_NAMES)[number], number>;

export function savePersonalHeroRateData(data: PersonalHeroRateData) {
  localStorage.setItem("hero-rate-data", JSON.stringify(data));
}

export function loadPersonalHeroRateData(): PersonalHeroRateData {
  const data = localStorage.getItem("hero-rate-data");
  return data ? JSON.parse(data) : getNormalizedPersonalHeroRateData({});
}

export function hasPersonalHeroRateData() {
  const data = localStorage.getItem("hero-rate-data");
  return !!data;
}

export function getNormalizedPersonalHeroRateData(rawData: {
  [key: string]: number;
}) {
  return Object.fromEntries(
    HERO_NAMES.map((name) => [name, rawData[name] ?? 0])
  ) as PersonalHeroRateData;
}

export function validatePersonalHeroRateData(data: unknown) {
  // 检查是否为对象
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    throw Error("数据必须是一个对象");
  }
  const objectData = data as { [key: string]: unknown };

  const dataKeys = Object.keys(objectData);

  // 检查无效的键
  for (const key of dataKeys) {
    if (!(HERO_NAMES as string[]).includes(key)) {
      throw Error(`无效的键: "${key}"`);
    }
  }

  // 检查值的类型
  for (const key of dataKeys) {
    if (typeof objectData[key] !== "number" || isNaN(objectData[key])) {
      throw Error(
        `键 "${key}" 的值必须是数字，当前值: ${
          objectData[key]
        } (类型: ${typeof objectData[key]})`
      );
    }
  }

  // 检查英雄星级的合法性
  for (const key of dataKeys) {
    const rate = objectData[key] as number;
    const hero = heros.find((h) => h.name === key)!;
    if (
      (rate !== 0 && rate < hero.initialRate) ||
      rate < 0 ||
      rate > 10 ||
      !Number.isInteger(rate)
    )
      throw Error(`"${key}" 的星级不符合要求，当前值: ${objectData[key]}`);
  }

  // 检查是否包含所有英雄名称
  if (dataKeys.length !== HERO_NAMES.length) {
    throw Error("英雄名称不全");
  }
}

export function calculateRateRelatedData(
  personalHeroRateData: PersonalHeroRateData
) {
  const herosWithRate = heros.map((hero) => ({
    ...hero,
    rate: personalHeroRateData[hero.name],
  }));

  const awakenHerosCount = herosWithRate.filter(
    (hero) => hero.rate >= 6
  ).length;
  const rate5HerosCount = herosWithRate.filter(
    (hero) => hero.rate === 5
  ).length;
  const rate4HerosCount = herosWithRate.filter(
    (hero) => hero.rate === 4
  ).length;
  const rate3HerosCount = herosWithRate.filter(
    (hero) => hero.rate === 3
  ).length;

  const awakeningData = Object.fromEntries(
    AWAKENING_TYPES.map((type) => [
      type,
      herosWithRate
        .filter((heros) => heros.awakening === type)
        .map((hero) =>
          hero.rate <= 5 ? 0 : getAwakeningIncrement(hero) * (hero.rate - 5)
        )
        .reduce(
          (a, b) => a + b,
          ["攻击", "穿透", "生命", "防御"].includes(type) ? 100 : 0
        ),
    ])
  ) as Record<keyof typeof AWAKENING_TYPES_DATA, number>;

  return {
    awakenHerosCount,
    rate5HerosCount,
    rate4HerosCount,
    rate3HerosCount,
    awakeningData,
  };
}
