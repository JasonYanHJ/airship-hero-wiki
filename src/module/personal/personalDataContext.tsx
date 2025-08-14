import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  calculateFateRelatedData,
  calculateRateRelatedData,
  getFatesWithRate,
  getHerosWithRate,
  loadPersonalHeroRateData,
  savePersonalHeroRateData,
} from "./hero-rate/rateDataService";
import {
  PersonalDataContext,
  PersonalDataContextType,
} from "./usePersonalData";
import {
  loadPersonalCriticalDamageData,
  savePersonalCriticalDamageData,
} from "../tool/fate/criticalDamageDataService";
import {
  loadPersonalJadeChoiceData,
  savePersonalJadeChoiceData,
} from "../tool/jade/jadeChoiceDataService";
import { useFatePriorityCalculation } from "../tool/fate/useFatePriorityCalculation";

export function PersonalDataProvider({ children }: { children: ReactNode }) {
  const [rateData, setRateData] = useState(loadPersonalHeroRateData);
  useEffect(() => {
    savePersonalHeroRateData(rateData);
  }, [rateData]);

  const [criticalDamage, setCriticalDamage] = useState(
    loadPersonalCriticalDamageData
  );
  useEffect(() => {
    savePersonalCriticalDamageData(criticalDamage);
  }, [criticalDamage]);

  const [jadeChoiceData, setJadeChoiceData] = useState(
    loadPersonalJadeChoiceData
  );
  useEffect(() => {
    savePersonalJadeChoiceData(jadeChoiceData);
  }, [jadeChoiceData]);

  const herosWithRate = useMemo(() => getHerosWithRate(rateData), [rateData]);
  const fatesWithRate = useMemo(
    () => getFatesWithRate(herosWithRate),
    [herosWithRate]
  );

  const rateRalated = useMemo(
    () => calculateRateRelatedData(herosWithRate),
    [herosWithRate]
  );
  const fateRalated = useMemo(
    () => calculateFateRelatedData(fatesWithRate),
    [fatesWithRate]
  );

  // 使用 web worker 进行缘分优先级计算
  const { calculate: fatePriorityCalculate, ...fatePriorityResult } =
    useFatePriorityCalculation();

  // 当依赖项变化时触发计算
  useEffect(() => {
    fatePriorityCalculate({
      // 将低于5星的英雄视作5星
      fatesWithRate: getFatesWithRate(getHerosWithRate(rateData, 5)),
      awakeningAttack: rateRalated.awakeningData.攻击,
      criticalDamage,
    });
  }, [
    fatePriorityCalculate,
    criticalDamage,
    fatesWithRate,
    rateRalated.awakeningData.攻击,
    rateData,
  ]);

  const values: PersonalDataContextType = {
    personalHeroRateData: rateData,
    setPersonalHeroRateData: setRateData,
    personalCriticalDamageData: criticalDamage,
    setPersonalCriticalDamageData: setCriticalDamage,
    personalJadeChoiceData: jadeChoiceData,
    setPersonalJadeChoiceData: setJadeChoiceData,
    calculatedData: {
      rateRalated,
      fateRalated,
      fatePriorityResult,
    },
  };
  return (
    <PersonalDataContext.Provider value={values}>
      {children}
    </PersonalDataContext.Provider>
  );
}
