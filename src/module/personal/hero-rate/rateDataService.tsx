import { min, sum } from "lodash";
import {
  AWAKENING_TYPES,
  AWAKENING_TYPES_DATA,
  FATE_TYPES,
  RATE_UP_TYPES,
} from "../../../assets/consts";
import { fates } from "../../../assets/fates";
import heros, {
  getAwakeningIncrement,
  HERO_NAMES,
} from "../../../assets/heros";
import { FateWithRate, HeroWithRate } from "../../../assets/types";

export type PersonalHeroRateData = Record<(typeof HERO_NAMES)[number], number>;

export function savePersonalHeroRateData(data: PersonalHeroRateData) {
  localStorage.setItem("hero-rate-data", JSON.stringify(data));
}

export function loadPersonalHeroRateData(): PersonalHeroRateData {
  const data = localStorage.getItem("hero-rate-data");
  return getNormalizedPersonalHeroRateData(data ? JSON.parse(data) : {});
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

export function getHerosWithRate(
  personalHeroRateData: PersonalHeroRateData
): HeroWithRate[] {
  return heros.map((hero) => ({
    ...hero,
    rate: personalHeroRateData[hero.name],
  }));
}

export function calculateRateRelatedData(herosWithRate: HeroWithRate[]) {
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

  const rateUpEffectData = Object.fromEntries(
    RATE_UP_TYPES.map((type) => [
      type,
      (["暴击率", "暴击伤害", "暴击抵抗率", "跳过关卡的概率"].includes(type)
        ? 0
        : 100) +
        sum(
          herosWithRate
            .flatMap((hero) => hero.rateUpEffects.slice(0, hero.rate))
            .filter((effect) => effect.type === type)
            .map((effect) => effect.increment)
        ),
    ])
  );

  return {
    awakenHerosCount,
    rate5HerosCount,
    rate4HerosCount,
    rate3HerosCount,
    awakeningData,
    rateUpEffectData,
  };
}

export function getFatesWithRate(
  herosWithRate: HeroWithRate[]
): FateWithRate[] {
  return fates
    .map((fate) => ({
      ...fate,
      heros: fate.heros.map(
        (name) => herosWithRate.find((hero) => hero.name === name)!
      ),
    }))
    .map((fate) => ({
      ...fate,
      rate: min(fate.heros.map((hero) => hero.rate))!,
    }));
}

export function calculateFateRelatedData(fatesWithRate: FateWithRate[]) {
  const maxFateCount = fatesWithRate.filter((fate) => fate.rate === 10).length;

  const fateRateEffectData = Object.fromEntries(
    FATE_TYPES.map((type) => [
      type,
      fatesWithRate
        .filter((fate) => fate.type === type)
        .map((fate) => (100 + fate.incresePerLevel * fate.rate) / 100)
        .reduce((a, b) => a * b, 100)
        .toFixed(2),
    ])
  );

  return { maxFateCount, fateRateEffectData };
}
