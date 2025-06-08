export type PersonalCriticalDamageData = number;

export function savePersonalCriticalDamageData(
  data: PersonalCriticalDamageData
) {
  localStorage.setItem("hero-critical-damage", JSON.stringify(data));
}

export function loadPersonalCriticalDamageData(): PersonalCriticalDamageData {
  const data = localStorage.getItem("hero-critical-damage");
  return data ? JSON.parse(data) : 200; // 使用200%爆伤作为默认值
}

export function hasPersonalCriticalDamageData() {
  const data = localStorage.getItem("hero-critical-damage");
  return !!data;
}

export function validatePersonalCriticalDamageData(data: unknown) {
  if (data === undefined || data === null) throw Error("缺少数据");
  if (typeof data !== "number" || isNaN(data) || !Number.isInteger(data))
    throw Error("必须是一个整数");
  if (data < 100) throw Error("不得低于100");
}
