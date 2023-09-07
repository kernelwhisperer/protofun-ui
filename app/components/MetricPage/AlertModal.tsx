import { AddRounded, CloseRounded, RemoveRounded } from "@mui/icons-material";
import { LoadingButton, loadingButtonClasses } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  outlinedInputClasses,
  PopoverVirtualElement,
  Stack,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useCallback, useMemo, useRef, useState } from "react";

import { createAlert } from "../../api/alerts-api";
import { Metric } from "../../stores/metrics";
import { AlertDraft } from "../../utils/alert-utils";
import { logError } from "../../utils/client-utils";
import { PopoverPaper, PopoverPaperProps } from "../PopoverPaper";
import { RobotoMonoFF } from "../Theme/fonts";

type NotificationModalProps = {
  draft?: AlertDraft;
  metric: Metric;
  setDraft: (draft?: AlertDraft) => void;
};

const DIALOG_WIDTH = 240;

export default function AlertModal(props: NotificationModalProps) {
  const { metric, draft, setDraft } = props;
  const inputRef = useRef<HTMLInputElement>();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleClose = useCallback(() => {
    setDraft(undefined);
  }, [setDraft]);

  const handleSubmit = useCallback(() => {
    if (!draft) {
      return;
    }

    setLoading(true);
    createAlert({
      metricId: metric.id,
      protocolId: metric.protocol,
      triggerValue: String(draft.value * metric.precision),
    })
      .then(() => {
        enqueueSnackbar("Alert created");
        setDraft(undefined);
      })
      .catch((error: Error) => {
        logError(error);
        enqueueSnackbar(`Error: ${error.message}`, {
          variant: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [draft, enqueueSnackbar, metric, setDraft]);

  const virtualElement: PopoverVirtualElement | null = useMemo(
    () =>
      !draft
        ? null
        : {
            getBoundingClientRect: function () {
              return {
                bottom: draft.clientY,
                height: 1,
                left: draft.clientX - 16,
                right: draft.clientX - 16,
                toJSON: () => "",
                top: draft.clientY,
                width: 1,
                x: draft.clientX - 16,
                y: draft.clientY,
              };
            },
            nodeType: 1,
          },
    [draft]
  );

  if (!draft) return;

  return (
    <>
      <Dialog
        open
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        hideBackdrop
        PaperProps={
          {
            popoverProps: {
              anchorEl: virtualElement,
              onClose: handleClose,
              open: true,
            },
            sx: {
              background: "var(--mui-palette-primary-main)",
              margin: 1,
              width: DIALOG_WIDTH,
            },
          } as PopoverPaperProps
        }
        PaperComponent={PopoverPaper as never}
      >
        <DialogTitle
          id="alert-dialog-title"
          color="text.secondary"
          fontFamily={RobotoMonoFF}
        >
          <span>Create alert</span>
          <IconButton
            sx={{ marginRight: -1 }}
            onClick={handleClose}
            color="secondary"
          >
            <CloseRounded />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" marginBottom={3}>
            Get a push notification when <b>{metric.title}</b> crosses a certain
            value.
          </DialogContentText>
          <TextField
            autoFocus
            size="medium"
            inputRef={inputRef}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Stack>
                    <IconButton
                      size="small"
                      color="secondary"
                      onClick={() => {
                        if (!inputRef.current) return;

                        inputRef.current.stepUp();
                        setDraft({
                          ...draft,
                          value: parseFloat(inputRef.current.value),
                        });
                      }}
                      sx={{ borderRadius: 0, marginRight: -1, padding: 0 }}
                    >
                      <AddRounded fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="secondary"
                      onClick={() => {
                        if (!inputRef.current) return;

                        inputRef.current.stepDown();
                        setDraft({
                          ...draft,
                          value: parseFloat(inputRef.current.value),
                        });
                      }}
                      sx={{ borderRadius: 0, marginRight: -1, padding: 0 }}
                    >
                      <RemoveRounded fontSize="small" />
                    </IconButton>
                  </Stack>
                </InputAdornment>
              ),
              sx: {
                [`& .${outlinedInputClasses.notchedOutline}`]: {
                  borderColor: "var(--mui-palette-secondary-main) !important",
                },
                color: "text.secondary",
                fontFamily: RobotoMonoFF,
              },
            }}
            InputLabelProps={{
              sx: {
                color: "var(--mui-palette-secondary-main)",
              },
            }}
            type="number"
            color="secondary"
            id="outlined-basic"
            variant="outlined"
            label="Trigger value"
            value={draft?.value}
            onChange={(event) => {
              setDraft({
                ...draft,
                value: parseFloat(event.target.value),
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton
            loading={loading}
            onClick={handleSubmit}
            color="accent"
            variant="contained"
            sx={{
              [`&.${loadingButtonClasses.root}`]: {
                bgcolor: loading
                  ? "var(--mui-palette-background-disabled)"
                  : undefined,
              },
              [`& .${loadingButtonClasses.loadingIndicator}`]: {
                color: "var(--mui-palette-secondary-main)",
              },
            }}
          >
            Create alert
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
