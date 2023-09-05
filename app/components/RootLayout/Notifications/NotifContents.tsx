import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, tabClasses } from "@mui/material";
import React from "react";

import { RobotoMonoFF } from "../../Theme/fonts";
import { AlertsPanel } from "./AlertsPanel";
import { NotifPanel } from "./NotifPanel";

export function NotifContents({ toggleOpen }) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <TabContext value={value}>
        <Box
          id="notif-dialog-title"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{
              [`& .${tabClasses.root}`]: {
                color: "var(--mui-palette-primary-main)",
                fontFamily: RobotoMonoFF,
                textTransform: "none",
              },
              [`& .${tabClasses.root}:not(.${tabClasses.selected})`]: {
                opacity: 0.66,
              },
            }}
          >
            <Tab label="Notifications" value="1" />
            <Tab label="Alerts" value="2" />
          </TabList>
        </Box>
        <TabPanel sx={{ padding: 0 }} value="1">
          <NotifPanel />
        </TabPanel>
        <TabPanel sx={{ padding: 0 }} value="2">
          <AlertsPanel />
        </TabPanel>
      </TabContext>
    </>
  );
}
