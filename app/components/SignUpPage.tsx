"use client";

import { LoadingButton } from "@mui/lab";
import { Link as MuiLink, TextField, Typography } from "@mui/material";
import { useStore } from "@nanostores/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { FormEvent, useCallback, useEffect, useState } from "react";

import { signUp } from "../api/auth";
import { PageTitle } from "../components/PageTitle";
import { StaggeredList } from "../components/StaggeredList";
import { RobotoMonoFF } from "../components/Theme/fonts";
import { $user } from "../stores/user";
import { logError } from "../utils/client-utils";

export function SignUp() {
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

      signUp(email, pass)
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
          <PageTitle fontFamily={RobotoMonoFF}>Sign up</PageTitle>
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
            autoComplete="new-password"
            name="pass"
          />
          <LoadingButton
            loading={loading}
            type="submit"
            color="accent"
            variant="contained"
          >
            Sign up
          </LoadingButton>
          <Typography variant="body2">
            Already have an account?{" "}
            <MuiLink component={Link} href="/login">
              Login
            </MuiLink>
          </Typography>
        </StaggeredList>
      </form>
    </>
  );
}
