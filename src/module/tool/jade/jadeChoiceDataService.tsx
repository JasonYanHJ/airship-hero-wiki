export type PersonalJadeChoiceData = { choices: [0 | 1, 0 | 1, 0 | 1][] };

export function savePersonalJadeChoiceData(data: PersonalJadeChoiceData) {
  localStorage.setItem("jade-choice-data", JSON.stringify(data));
}

export function loadPersonalJadeChoiceData(): PersonalJadeChoiceData {
  const data = localStorage.getItem("jade-choice-data");
  return data
    ? JSON.parse(data)
    : { choices: new Array(60).fill(undefined).map(() => [0, 0, 0]) };
}

export function hasPersonalJadeChoiceData() {
  const data = localStorage.getItem("jade-choice-data");
  return !!data;
}

export function validatePersonalJadeChoiceData(data: unknown) {
  // 检查是否为对象，并且包含 `choices` 属性
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    throw Error("必须是一个对象");
  }

  const objData = data as { choices?: unknown };

  if (!("choices" in objData)) {
    throw Error("必须包含“choices”属性");
  }

  _validateChoices(objData.choices);
}

function _validateChoices(data: unknown) {
  // 检查是否为数组
  if (!Array.isArray(data)) {
    throw Error("“choices”必须是一个数组");
  }

  // 检查数组长度必须为60
  if (data.length !== 60) {
    throw Error("“choices”必须为60");
  }

  // 检查每个元素
  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    // 检查是否为元组类型 [0 | 1, 0 | 1, 0 | 1]
    if (!Array.isArray(item) || item.length !== 3) {
      throw Error("选择必须是长度为3的数组");
    }

    // 检查每个元素是否为0或1
    for (let j = 0; j < 3; j++) {
      if (item[j] !== 0 && item[j] !== 1) {
        throw Error("选择取值必须是0或1");
      }
    }
  }
}
