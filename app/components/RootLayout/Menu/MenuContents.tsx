import { GitHub, Twitter } from "@mui/icons-material";
import { Link as MuiLink, MenuItem, Stack, Typography } from "@mui/material";
import { m } from "framer-motion";
import * as React from "react";

import { AppVerProps } from "../../../stores/app";
import DiscordIcon from "./discord.svg";
import { ReducedMotion } from "./ReducedMotion";
import { ThemeMode } from "./ThemeMode";

const variants = {
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  open: {
    transition: { delayChildren: 0.2, staggerChildren: 0.07 },
  },
};

const childVariants = {
  closed: {
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
    y: 50,
  },
  open: {
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
    y: 0,
  },
};

const CustomLink = ({ children, ...rest }: any) => (
  <m.div variants={childVariants}>
    <MenuItem component={MuiLink} {...rest}>
      <Typography
        variant="h6"
        fontWeight={600}
        sx={{
          alignItems: "center",
          display: "flex",
          gap: 1,
        }}
      >
        {children}
      </Typography>
    </MenuItem>
  </m.div>
);

export const MenuContents = ({ appVer, gitHash }: AppVerProps) => (
  <Stack
    marginTop={4}
    gap={1}
    paddingLeft={2}
    paddingRight={1}
    component={m.div}
    variants={variants}
  >
    <m.div variants={childVariants}>
      <Typography
        variant="subtitle2"
        letterSpacing="0.08rem"
        sx={{ marginTop: 4 }}
      >
        SOCIAL
      </Typography>
    </m.div>
    <CustomLink
      target="_blank"
      rel="noopener noreferrer"
      href="https://discord.gg/J52KU8k4Bd"
    >
      <DiscordIcon width="20px" height="20px" />
      <span>Discord</span>
    </CustomLink>
    <CustomLink
      target="_blank"
      rel="noopener noreferrer"
      href="https://twitter.com/kernelwhisperer"
    >
      <Twitter fontSize="small" />
      <span>Twitter</span>
    </CustomLink>
    <CustomLink
      target="_blank"
      rel="noopener noreferrer"
      href="https://github.com/kernelwhisperer/"
    >
      <GitHub fontSize="small" />
      <span>GitHub</span>
    </CustomLink>
    <m.div variants={childVariants}>
      <Typography
        variant="subtitle2"
        letterSpacing="0.08rem"
        sx={{ marginTop: 4 }}
      >
        THEME
      </Typography>
    </m.div>
    <m.div variants={childVariants}>
      <ThemeMode />
    </m.div>
    <m.div variants={childVariants}>
      <Typography
        variant="subtitle2"
        letterSpacing="0.08rem"
        sx={{ marginTop: 4 }}
      >
        ANIMATIONS
      </Typography>
    </m.div>
    <m.div variants={childVariants}>
      <ReducedMotion />
    </m.div>
    <m.div variants={childVariants}>
      <Typography sx={{ marginTop: 4, opacity: 0.5 }} variant="body2">
        App version: {appVer}
      </Typography>
      <Typography sx={{ opacity: 0.5 }} variant="body2">
        App digest: {gitHash.slice(0, 7)}
      </Typography>
    </m.div>
  </Stack>
);
