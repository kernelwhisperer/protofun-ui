"use client";
import { Box, BoxProps } from "@mui/material";
import React, { ReactNode } from "react";

export function PageWrapper(props: BoxProps & { children?: ReactNode }) {
  return (
    <Box sx={{ paddingBottom: 4, paddingX: 2, width: "100%" }} {...props} />
  );
}
