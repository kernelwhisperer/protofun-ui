import {
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import { useStore } from "@nanostores/react";
import React, { useCallback } from "react";
import { useBoolean } from "usehooks-ts";

import { $variantIndex, Metric } from "../../stores/metrics";

export function MetricVariantSelector({
  variants,
  sx,
  ...rest
}: Pick<Metric, "variants"> & SelectProps) {
  const { value: open, toggle: toggleOpen } = useBoolean(false);
  const variantIndex = useStore($variantIndex);

  const handleChange = useCallback((event: SelectChangeEvent) => {
    $variantIndex.set(parseInt(event.target.value));
  }, []);

  if (!variants) return null;

  return (
    <Select
      open={open}
      sx={{
        "& .MuiSelect-select": {
          borderRadius: "32px !important",
          paddingTop: 1,
        },
        borderRadius: 8,
        verticalAlign: "text-bottom",
        ...sx,
      }}
      onClick={toggleOpen}
      variant="filled"
      value={String(variantIndex)}
      onChange={handleChange}
      disableUnderline
      MenuProps={{
        BackdropProps: {
          className: "blurred",
        },
        elevation: 0,
        sx: {
          zIndex: "var(--mui-zIndex-modal)",
        },
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
