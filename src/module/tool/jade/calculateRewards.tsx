import { sum } from "lodash";
import { JADES_TYPE } from "../../../assets/consts";
import jade_choices from "../../../assets/jade_choices";
import { PersonalJadeChoiceData } from "./jadeChoiceDataService";

function calculateRewards(
  choices: PersonalJadeChoiceData["choices"],
  rewardValues: PersonalJadeChoiceData["settings"]["rewardValues"]
) {
  const validUntil =
    choices.findIndex((c) => sum(c) === 0) < 0
      ? 61
      : choices.findIndex((c) => sum(c) === 0);

  const validChoices = choices.slice(0, validUntil);
  const details = validChoices.flatMap((selects, level) =>
    selects.flatMap((selected, index) =>
      selected ? jade_choices[level][index] : []
    )
  );

  const jadeCost = sum(details.map((d) => d.cost));
  const rewardsMap = Object.fromEntries(
    (
      JADES_TYPE.map((type) => [
        type,
        sum(details.filter((d) => d.reward === type).map((d) => d.amount)),
      ]) as [(typeof JADES_TYPE)[number], number][]
    ).filter(([, amount]) => amount > 0)
  );

  const totalValue = sum(
    details.map((d) => d.amount * (rewardValues[d.reward] ?? 0))
  );

  return { jadeCost, rewardsMap, totalValue };
}

export default calculateRewards;
