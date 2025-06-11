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
import { calculateFateRateUpPriorityData } from "../tool/fate/fateRateUpPriorityDataService";
import {
  loadPersonalCriticalDamageData,
  savePersonalCriticalDamageData,
} from "../tool/fate/criticalDamageDataService";
import {
  loadPersonalJadeChoiceData,
  savePersonalJadeChoiceData,
} from "../tool/jade/jadeChoiceDataService";

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
  const fatePriority = useMemo(
    () =>
      calculateFateRateUpPriorityData(
        fatesWithRate,
        rateRalated.awakeningData.攻击,
        criticalDamage
      ),
    [criticalDamage, fatesWithRate, rateRalated.awakeningData.攻击]
  );

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
      fatePriority,
    },
  };
  return (
    <PersonalDataContext.Provider value={values}>
      {children}
    </PersonalDataContext.Provider>
  );
}
