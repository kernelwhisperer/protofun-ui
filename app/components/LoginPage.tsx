"use client";

import { LoadingButton } from "@mui/lab";
import { Link as MuiLink, TextField, Typography } from "@mui/material";
import { useStore } from "@nanostores/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { FormEvent, useCallback, useEffect, useState } from "react";

import { login } from "../api/auth";
import { $user } from "../stores/user";
import { logError } from "../utils/client-utils";
import { PageTitle } from "./PageTitle";
import { StaggeredList } from "./StaggeredList";
import { RobotoMonoFF } from "./Theme/fonts";

export function Login() {
  const user = useStore($user);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const email = (event.target as any).email.value as string;
      const pass = (event.target as any).pass.value as string;
      setLoading(true);

      login(email, pass)
        .then(() => {
          router.push("/");
        })
        .catch((error) => {
          logError(error);
          enqueueSnackbar(`Error: ${String(error)}`, {
            variant: "error",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [enqueueSnackbar, router]
  );

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [router, user]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <StaggeredList sx={{ marginTop: "31px" }} gap={2}>
          <PageTitle fontFamily={RobotoMonoFF}>Login</PageTitle>
          <TextField
            sx={{ minWidth: 260 }}
            variant="outlined"
            label="Email address"
            autoComplete="email"
            name="email"
          />
          <TextField
            sx={{ minWidth: 260 }}
            variant="outlined"
            label="Password"
            type="password"
            autoComplete="current-password"
            name="pass"
          />
          <LoadingButton
            loading={loading}
            type="submit"
            color="accent"
            variant="contained"
          >
            Login
          </LoadingButton>
          <Typography variant="body2">
            Don&apos;t have an account?{" "}
            <MuiLink component={Link} href="/sign-up">
              Sign up
            </MuiLink>
          </Typography>
        </StaggeredList>
      </form>
    </>
  );
}
