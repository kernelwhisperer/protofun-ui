import { Button } from "@mui/material"
import { useSnackbar } from "notistack"
import React, { useEffect, useState } from "react"

import { $posthog } from "../../stores/app"
import { DismissButton } from "../DismissButton"

export function PWA() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [asked, setAsked] = useState(false)

  useEffect(() => {
    // console.log("Setting up 'beforeinstallprompt' eventListener")

    function handleEvent(event: any) {
      event.preventDefault()
      // console.log("Event 'beforeinstallprompt' triggered")

      setTimeout(() => {
        enqueueSnackbar("App ready to be installed.", {
          action: (snackKey) => (
            <>
              <Button
                size="small"
                color="accent"
                variant="contained"
                onClick={() => {
                  event.prompt()
                  event.userChoice.then((choiceResult: { outcome: string }) => {
                    setAsked(true)
                    closeSnackbar(snackKey)
                    if (choiceResult.outcome === "accepted") {
                      console.log("User accepted the Install prompt")
                      $posthog.get()?.capture("AppInstallAccepted")
                    } else {
                      $posthog.get()?.capture("AppInstallDeclined")
                      console.log("User dismissed the Install prompt")
                    }
                  })
                }}
              >
                Install app
              </Button>
              <DismissButton size="small" snackKey={snackKey} />
            </>
          ),
        })
      }, 5_000)
    }
    if (asked) return

    window.addEventListener("beforeinstallprompt", handleEvent)

    return function cleanup() {
      // console.log("Removing 'beforeinstallprompt' eventListener")
      window.removeEventListener("beforeinstallprompt", handleEvent)
    }
  }, [asked, closeSnackbar, enqueueSnackbar])

  return null
}
