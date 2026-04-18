import React from "react";
import Select, { StylesConfig } from "react-select";

type Option = { label: string | number; value: string | number };

const colourStyles: StylesConfig<Option, false> = {
  control: (base) => ({ ...base, backgroundColor: "white" }),
  option: (base) => ({
    ...base,
    backgroundColor: "white",
    color: "black",
    cursor: "default",
    ":active": {
      backgroundColor: "#c5d86d",
      color: "white",
    },
  }),
};

export const CustomSelect: React.FC<{
  options: Option[];
}> = ({ options }) => (
  <Select<Option, false> options={options} styles={colourStyles} />
);
