import { ProColumnType } from "@ant-design/pro-components";
import { get } from "lodash";
import { ReactNode } from "react";

function createFixValuesFilterProps(
  namePath: string | readonly string[],
  values: readonly (string | number)[],
  texts?: readonly ReactNode[],
  cmp: (a: string | number, b: string | number, record: unknown) => boolean = (
    a,
    b
  ) => a === b
): Pick<ProColumnType<unknown>, "filters" | "onFilter"> {
  return {
    filters: values.map((v, i) => ({ text: texts ? texts[i] : v, value: v })),
    onFilter: (value, record) =>
      cmp(get(record, namePath), value as string | number, record),
  };
}

export default createFixValuesFilterProps;
