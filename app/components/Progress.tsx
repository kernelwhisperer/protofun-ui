import { Stack } from "@mui/material";
import { m } from "framer-motion";
import React from "react";

interface ProgressProps {
  loading: boolean;
}

export function Progress(props: ProgressProps) {
  const { loading } = props;

  return (
    <Stack
      className="progress"
      sx={{
        left: 0,
        position: "absolute",
        right: 0,
      }}
      alignItems="center"
      justifyContent="center"
      height={"100%"}
    >
      <m.svg
        width="60"
        height="4"
        viewBox="0 0 60 4"
        fill="var(--mui-palette-primary-main)"
        xmlns="http://www.w3.org/2000/svg"
        animate={loading ? "loading" : "ready"}
        variants={{
          loading: {
            opacity: 1,
          },
          ready: {
            opacity: 0,
          },
        }}
      >
        {loading && (
          <m.line
            initial={{
              opacity: 0,
              pathLength: 0,
              pathOffset: 0,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              pathLength: [0, 1, 1, 1],
              pathOffset: [0, 6, 6, 6],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
            strokeWidth={4}
            stroke="var(--mui-palette-primary-main)"
            fill="none"
            x1="0"
            x2="60"
            y1="2"
            y2="2"
          />
        )}
      </m.svg>
    </Stack>
  );
}
