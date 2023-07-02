import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useStore } from "@nanostores/react";
import React from "react";

import { $variantIndex, Metric } from "../../stores/metrics";

export function MetricVariantSelector({ variants }: Pick<Metric, "variants">) {
  const variantIndex = useStore($variantIndex);

  const handleChange = (event: SelectChangeEvent) => {
    $variantIndex.set(parseInt(event.target.value));
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
      value={String(variantIndex)}
      onChange={handleChange}
      disableUnderline
      MenuProps={{
        elevation: 0,
      }}
    >
      {variants.map(({ label }, index) => (
        <MenuItem key={index} value={index}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
}
