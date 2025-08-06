import jade_choices from "../../../assets/jade_choices";
import { PersonalJadeChoiceData } from "./jadeChoiceDataService";

type KnapsackItem = {
  value: number;
  volume: number;
};

type Choice = [0 | 1, 0 | 1, 0 | 1];
type Result = {
  maxValue: number;
  choices: Choice[];
};

function knapsackWithChoices(
  volume: number,
  itemGroups: [KnapsackItem, KnapsackItem, KnapsackItem][]
): Result {
  const n = itemGroups.length;
  // 处理背包容量为0或没有物品组的特殊情况
  if (volume === 0 || n === 0) {
    return {
      maxValue: 0,
      choices: Array(n).fill([0, 0, 0]),
    };
  }

  // 初始化DP数组：dp[剩余容量][解锁状态]
  let dp: number[][] = new Array(volume + 1);
  for (let c = 0; c <= volume; c++) {
    dp[c] = [-Infinity, -Infinity];
  }
  dp[volume][1] = 0; // 初始状态

  // 存储路径信息：每组的转移路径
  const groupPaths: ({
    prevC: number;
    prevU: number;
    mask: number;
  } | null)[][][] = [];

  // 遍历每一组物品
  for (let i = 0; i < n; i++) {
    const group = itemGroups[i];
    // 初始化下一状态DP数组和当前组的路径记录
    const nextDp: number[][] = new Array(volume + 1);
    const currentPath: ({
      prevC: number;
      prevU: number;
      mask: number;
    } | null)[][] = new Array(volume + 1);

    for (let c = 0; c <= volume; c++) {
      nextDp[c] = [-Infinity, -Infinity];
      currentPath[c] = [null, null];
    }

    // 遍历所有可能的剩余容量
    for (let c = 0; c <= volume; c++) {
      // 遍历两种解锁状态
      for (let u = 0; u <= 1; u++) {
        const currentValue = dp[c][u];
        if (currentValue === -Infinity) continue; // 跳过不可达状态

        if (u === 0) {
          // 当前组未解锁：只能选择空集
          if (currentValue >= nextDp[c][0]) {
            nextDp[c][0] = currentValue;
            currentPath[c][0] = { prevC: c, prevU: u, mask: 0 };
          }
        } else {
          // 当前组已解锁：枚举所有子集（0-7）
          for (let mask = 0; mask < 8; mask++) {
            let addValue = 0;
            let addVolume = 0;
            let selected = false;

            // 计算子集的价值和体积
            for (let j = 0; j < 3; j++) {
              if (mask & (1 << j)) {
                addValue += group[j].value;
                addVolume += group[j].volume;
                selected = true;
              }
            }

            // 跳过体积超过剩余容量的选择
            if (addVolume > c) continue;

            const newC = c - addVolume;
            const newU = selected ? 1 : 0; // 下一组解锁状态
            const newValue = currentValue + addValue;

            // 更新下一状态DP并记录路径
            if (newValue >= nextDp[newC][newU]) {
              nextDp[newC][newU] = newValue;
              currentPath[newC][newU] = { prevC: c, prevU: u, mask };
            }
          }
        }
      }
    }

    // 保存当前组的路径并更新DP
    groupPaths.push(currentPath);
    dp = nextDp;
  }

  // 在所有最终状态中寻找最大值
  let maxValue = -Infinity;
  let bestC = -1;
  let bestU = -1;

  for (let c = 0; c <= volume; c++) {
    for (let u = 0; u <= 1; u++) {
      if (dp[c][u] > maxValue) {
        maxValue = dp[c][u];
        bestC = c;
        bestU = u;
      }
    }
  }

  // 处理没有可行解的情况
  if (maxValue === -Infinity) {
    return {
      maxValue: 0,
      choices: Array(n).fill([0, 0, 0]),
    };
  }

  // 回溯重建选择方案
  const choices: Choice[] = [];
  let currentC = bestC;
  let currentU = bestU;

  // 从后向前回溯每组的选择
  for (let i = n - 1; i >= 0; i--) {
    const pathInfo = groupPaths[i][currentC][currentU];
    if (!pathInfo) {
      // 理论上不应发生，添加保护
      choices.unshift([0, 0, 0]);
      continue;
    }

    // 将掩码转换为选择方案
    const mask = pathInfo.mask;
    const choice: Choice = [
      mask & 1 ? 1 : 0,
      mask & 2 ? 1 : 0,
      mask & 4 ? 1 : 0,
    ];
    choices.unshift(choice);

    // 回溯到前一组的状态
    currentC = pathInfo.prevC;
    currentU = pathInfo.prevU;
  }

  return {
    maxValue: maxValue,
    choices: choices,
  };
}

function calculateBestJadeSolution(
  settings: PersonalJadeChoiceData["settings"]
) {
  return knapsackWithChoices(
    settings.jades,
    jade_choices.map(
      (items) =>
        items.map((item) => ({
          volume: item.cost,
          value: item.amount * (settings.rewardValues[item.reward] ?? 0),
        })) as [KnapsackItem, KnapsackItem, KnapsackItem]
    )
  );
}

export default calculateBestJadeSolution;
