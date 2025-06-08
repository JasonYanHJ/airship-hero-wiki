import { groupBy, sum, sumBy } from "lodash";
import { getAwakeningIncrement } from "../../../assets/heros";
import { FateWithRate, HeroWithRate } from "../../../assets/types";

type TargetFate = FateWithRate & {
  targetRate: number;
};

export type FateRateUpPriorityData = {
  targets: TargetFate[];
  herosToRateUp: (HeroWithRate & { toRateUp: number })[];
  heroRateUpEffect: {
    type: string;
    increment: number;
  }[]; // 效果是叠加
  fateRateUpEffect: {
    type: string;
    increment: number;
  }[]; // 效果是叠乘
  damageEffect: number;
  awakeningStonesCost: number;
  priority: number;
};

export function calculateFateRateUpPriorityData(
  fatesWitheRate: FateWithRate[],
  awakeningAttack: number,
  criticalDamage: number
): FateRateUpPriorityData[] {
  const targetsList: TargetFate[][] = fatesWitheRate.map((fate) => [
    {
      ...fate,
      targetRate: fate.rate + 1,
    },
  ]);
  return targetsList.map((targets) =>
    generateDataByTargets(targets, awakeningAttack, criticalDamage)
  );
}

export function generateDataByTargets(
  targets: TargetFate[],
  awakeningAttack: number,
  criticalDamage: number
): FateRateUpPriorityData {
  if (targets.some((t) => t.targetRate > 10))
    return {
      targets,
      herosToRateUp: [],
      heroRateUpEffect: [],
      fateRateUpEffect: [],
      damageEffect: 1,
      awakeningStonesCost: 0,
      priority: -1,
    };

  const heroRateUpTargets = targets
    .flatMap((t) =>
      t.heros.map((hero) => ({
        hero,
        target: t.targetRate,
      }))
    )
    .reduce((acc, item) => {
      acc.set(item.hero, Math.max(acc.get(item.hero) ?? 0, item.target));
      return acc;
    }, new Map<HeroWithRate, number>());

  const herosToRateUp: (HeroWithRate & { toRateUp: number })[] = [
    ...heroRateUpTargets.entries(),
  ]
    .filter(([hero, targetRate]) => targetRate > hero.rate)
    .map(([hero, targetRate]) => ({
      ...hero,
      toRateUp: targetRate - hero.rate,
    }));

  const heroRateUpEffect: {
    type: string;
    increment: number;
  }[] = Object.entries(
    groupBy(
      herosToRateUp.map((hero) => ({
        type: hero.awakening,
        increment: getAwakeningIncrement(hero) * hero.toRateUp,
      })),
      "type"
    )
  ).map(([type, items]) => ({ type, increment: sumBy(items, "increment") }));

  const fateRateUpEffect: {
    type: string;
    increment: number;
  }[] = Object.entries(
    groupBy(
      targets.map((t) => ({
        type: t.type,
        increment: Math.pow(
          (t.incresePerLevel + 100) / 100,
          t.targetRate - t.rate
        ),
      })),
      "type"
    )
  ).map(([type, items]) => ({
    type,
    increment: items.map((x) => x.increment).reduce((a, b) => a * b),
  }));

  const fateAttackEffect =
    fateRateUpEffect.find((e) => e.type === "攻击")?.increment ?? 1;
  const heroAwakeningAttackEffect =
    (awakeningAttack +
      (heroRateUpEffect.find((e) => e.type === "攻击")?.increment ?? 0)) /
    awakeningAttack;
  const heroAwakeningCriticalEffect =
    (criticalDamage +
      (heroRateUpEffect.find((e) => e.type === "暴击伤害")?.increment ?? 0)) /
    criticalDamage;
  const damageEffect =
    fateAttackEffect * heroAwakeningAttackEffect * heroAwakeningCriticalEffect;

  const awakeningStonesCost = sum(
    herosToRateUp.map((hero) => hero.toRateUp * 5)
  );

  const priority = Math.pow(damageEffect, 1 / awakeningStonesCost) * 100 - 100;

  return {
    targets,
    herosToRateUp,
    heroRateUpEffect,
    fateRateUpEffect,
    damageEffect,
    awakeningStonesCost,
    priority,
  };
}
