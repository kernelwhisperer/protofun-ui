import { Box, Typography } from "@mui/material";
import React from "react";

export function NotifPanel() {
  return (
    <Box marginTop={3}>
      <Typography sx={{ paddingX: 2 }} variant="caption">
        Nothing to see here yet.
      </Typography>
    </Box>
  );
}
