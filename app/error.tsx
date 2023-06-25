"use client";

import { Typography } from "@mui/material";
import React from "react";

import { PageWrapper } from "./components/RootLayout/PageWrapper";
import { RobotoSerifFF } from "./components/Theme/fonts";

export default function ErrorPage({
  error,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <PageWrapper>
      <Typography
        variant="h4"
        fontWeight={500}
        fontFamily={RobotoSerifFF}
        sx={{ marginBottom: 3 }}
      >
        Something unexpected happened.
      </Typography>
      <Typography variant="body1"> {String(error)}</Typography>
    </PageWrapper>
  );
}
