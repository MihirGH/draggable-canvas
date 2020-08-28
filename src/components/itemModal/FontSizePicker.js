import React from "react";

import { Select } from "baseui/select";

const FONT_SIZE_OPTIONS = [
  { label: 8, value: 8 },
  { label: 9, value: 9 },
  { label: 10, value: 10 },
  { label: 11, value: 11 },
  { label: 12, value: 12 },
  { label: 14, value: 14 },
  { label: 16, value: 16 },
  { label: 18, value: 18 },
  { label: 24, value: 24 },
  { label: 30, value: 30 },
  { label: 36, value: 36 }
];

export default function FontSizePicker({ onChange, value }) {
  return (
    <Select
      options={FONT_SIZE_OPTIONS}
      value={value}
      placeholder="Select color"
      labelKey="label"
      valueKey="value"
      maxDropdownHeight="300px"
      onChange={onChange}
      overrides={{
        Root: {
          style: () => ({ width: "80px" })
        }
      }}
      clearable={false}
    />
  );
}
