import { ClearOutlined } from "@mui/icons-material";
import {
  Avatar,
  avatarClasses,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  listItemAvatarClasses,
  ListItemButton,
  ListItemText,
  listItemTextClasses,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useStore } from "@nanostores/react";
import Decimal from "decimal.js";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useCallback } from "react";

import { $alerts, Alert, removeAlert } from "../../../api/alerts-api";
import { METRIC_ICONS_MAP } from "../../../stores/metric-icons";
import { METRICS_MAP } from "../../../stores/metrics";
import { PROTOCOL_MAP } from "../../../stores/protocols";
import { formatNumber, logError } from "../../../utils/client-utils";
import { RobotoMonoFF } from "../../Theme/fonts";

function formatValue(alert: Alert) {
  const metric = METRICS_MAP[alert.protocolId][alert.metricId];
  if (!metric) {
    throw new Error("Metric should not be undefined");
  }

  const { precision, significantDigits, priceUnits } = metric;
  const unitLabel = priceUnits[0];

  const value = formatNumber(
    new Decimal(alert.triggerValue).div(precision).toNumber(),
    significantDigits[0],
    "compact"
  );

  return { metric, unitLabel, value };
}

export function AlertsPanel({ toggleOpen }: any) {
  const { enqueueSnackbar } = useSnackbar();
  const alerts = useStore($alerts);
  const searchParams = useSearchParams();

  const handleRemove = useCallback(
    (alert: Alert) => {
      removeAlert(alert)
        .then(() => {
          enqueueSnackbar("Alert deleted");
        })
        .catch((error: Error) => {
          logError(error);
          enqueueSnackbar(`Error: ${error.message}`, {
            variant: "error",
          });
        });
    },
    [enqueueSnackbar]
  );

  return (
    <>
      {alerts.length === 0 && (
        <Box marginY={3} marginX={2}>
          <Typography variant="caption">
            Nothing to see here.
            <br />
            Visit a metric and click on its chart to create an alert.
          </Typography>
        </Box>
      )}
      <List
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
        {alerts.map((alert) => {
          const { value, unitLabel, metric } = formatValue(alert);
          const Icon = METRIC_ICONS_MAP[metric.protocol][metric.id];
          const protocol = PROTOCOL_MAP[metric.protocol];

          return (
            <ListItem
              dense
              key={alert.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  color="inherit"
                  tabIndex={2}
                  onClick={() => handleRemove(alert)}
                >
                  <ClearOutlined fontSize="small" />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton
                dense
                component={Link}
                href={`/${metric.protocol}/${
                  metric.id
                }?${searchParams?.toString()}`}
                onClick={toggleOpen}
              >
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ horizontal: "right", vertical: "top" }}
                    badgeContent={
                      <Avatar
                        sx={{
                          border: `2px solid var(--mui-palette-background-default)`,
                          fontSize: "1.25rem",
                          height: 28,
                          marginLeft: 1,
                          width: 28,
                        }}
                      >
                        <Icon fontSize={"1.25rem"} />
                      </Avatar>
                    }
                  >
                    <Avatar sx={{ height: 32, width: 32 }}>
                      <SvgIcon
                        inheritViewBox
                        component={protocol.icon}
                        width="100%"
                        height="100%"
                        sx={{
                          fontSize: "50px",
                          height: "100%",
                          padding: `calc(${protocol.iconPadding} / 4)`,
                          width: "100%",
                        }}
                      />
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <span>
                      {metric.title} to cross{" "}
                      <Typography
                        fontFamily={RobotoMonoFF}
                        variant="body2"
                        component={"span"}
                      >
                        {value}
                      </Typography>{" "}
                      {unitLabel}
                    </span>
                  }
                  secondary="Jan 7, 16:50:32"
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
