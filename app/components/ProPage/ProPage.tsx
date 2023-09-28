"use client"
import { Paper, Stack } from "@mui/material"
import React from "react"

import { ProChart } from "../ProChart/ProChart"
import { StaggeredList } from "../StaggeredList"

export function ProPage() {
  return (
    <StaggeredList>
      <Stack gap={1} style={{ width: "100%" }}>
        <Paper
          elevation={0}
          sx={{
            border: 0,
            height: "calc(100vh - 372px)",
            maxHeight: "800px",
            minHeight: "400px",
            position: "relative",
          }}
        >
          <ProChart />
        </Paper>
      </Stack>
    </StaggeredList>
  )
}
