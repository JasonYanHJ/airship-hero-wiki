import { sum } from "lodash";
import { AWAKENING_TYPES_DATA, FATE_TYPES } from "../../../assets/consts";
import { FATE_NAMES } from "../../../assets/fates";
import { getAwakeningIncrement } from "../../../assets/heros";
import { FateWithRate, HeroWithRate } from "../../../assets/types";

export type FateRateUpPriorityData = {
  name: typeof FATE_NAMES;
  herosToRateUp: (HeroWithRate & { toRateUp: number })[];
  fateRateUpEffect: { [key in (typeof FATE_TYPES)[number]]?: number }; // 效果是叠乘
  heroRateUpEffect: {
    -readonly [key in keyof typeof AWAKENING_TYPES_DATA]?: number;
  }; // 效果是叠加
  damageEffect: number;
  awakeningStonesCost: number;
  priority: number;
};

export function calculateFateRateUpPriorityData(
  fatesWitheRate: FateWithRate[],
  awakeningAttack: number,
  criticalDamage: number
): FateRateUpPriorityData[] {
  return fatesWitheRate.map((fate) => {
    if (fate.rate === 10)
      return {
        name: [fate.name as (typeof FATE_NAMES)[number]],
        herosToRateUp: [],
        fateRateUpEffect: {},
        heroRateUpEffect: {},
        damageEffect: 1,
        awakeningStonesCost: 0,
        priority: -1,
      };

    const herosToRateUp: (HeroWithRate & { toRateUp: number })[] = fate.heros
      .filter((hero) => hero.rate < fate.rate + 1)
      .map((hero) => ({ ...hero, toRateUp: fate.rate + 1 - hero.rate }));

    const heroRateUpEffect: {
      -readonly [key in keyof typeof AWAKENING_TYPES_DATA]?: number;
    } = {};
    herosToRateUp.forEach((hero) => {
      heroRateUpEffect[hero.awakening] =
        (heroRateUpEffect[hero.awakening] ?? 0) +
        getAwakeningIncrement(hero) * hero.toRateUp;
    });

    const fateRateUpEffect: { [key in (typeof FATE_TYPES)[number]]?: number } =
      { [fate.type]: (100 + fate.incresePerLevel) / 100 };

    const damageEffect =
      ((((fateRateUpEffect.攻击 ?? 1) *
        (awakeningAttack + (heroRateUpEffect.攻击 ?? 0))) /
        awakeningAttack) *
        (criticalDamage + (heroRateUpEffect.暴击伤害 ?? 0))) /
      criticalDamage;

    const awakeningStonesCost = sum(
      herosToRateUp.map((hero) => hero.toRateUp * 5)
    );

    const priority =
      Math.pow(damageEffect, 1 / awakeningStonesCost) * 100 - 100;

    return {
      name: [fate.name as (typeof FATE_NAMES)[number]],
      herosToRateUp,
      fateRateUpEffect,
      heroRateUpEffect,
      damageEffect,
      awakeningStonesCost,
      priority,
    };
  });
}
