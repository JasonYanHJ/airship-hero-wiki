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
