import { groupBy, sum, sumBy } from "lodash";
import { getAwakeningIncrement } from "../../../assets/heros";
import { FateWithRate, HeroWithRate } from "../../../assets/types";

export const MAX_FATE_STEP = 4;

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
  const notMaxTargetsList: TargetFate[] = fatesWitheRate
    .filter((fate) => fate.type === "攻击")
    .filter((fate) => fate.rate !== 10)
    .map((fate) => ({
      ...fate,
      targetRate: fate.rate + 1,
    }));
  const stepsPriorityData = new Array(MAX_FATE_STEP)
    .fill(undefined)
    .flatMap((_, index) => {
      const step = index + 1;

      // nStep中所有可能的组合情况，使用`generateCombinations`生成组合情况
      const nStepCombinations = generateCombinations(notMaxTargetsList, step);

      // 合并targets中重复出现的缘分，将其targetRate设为对应数量
      const nStepTargetsList: TargetFate[][] = nStepCombinations
        .map((steps) =>
          steps.reduce((list, cur) => {
            if (list.length === 0) {
              list.push(cur);
              return list;
            }

            const lastItem = list[list.length - 1];
            if (lastItem.name === cur.name) {
              list[list.length - 1] = {
                ...lastItem,
                targetRate: lastItem.targetRate + 1,
              };
              return list;
            } else {
              list.push(cur);
              return list;
            }
          }, [] as TargetFate[])
        )
        // 过滤掉超过等级上限的组合方案
        .filter((targets) =>
          targets.every((target) => target.targetRate <= 10)
        );

      // 根据targets方案计算对应的消耗与收益
      const nStepPriorityData = nStepTargetsList
        .map((targets) =>
          generateDataByTargets(targets, awakeningAttack, criticalDamage)
        )
        // 只考虑觉醒石消耗数量小于等于30的所有组合方案
        .filter((data) => data.awakeningStonesCost <= 30)
        .sort((a, b) => b.priority - a.priority)
        // 组合情况只考虑最优的50种
        .slice(0, 50);

      return nStepPriorityData;
    });

  return stepsPriorityData;
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
        increment:
          (t.incresePerLevel * t.targetRate + 100) /
          (100 + t.incresePerLevel * t.rate),
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

  const priority =
    Math.pow(damageEffect, 1 / (awakeningStonesCost / 5)) * 100 - 100;

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

// 生成从list中挑选n个元素的所有"合法"组合, 由choiceValidator检查挑选方法的合法性
function generateCombinations<T>(
  list: T[],
  n: number,
  choiceValidator: (list: T[], item: T) => boolean = () => true
) {
  const result: T[][] = [];
  const current: T[] = [];

  // 回溯法
  function backtrack(start: number = 0) {
    // 如果当前组合长度等于n，添加到结果中
    if (current.length === n) {
      result.push([...current]);
      return;
    }

    // 从start位置开始遍历
    for (let i = start; i < list.length; i++) {
      // 剪枝：如果剩余元素不足以完成组合，提前结束
      if (list.length - i < n - current.length) break;

      // 当组合方式不符合要求时，跳过这个选择
      if (!choiceValidator(current, list[i])) continue;

      current.push(list[i]);
      backtrack(i);
      current.pop();
    }
  }

  backtrack(0);
  return result;
}
