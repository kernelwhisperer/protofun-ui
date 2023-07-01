import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";

import { Metric } from "../../stores/metrics";

export function MetricVariantSelector({ variants }: Pick<Metric, "variants">) {
  const [variant, setVariant] = useState(variants?.[0].value);
  console.log("📜 LOG > MetricVariantSelector > variant:", variant);

  const handleChange = (event: SelectChangeEvent) => {
    if (typeof event.target.value === "string") return;
    setVariant(event.target.value);
  };

  if (!variants) return null;

  return (
    <Select
      sx={{
        "& .MuiSelect-select": {
          borderRadius: "32px !important",
          paddingTop: 1,
        },
        borderRadius: 8,
        verticalAlign: "text-bottom",
      }}
      variant="filled"
      value={variant as any}
      onChange={handleChange}
      disableUnderline
      MenuProps={{
        elevation: 0,
      }}
    >
      {variants.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
}
