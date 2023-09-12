"use client"

import { Typography } from "@mui/material"
import React from "react"

import { PageTitle } from "./components/PageTitle"
import { PageWrapper } from "./components/RootLayout/PageWrapper"
import { StaggeredList } from "./components/StaggeredList"
import { RobotoMonoFF } from "./components/Theme/fonts"

export default function ErrorPage({ error }: { error: Error; reset: () => void }) {
  return (
    <PageWrapper>
      <StaggeredList sx={{ marginTop: "31px" }}>
        <PageTitle fontFamily={RobotoMonoFF}>Something unexpected happened</PageTitle>
        <Typography variant="body1">{String(error)}</Typography>
        {/* <Typography variant="body1">{error.stack?.toString()}</Typography> */}
      </StaggeredList>
    </PageWrapper>
  )
}
