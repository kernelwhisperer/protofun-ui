import { AddRounded, CloseRounded, RemoveRounded } from "@mui/icons-material";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import React, { useCallback, useRef } from "react";

import { AlertDraft } from "../../utils/alert-utils";
import { RobotoMonoFF } from "../Theme/fonts";

type NotificationModalProps = {
  draft?: AlertDraft;
  metricTitle: string;
  setDraft: (draft?: AlertDraft) => void;
};

const DIALOG_WIDTH = 240;

export default function AlertModal(props: NotificationModalProps) {
  const { metricTitle, draft, setDraft } = props;
  const inputRef = useRef<HTMLInputElement>();

  const handleClose = useCallback(() => {
    setDraft(undefined);
  }, [setDraft]);

  if (!draft) return;

  return (
    <>
      <Dialog
        open
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        slotProps={{ backdrop: { style: { opacity: 0 } } }}
        style={{
          bottom: "unset",
          left: `${draft?.clientX - DIALOG_WIDTH - 16}px`,
          position: "absolute",
          right: "unset",
          top: `${draft?.clientY}px`,
        }}
        PaperProps={{
          sx: {
            background: "var(--mui-palette-primary-main)",
            margin: 1,
            width: DIALOG_WIDTH,
          },
        }}
      >
        <DialogTitle color="text.secondary" fontFamily={RobotoMonoFF}>
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
            Get a push notification when <b>{metricTitle}</b> crosses a certain
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
                color: "text.secondary",
                fontFamily: RobotoMonoFF,
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
          <Button
            // fullWidth
            // onClick={handleClose}
            color="accent"
            variant="contained"
            // endIcon={<AddAlarmRounded />}
          >
            Create alert
            <Chip
              label="WIP"
              size="small"
              disabled
              sx={{ fontFamily: RobotoMonoFF, letterSpacing: 1, marginLeft: 1 }}
            />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
