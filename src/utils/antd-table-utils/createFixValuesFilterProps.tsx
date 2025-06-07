import { ProColumnType } from "@ant-design/pro-components";
import { get } from "lodash";
import { ReactNode } from "react";

function createFixValuesFilterProps(
  namePath: string | readonly string[],
  values: readonly (string | number)[],
  options?: {
    texts?: readonly ReactNode[];
    cmp?: (
      itemValue: unknown,
      selectedValue: string | number,
      record: unknown
    ) => boolean;
    filterSearch?: boolean;
  }
): Pick<ProColumnType<unknown>, "filters" | "onFilter" | "filterSearch"> {
  const cmp = options?.cmp || ((a, b) => a === b);
  const texts = options?.texts;
  return {
    filters: values.map((v, i) => ({ text: texts ? texts[i] : v, value: v })),
    onFilter: (value, record) =>
      cmp(get(record, namePath), value as string | number, record),
    filterSearch: options?.filterSearch,
  };
}

export default createFixValuesFilterProps;
