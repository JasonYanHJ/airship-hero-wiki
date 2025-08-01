import { groupBy, sum, sumBy } from "lodash";
import { Heap } from "heap-js";
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

      // 使用迭代器 + 最小堆，边生成边处理，使用验证器进行剪枝
      const nStepPriorityData = processCombinationsWithIterator(
        generateCombinations(notMaxTargetsList, step, combinationValidator),
        awakeningAttack,
        criticalDamage
      );

      return nStepPriorityData;
    });

  return stepsPriorityData;
}

// 轻量级预检查，返回觉醒石消耗和英雄升级信息
function calculateCostAndHeros(targets: TargetFate[]): {
  awakeningStonesCost: number;
  herosToRateUp: (HeroWithRate & { toRateUp: number })[];
} {
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

  const awakeningStonesCost = sum(
    herosToRateUp.map((hero) => hero.toRateUp * 5)
  );

  return { awakeningStonesCost, herosToRateUp };
}

// 基于已计算的英雄信息，完成剩余计算
function calculateFullPriorityDataFromHeros(
  targets: TargetFate[],
  herosToRateUp: (HeroWithRate & { toRateUp: number })[],
  awakeningAttack: number,
  criticalDamage: number,
  awakeningStonesCost: number
): FateRateUpPriorityData {
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
function* generateCombinations<T>(
  list: T[],
  n: number,
  choiceValidator: (list: T[], item: T) => boolean = () => true
): Generator<T[]> {
  const current: T[] = [];

  function* backtrack(start: number = 0): Generator<T[]> {
    // 如果当前组合长度等于n，生成一个组合
    if (current.length === n) {
      yield [...current];
      return;
    }

    // 从start位置开始遍历
    for (let i = start; i < list.length; i++) {
      // 剪枝：如果剩余元素不足以完成组合，提前结束
      if (list.length - i < n - current.length) break;

      // 当组合方式不符合要求时，跳过这个选择
      if (!choiceValidator(current, list[i])) continue;

      current.push(list[i]);
      yield* backtrack(i);
      current.pop();
    }
  }

  yield* backtrack(0);
}

// 使用迭代器和最小堆处理组合，优化内存和性能
function processCombinationsWithIterator(
  combinationsIterator: Generator<TargetFate[]>,
  awakeningAttack: number,
  criticalDamage: number
): FateRateUpPriorityData[] {
  // 最小堆，保持最大的50个priority值
  const topResults = new Heap<FateRateUpPriorityData>(
    (a, b) => a.priority - b.priority
  );

  for (const combination of combinationsIterator) {
    // 由于choiceValidator已经进行了剪枝，这里的组合都是有效的
    const mergedTargets = mergeTargets(combination);

    // 计算觉醒石消耗和英雄升级信息
    const { awakeningStonesCost, herosToRateUp } =
      calculateCostAndHeros(mergedTargets);

    // 完整计算优先级数据
    const priorityData = calculateFullPriorityDataFromHeros(
      mergedTargets,
      herosToRateUp,
      awakeningAttack,
      criticalDamage,
      awakeningStonesCost
    );

    if (topResults.size() < 50) {
      topResults.push(priorityData);
    } else if (priorityData.priority > topResults.peek()!.priority) {
      topResults.pushpop(priorityData); // 原子操作：push后pop最小值
    }
  }

  // 转换为从大到小排序的数组
  return topResults.toArray().sort((a, b) => b.priority - a.priority);
}

// 合并重复缘分，保持关注点分离
function mergeTargets(combination: TargetFate[]): TargetFate[] {
  const merged: TargetFate[] = [];

  for (const current of combination) {
    const lastItem = merged[merged.length - 1];

    if (lastItem?.name === current.name) {
      // 合并同名缘分
      lastItem.targetRate += 1;
    } else {
      // 添加新缘分
      merged.push({ ...current });
    }
  }

  return merged;
}

// 验证等级上限
function isValidTargets(targets: TargetFate[]): boolean {
  return targets.every((target) => target.targetRate <= 10);
}

// 组合验证器，在构建过程中进行剪枝
function combinationValidator(
  current: TargetFate[],
  next: TargetFate
): boolean {
  // 合并当前部分组合
  const partialTargets = mergeTargets([...current, next]);

  // 检查等级上限
  if (!isValidTargets(partialTargets)) return false;

  // 检查觉醒石消耗
  const { awakeningStonesCost } = calculateCostAndHeros(partialTargets);
  if (awakeningStonesCost > 30) return false;

  return true;
}
