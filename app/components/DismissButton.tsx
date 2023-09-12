import { Button, ButtonProps } from "@mui/material"
import { SnackbarKey, useSnackbar } from "notistack"
import React, { useCallback } from "react"

export function DismissButton(props: ButtonProps & { snackKey: SnackbarKey }) {
  const { snackKey, ...rest } = props
  const { closeSnackbar } = useSnackbar()

  const handleClick = useCallback(() => {
    closeSnackbar(snackKey)
  }, [closeSnackbar, snackKey])

  return (
    <Button color="secondary" onClick={handleClick} {...rest}>
      Dismiss
    </Button>
  )
}
