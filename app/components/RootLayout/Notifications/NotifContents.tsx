import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box, Chip, Stack, Tab, tabClasses } from "@mui/material"
import { useStore } from "@nanostores/react"
import React from "react"

import { $activeAlerts } from "../../../api/alerts-api"
import { RobotoMonoFF } from "../../Theme/fonts"
import { AlertsPanel } from "./AlertsPanel"
import { NotifPanel } from "./NotifPanel"

export function NotifContents({ toggleOpen }: any) {
  const [value, setValue] = React.useState("1")

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const activeAlerts = useStore($activeAlerts)

  return (
    <>
      <TabContext value={value}>
        <Box id="notif-dialog-title" sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            variant="scrollable"
            // scrollButtons
            aria-label="lab API tabs example" // TODO
            sx={{
              // overflowX: "auto",
              [`& .${tabClasses.root}`]: {
                color: "var(--mui-palette-primary-main)",
                letterSpacing: "0.05rem",
                textTransform: "none",
              },
              [`& .${tabClasses.root}:not(.${tabClasses.selected})`]: {
                opacity: 0.66,
              },
            }}
          >
            <Tab label="Notifications" value="1" />
            <Tab
              label={
                <Stack direction="row" alignItems="center">
                  <span>Alerts</span>
                  <Chip
                    label={activeAlerts}
                    size="small"
                    disabled
                    sx={{
                      display: "inline-flex",
                      fontFamily: RobotoMonoFF,
                      letterSpacing: 1,
                      marginLeft: 1,
                    }}
                  />
                </Stack>
              }
              value="2"
            ></Tab>
          </TabList>
        </Box>
        <TabPanel sx={{ height: "100%", overflow: "auto", padding: 0 }} value="1">
          <NotifPanel toggleOpen={toggleOpen} />
        </TabPanel>
        <TabPanel sx={{ height: "100%", overflow: "auto", padding: 0 }} value="2">
          <AlertsPanel toggleOpen={toggleOpen} />
        </TabPanel>
      </TabContext>
    </>
  )
}
