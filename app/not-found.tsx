"use client";

import { Typography } from "@mui/material";
import React from "react";

import { PageTitle } from "./components/PageTitle";
import { PageWrapper } from "./components/RootLayout/PageWrapper";
import { StaggeredList } from "./components/StaggeredList";
import { RobotoMonoFF } from "./components/Theme/fonts";

// TODO: https://github.com/vercel/next.js/issues/45620
export const metadata = {
  title: "Page not found · Protocol Fundamentals",
};

export default function NotFound() {
  return (
    <PageWrapper>
      <StaggeredList sx={{ marginTop: "31px" }}>
        <PageTitle fontFamily={RobotoMonoFF}>404 - Page not found</PageTitle>
        <Typography variant="body1">
          We&apos;ve looked everywhere.
          <br />
          We can&apos;t find the page you are looking for.
        </Typography>
      </StaggeredList>
    </PageWrapper>
  );
}
