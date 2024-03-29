import { MarkEmailReadOutlined } from "@mui/icons-material"
import {
  avatarClasses,
  Box,
  Button,
  List,
  ListItem,
  listItemAvatarClasses,
  ListItemButton,
  ListItemText,
  listItemTextClasses,
  Typography,
} from "@mui/material"
import { useStore } from "@nanostores/react"
import { formatDistance } from "date-fns"
import Decimal from "decimal.js"
import Link from "next/link"
import { useSnackbar } from "notistack"
import {
  formatNumber,
  getMetric,
  getMetricPrecision,
  getSignificantDigits,
  PROTOCOL_MAP,
} from "protofun"
import { Notification } from "protofun-service"
import React, { useCallback } from "react"

import { $notifications, archiveNotification } from "../../../api/notifications-api"
import { logError, PopoverToggleProps } from "../../../utils/client-utils"
import { RobotoMonoFF } from "../../Theme/fonts"

export function NotifPanel({ toggleOpen }: Pick<PopoverToggleProps, "toggleOpen">) {
  const { enqueueSnackbar } = useSnackbar()
  const notifications = useStore($notifications)

  const handleClick = useCallback(
    (notification: Notification) => {
      toggleOpen()
      archiveNotification(notification).catch((error: Error) => {
        logError(error)
        enqueueSnackbar(`Error: ${error.message}`, {
          variant: "error",
        })
      })
    },
    [enqueueSnackbar, toggleOpen]
  )

  const handleMarkAll = useCallback(() => {
    $notifications.get().forEach((notification) => {
      archiveNotification(notification).catch((error: Error) => {
        logError(error)
        enqueueSnackbar(`Error: ${error.message}`, {
          variant: "error",
        })
      })
    })
  }, [enqueueSnackbar])

  return (
    <>
      {notifications.length === 0 && (
        <Box marginY={3} marginX={2}>
          <Typography variant="caption">
            Nothing to see here.
            <br />
            None of your alerts went off.
          </Typography>
        </Box>
      )}
      <List
        disablePadding
        sx={(theme) => ({
          [`& .${listItemTextClasses.primary}`]: {
            // fontSize: theme.typography.body2.fontSize,
          },
          [`& .${listItemTextClasses.secondary}`]: {
            color: "var(--mui-palette-text-disabled)",
            fontSize: theme.typography.caption.fontSize,
          },
          [`& .${listItemAvatarClasses.root} .${avatarClasses.root}`]: {
            bgcolor: "var(--mui-palette-primary-main)",
          },
        })}
      >
        {/* TODO */}
        {notifications.slice(0, 20).map((notification) => {
          const notifDatetime = new Date(notification.createdAt * 1000)
          const notifDateLabel = formatDistance(notifDatetime, new Date(), {
            addSuffix: true,
          })

          const { alert } = notification

          if (!alert) {
            return (
              <ListItem
                dense
                key={notification.id}
                disablePadding
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  minWidth: 280,
                }}
              >
                <ListItemButton
                  disabled={notification.archived}
                  dense
                  onClick={() => handleClick(notification)}
                >
                  <ListItemText
                    primaryTypographyProps={{
                      fontSize: "0.825rem",
                      // lineHeight: "1.4",
                      variant: "body2",
                    }}
                    primary={notification.text}
                    secondary={notifDateLabel}
                  />
                </ListItemButton>
              </ListItem>
            )
          }

          const protocol = PROTOCOL_MAP[alert.protocolId]
          const metric = getMetric(alert.protocolId, alert.metricId)

          const { priceUnits } = metric
          const unitLabel = priceUnits[alert.priceUnitIndex]

          const value = formatNumber(
            new Decimal(alert.triggerValue)
              .div(getMetricPrecision(metric, alert.variantIndex))
              .toNumber(),
            getSignificantDigits(metric, alert.priceUnitIndex)
          )

          return (
            <ListItem
              dense
              key={notification.id}
              disablePadding
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                minWidth: 280,
              }}
            >
              <ListItemButton
                disabled={notification.archived}
                dense
                component={Link}
                // FIXME
                href={`/${alert.protocolId}/${alert.metricId}?unit=${alert.priceUnitIndex}&variant=${alert.variantIndex}`}
                onClick={() => handleClick(notification)}
              >
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "0.825rem",
                    // lineHeight: "1.4",
                    variant: "body2",
                  }}
                  primary={
                    <>
                      {protocol.title}&apos;s {metric.title}{" "}
                      {metric.variants ? `(${metric.variants[alert.variantIndex].label})` : ""}{" "}
                      {alert.increase ? "increased" : "decreased"} to{" "}
                      <Typography
                        fontWeight={500}
                        fontFamily={RobotoMonoFF}
                        variant="body2"
                        component="span"
                        fontSize="0.825rem"
                      >
                        {value} {unitLabel}
                      </Typography>
                      .
                    </>
                  }
                  secondary={notifDateLabel}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      {notifications.length > 0 && (
        <Button
          sx={{
            "&:not(:hover) > span": {
              opacity: 0.5,
            },
            background: "var(--mui-palette-secondary-main) !important",
            bottom: 0,
            position: "absolute",
            transform: "none !important",
          }}
          size="small"
          fullWidth
          endIcon={<MarkEmailReadOutlined fontSize="small" />}
          onClick={handleMarkAll}
        >
          <span>Mark all notifications as read</span>
        </Button>
      )}
    </>
  )
}
