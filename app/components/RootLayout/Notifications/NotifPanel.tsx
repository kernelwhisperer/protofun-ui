import { Box, Typography } from "@mui/material";
import React from "react";

export function NotifPanel() {
  return (
    <Box marginY={3} marginX={2}>
      <Typography variant="caption">
        Nothing to see here.
        <br />
        None of your alerts went off.
      </Typography>
    </Box>
  );
}
