import { AccountCircleRounded } from "@mui/icons-material"
import { Avatar, Box, Button, ButtonGroup, Stack, Typography } from "@mui/material"
import { useStore } from "@nanostores/react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import React, { useCallback, useEffect, useState } from "react"

import { checkLogin, logout } from "../../../api/users-api"
import { $loopsAllowed } from "../../../stores/app"
import { $user } from "../../../stores/user"
import { PopoverToggleProps } from "../../../utils/client-utils"
import { RobotoMonoFF } from "../../Theme/fonts"

export function AccountSection({ toggleOpen }: Pick<PopoverToggleProps, "toggleOpen">) {
  const searchParams = useSearchParams()
  const user = useStore($user)
  const [userUUID, setUserUUID] = useState("")

  useEffect(() => {
    const localId = localStorage.getItem("fun-user-uuid")
    if (localId) {
      setUserUUID(localId)
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

  return (
    <>
      <Stack direction="row" alignItems="center">
        {user ? (
          <Avatar
          // sx={{ fontSize: "0.8rem", height: 24, width: 24 }}
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
          <span style={{ fontFamily: RobotoMonoFF }}>{user ? `#${user.id}` : userUUID}</span>
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
