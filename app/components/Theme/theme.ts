import { alpha, CssVarsThemeOptions } from "@mui/material";

import { RobotoFlexFF } from "./fonts";

declare module "@mui/material" {
  interface TypeBackground {
    glass: string;
  }
  interface ZIndex {
    menu: number;
    menuButton: number;
    title: number;
  }
  // interface SimplePaletteColorOptions {
  //   raw?: string;
  // }
}

// https://colorhunt.co/palette/ff6d60f7d060f3e99f98d8aa
const RETRO_GREY = "rgb(31, 34, 42)";
const RETRO_GREY_AF = "rgb(48, 51, 59)";
// const RETRO_GREY = "rgb(57, 65, 73)";

export const RETRO_BEIGE_1 = "rgb(200, 187, 155)";
const RETRO_BEIGE_1_AF = "rgb(209, 200, 178)";
// const RETRO_YELLOW = "rgb(238, 187, 95)";

const RETRO_BEIGE_2 = "rgb(236, 225, 211)";
const RETRO_PURPLE = "rgb(184, 119, 182)";

export const globalStyles = `
  html {
    overflow-y: scroll;
  }

  body::before {
    // filter: url(#noiseFilter);
    position: fixed;
    left: 0;
    top: 0;
    content: '';
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: var(--mui-palette-background-default);
    opacity: 66%;
  }

  html[data-mui-color-scheme="dark"] body::before {
    opacity: 15%;
  }
  
  ::selection {
    color: white;
    background: var(--mui-palette-secondary-main);
  }

  html {
    scrollbar-width: thin;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
    border-color: transparent;
  }

  ::-webkit-scrollbar,
  ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    width: 10px;
  }

  ::-webkit-scrollbar {
    background-color: ${RETRO_BEIGE_1};
  }

  html[data-mui-color-scheme="dark"] ::-webkit-scrollbar {
    background-color: ${RETRO_GREY};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${RETRO_GREY};
  }

  html[data-mui-color-scheme="dark"] ::-webkit-scrollbar-thumb {
    background-color: ${RETRO_BEIGE_2};
  }
`;

export const themeOptions: CssVarsThemeOptions = {
  colorSchemes: {
    dark: {
      palette: {
        TableCell: {
          border: alpha(RETRO_BEIGE_2, 0.33),
        },
        background: {
          default: RETRO_GREY,
          glass: alpha(RETRO_GREY, 0.5),
        },
        mode: "dark",
        primary: {
          main: RETRO_BEIGE_2,
        },
        secondary: {
          main: "#008080",
        },
        text: {
          primary: RETRO_BEIGE_2,
          secondary: RETRO_GREY,
        },
      },
    },
    light: {
      palette: {
        TableCell: {
          border: alpha(RETRO_GREY, 0.33),
        },
        background: {
          default: RETRO_BEIGE_1,
          glass: alpha(RETRO_BEIGE_1, 0.5),
        },
        divider: alpha(RETRO_GREY, 0.12),
        primary: {
          main: RETRO_GREY,
        },
        secondary: {
          main: RETRO_PURPLE,
        },
        text: {
          primary: RETRO_GREY,
          secondary: RETRO_BEIGE_1,
        },
      },
    },
  },
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          "&.blurred": {
            "@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))":
              {
                backdropFilter: "blur(8px)",
              },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // TODO: this is elegant, but broken
          // "&.active": {
          //   background: (
          //     theme.palette[ownerState.color as keyof Palette] as PaletteColor
          //   ).main,
          //   color: theme.palette.getContrastText(
          //     (theme.palette[ownerState.color as keyof Palette] as PaletteColor)
          //       .main
          //   ),
          // },
          "&.active": {
            background: "var(--mui-palette-primary-main)",
            color: "var(--mui-palette-text-secondary)",
          },
          borderColor: "var(--mui-palette-primary-main)",
          borderRadius: 0,
          textTransform: "none",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "var(--mui-palette-background-default)",
          marginTop: 4,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // TODO get actual breakpoint
          // "@media (min-width: 1240px)": {
          //   boxShadow: "5px 5px 0px 0px var(--mui-palette-primary-main)",
          // },

          // "@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))":
          //   {
          //     backdropFilter: "blur(100px)",
          //   },
          background: "transparent",
          // backgroundColor: "var(--mui-palette-background-glass)",
          border: "1px solid",
          borderColor: "var(--mui-palette-primary-main)",
          borderRadius: 0,
        },
      },
    },
  },
  typography: {
    fontFamily: RobotoFlexFF,
  },
  zIndex: {
    menu: 1600,
    menuButton: 1601,
    title: 1350,
  },
};
