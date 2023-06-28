import { Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

interface ProgressProps {
  errorMessage: string;
}

export function ErrorOverlay(props: ProgressProps) {
  const { errorMessage } = props;

  return (
    <Stack
      style={{ zIndex: errorMessage ? 999 : undefined }}
      sx={{
        left: 0,
        position: "absolute",
        right: 0,
      }}
      alignItems="center"
      justifyContent="center"
      height={"100%"}
    >
      <motion.div
        animate={errorMessage ? "show" : "hide"}
        variants={{
          hide: {
            opacity: 0,
          },
          show: {
            opacity: 1,
          },
        }}
      >
        <Typography>{errorMessage}</Typography>
      </motion.div>
    </Stack>
  );
}
