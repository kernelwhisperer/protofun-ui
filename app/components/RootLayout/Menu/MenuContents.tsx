import { GitHub, Twitter } from "@mui/icons-material";
import { Link as MuiLink, MenuItem, Typography } from "@mui/material";
import * as React from "react";

import { AppVerProps } from "../../../stores/app";
import { SPRING_CONFIGS } from "../../../utils/client-utils";
import { StaggeredList } from "../../StaggeredList";
import { RobotoMonoFF } from "../../Theme/fonts";
import DiscordIcon from "./discord.svg";
import { ReducedMotion } from "./ReducedMotion";
import { ThemeMode } from "./ThemeMode";

const CustomLink = ({ children, ...rest }: any) => (
  <MenuItem component={MuiLink} tabIndex={0} role="button" {...rest}>
    <Typography
      variant="h6"
      component="div"
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
);

type MenuContentsProps = AppVerProps & {
  open: boolean;
};

export const MenuContents = ({ appVer, gitHash, open }: MenuContentsProps) => (
  <StaggeredList
    config={open ? SPRING_CONFIGS.quick : SPRING_CONFIGS.veryQuick}
    marginTop={4}
    marginBottom={2}
    gap={1}
    paddingX={2}
    show={open}
    sx={{ overflow: "hidden" }}
  >
    <div role="list" aria-labelledby="social-links">
      <div>
        <Typography
          variant="subtitle2"
          letterSpacing="0.08rem"
          sx={{ marginTop: 4 }}
        >
          THEME
        </Typography>
        <ThemeMode />
      </div>
      <div>
        <Typography
          variant="subtitle2"
          letterSpacing="0.08rem"
          sx={{ marginTop: 4 }}
        >
          ANIMATIONS
        </Typography>
        <ReducedMotion />
      </div>
      <Typography
        variant="subtitle2"
        letterSpacing="0.08rem"
        sx={{ marginTop: 4 }}
        id="social-links"
        role="listitem"
      >
        SOCIAL
      </Typography>
      <CustomLink
        target="_blank"
        rel="noopener noreferrer"
        href="https://discord.gg/J52KU8k4Bd"
        role="listitem"
      >
        <DiscordIcon width="20px" height="20px" />
        <span>Discord</span>
      </CustomLink>
      <CustomLink
        target="_blank"
        rel="noopener noreferrer"
        href="https://twitter.com/kernelwhisperer"
        role="listitem"
      >
        <Twitter fontSize="small" />
        <span>Twitter</span>
      </CustomLink>
      <CustomLink
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/kernelwhisperer/"
        role="listitem"
      >
        <GitHub fontSize="small" />
        <span>GitHub</span>
      </CustomLink>
    </div>
    <div>
      <Typography
        sx={{ marginTop: 4, opacity: 0.5 }}
        fontFamily={RobotoMonoFF}
        variant="body2"
      >
        App version: {appVer}
      </Typography>
      <Typography
        sx={{ opacity: 0.5 }}
        fontFamily={RobotoMonoFF}
        variant="body2"
      >
        App digest: {gitHash.slice(0, 7)}
      </Typography>
    </div>
  </StaggeredList>
);
