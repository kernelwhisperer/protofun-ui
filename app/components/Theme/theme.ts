import { alpha, CssVarsThemeOptions } from "@mui/material";

import { RobotoFlexFF } from "./fonts";

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    accent: true;
  }
}

declare module "@mui/material" {
  interface TypeBackground {
    glass: string;
  }
  interface ZIndex {
    menu: number;
    menuButton: number;
    title: number;
  }
  interface Palette {
    accent: Palette["primary"];
  }

  interface PaletteOptions {
    accent?: PaletteOptions["primary"];
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
  // html {
  //   overflow-y: scroll; TODO
  // }

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
    background: var(--mui-palette-accent-main);
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

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      /* display: none; <- Crashes Chrome on hover */
      -webkit-appearance: none;
      margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type=number] {
      -moz-appearance:textfield; /* Firefox */
  }
`;

export const themeOptions: CssVarsThemeOptions = {
  colorSchemes: {
    dark: {
      palette: {
        TableCell: {
          border: alpha(RETRO_BEIGE_2, 0.33),
        },
        accent: {
          main: "#008080",
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
          main: RETRO_GREY,
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
        accent: {
          main: RETRO_PURPLE,
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
          main: RETRO_BEIGE_1,
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
        // root: ({ ownerState, theme }) => { } TODO this is broken because of SSR
        root: {
          "&.MuiButton-outlinedAccent": {
            borderColor: "var(--mui-palette-accent-main)",
          },
          "&.MuiButton-outlinedSecondary": {
            borderColor: "var(--mui-palette-secondary-main)",
          },
          "&.active": {
            background: "var(--mui-palette-primary-main)",
            color: "var(--mui-palette-text-secondary)",
          },
          "&:active": {
            // transform: "translateY(0px)",
            // transform: "scale(.95)",
          },
          "&:hover:not(:active)": {
            transform: "translateY(-1px)",
            // transform: "scale(1.05)",
          },
          borderColor: "var(--mui-palette-primary-main)",
          borderRadius: 0,
          boxShadow: "none !important",
          textTransform: "none",
          transition: "0.1s",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          boxShadow: "unset",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          justifyContent: "flex-start",
          paddingBottom: 8,
          paddingLeft: 12,
          paddingRight: 12,
          // paddingTop: 8,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          paddingBottom: 24,
          paddingLeft: 12,
          paddingRight: 12,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: 8,
          paddingLeft: 12,
          paddingRight: 12,
          paddingTop: 4,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover:not(:active)": {
            transform: "translateY(-1px)",
          },
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
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "var(--mui-palette-background-default) !important",
          borderRadius: 0,
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
  shape: {
    borderRadius: 4,
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
