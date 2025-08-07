type PersonalJadeChoiceDataV1 = {
  version: 1;
  choices: [0 | 1, 0 | 1, 0 | 1][];
};
type PersonalJadeChoiceDataV2 = {
  version: 2;
  choices: [0 | 1, 0 | 1, 0 | 1][];
  settings: { jades: number; rewardValues: Record<string, number> };
};
export type PersonalJadeChoiceMigrationData =
  | PersonalJadeChoiceDataV1
  | PersonalJadeChoiceDataV2;
export type PersonalJadeChoiceData = PersonalJadeChoiceDataV2;

const currentVersion = 2;
const defaultData: PersonalJadeChoiceData = {
  version: 2,
  choices: new Array(60).fill(undefined).map(() => [0, 0, 0]),
  settings: {
    jades: 399,
    rewardValues: {
      觉醒石: 15340,
      "3星骑士召集券": 4908.8,
      "3星灵魂自选": 61.36,
      镐子: 400,
      召集券: 270,
      钻石: 1,
    },
  },
};

const migrates: Record<
  number,
  (data: object) => PersonalJadeChoiceMigrationData
> = {
  1: (data): PersonalJadeChoiceDataV2 => ({
    ...(data as PersonalJadeChoiceDataV1),
    version: 2,
    settings: defaultData.settings,
  }),
};

export function savePersonalJadeChoiceData(data: PersonalJadeChoiceData) {
  localStorage.setItem("jade-choice-data", JSON.stringify(data));
}

export function loadPersonalJadeChoiceData(): PersonalJadeChoiceData {
  const data = localStorage.getItem("jade-choice-data");
  return data ? migratePersonalJadeChoice(JSON.parse(data)) : defaultData;
}

export function hasPersonalJadeChoiceData() {
  const data = localStorage.getItem("jade-choice-data");
  return !!data;
}

export function migratePersonalJadeChoice(
  data: PersonalJadeChoiceMigrationData
): PersonalJadeChoiceData {
  const version = "version" in data ? data.version : 1;

  let result = data;
  for (let i = version; i < currentVersion; i++) {
    result = migrates[i](result);
  }

  return result as PersonalJadeChoiceData;
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
