import { AccountCircleRounded } from "@mui/icons-material"
import { Avatar, Box, Button, ButtonGroup, Stack, Typography } from "@mui/material"
import { useStore } from "@nanostores/react"
import md5 from "md5"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import React, { useCallback, useEffect, useMemo, useState } from "react"

import { checkLogin, logout } from "../../../api/users-api"
import { $loopsAllowed, $user } from "../../../stores/app"
import { getDeviceId, PopoverToggleProps } from "../../../utils/client-utils"
import { RobotoMonoFF } from "../../Theme/fonts"

export function AccountSection({ toggleOpen }: Pick<PopoverToggleProps, "toggleOpen">) {
  const searchParams = useSearchParams()
  const user = useStore($user)
  const [deviceUUID, setDeviceUUID] = useState("")

  useEffect(() => {
    const deviceId = getDeviceId()
    if (deviceId) {
      setDeviceUUID(deviceId)
    }
  }, [])

  const handleLogout = useCallback(() => {
    toggleOpen()
    setTimeout(
      () => {
        logout().then()
      },
      $loopsAllowed.get() ? 500 : 80
    )
  }, [toggleOpen])

  useEffect(() => {
    checkLogin()
  }, [])

  const gravatar = useMemo(
    () => (user?.email ? `https://www.gravatar.com/avatar/${md5(user.email)}` : undefined),
    [user?.email]
  )

  return (
    <>
      <Stack direction="row" alignItems="center">
        {user ? (
          <Avatar
            // sx={{ fontSize: "0.8rem", height: 24, width: 24 }}
            src={gravatar}
          >
            {user.email[0].toUpperCase()}
          </Avatar>
        ) : (
          <AccountCircleRounded sx={{ fontSize: 42 }} />
        )}

        <Typography variant="caption" marginX={1}>
          <span style={{ marginRight: 8, opacity: 0.7 }}>Email</span>
          <span style={{ fontFamily: RobotoMonoFF }}>{user ? user.email : "Unknown"}</span>
          <br />
          <span style={{ marginRight: 8, opacity: 0.7 }}>User ID</span>
          <span style={{ fontFamily: RobotoMonoFF }}>{user ? `#${user.id}` : deviceUUID}</span>
        </Typography>
      </Stack>
      <Box sx={{ marginTop: 2 }}>
        {user ? (
          <Button
            sx={{ minWidth: "90px !important" }}
            onClick={handleLogout}
            variant="outlined"
            size="medium"
          >
            Logout
          </Button>
        ) : (
          <ButtonGroup variant="outlined" size="medium">
            <Button
              sx={{ minWidth: "90px !important" }}
              component={Link}
              href={`/login?${searchParams?.toString()}`}
              onClick={toggleOpen}
            >
              Login
            </Button>
            <Button
              sx={{ minWidth: "90px !important" }}
              component={Link}
              href={`/sign-up?${searchParams?.toString()}`}
              onClick={toggleOpen}
            >
              Sign up
            </Button>
          </ButtonGroup>
        )}
      </Box>
    </>
  )
}
