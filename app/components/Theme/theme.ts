import { alpha, CssVarsThemeOptions, darken, Fade, lighten } from "@mui/material"

import { RobotoFlexFF } from "./fonts"

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    accent: true
  }
}

declare module "@mui/material/Badge" {
  interface BadgePropsColorOverrides {
    accent: true
  }
}

declare module "@mui/material" {
  interface TypeBackground {
    backdrop: string
    disabled: string
    glass: string
  }
  interface ZIndex {
    menu: number
    menuButton: number
    popover: number
    title: number
  }
  interface Palette {
    accent: Palette["primary"]
  }

  interface PaletteOptions {
    accent?: PaletteOptions["primary"]
  }
  // interface SimplePaletteColorOptions {
  //   raw?: string;
  // }
}

// https://colorhunt.co/palette/ff6d60f7d060f3e99f98d8aa
const RETRO_GREY = "rgb(41, 44, 52)"
// const RETRO_GREY_AF = "rgb(48, 51, 59)";
// const RETRO_GREY = "rgb(57, 65, 73)";

export const RETRO_BEIGE_1 = "rgb(205, 192, 160)"
// export const RETRO_BEIGE_1 = "rgb(200, 187, 155)"
// const RETRO_BEIGE_1_AF = "rgb(209, 200, 178)";
// const RETRO_YELLOW = "rgb(238, 187, 95)";

const RETRO_BEIGE_2 = "rgb(236, 225, 211)"
const RETRO_PURPLE = "rgb(184, 119, 182)"

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
    // border-radius: 8px;
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar {
    background-color: ${RETRO_BEIGE_1};
  }

  html[data-mui-color-scheme="dark"] ::-webkit-scrollbar {
    background-color: ${RETRO_GREY};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${alpha(RETRO_GREY, 0.66)};
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: ${alpha(RETRO_GREY, 1)};
  }

  html[data-mui-color-scheme="dark"] ::-webkit-scrollbar-thumb {
    background-color: ${alpha(RETRO_BEIGE_2, 0.66)};
  }

  html[data-mui-color-scheme="dark"] ::-webkit-scrollbar-thumb:hover {
    background-color: ${alpha(RETRO_BEIGE_2, 1)};
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

  .notistack-SnackbarContainer {
    z-index: 1999;
  }

  .notistack-MuiContent {
    border-radius: 0;
    box-shadow: 3px 3px 0px 0px ${alpha(RETRO_GREY, 0.33)};
    background-color: ${alpha(RETRO_GREY, 0.9)};
    color: ${RETRO_BEIGE_2};
  }

  .notistack-CollapseWrapper {
    padding: 4px 0px !important;
  }

  html[data-mui-color-scheme="dark"] .notistack-MuiContent {
    box-shadow: 3px 3px 0px 0px ${alpha(RETRO_BEIGE_2, 0.33)};
    background-color: ${alpha(RETRO_BEIGE_2, 0.9)};
    color: ${RETRO_GREY};
  }

  .notistack-MuiContent-info svg {
    color: #2196f3;
    // color: #2ca1ff;
  }
  .notistack-MuiContent-success svg {
    color: #43a047;
    // color: #38936f;
  }
  .notistack-MuiContent-error svg {
    color: #d32f2f;
    // color: #d14b4a;
  }
  .notistack-MuiContent-warning svg {
    color: #ff9800;
  }

  @keyframes svgStrokeAnim {
    0% {
      stroke-dasharray: 230%;
      stroke-dashoffset: 0%; 
    }
    40% {
      fill-opacity: 0; 
    }
    50% {
      stroke-dashoffset: 230%;
      fill-opacity: 0; 
    }
    60% {
      fill-opacity: 0; 
    }
    100% { 
      stroke-dasharray: 230%;
      stroke-dashoffset: 0%; 
    }
  }
`

export const themeOptions: CssVarsThemeOptions = {
  colorSchemes: {
    dark: {
      palette: {
        Avatar: {
          defaultBg: RETRO_BEIGE_2,
        },
        Switch: {
          defaultColor: lighten(RETRO_GREY, 0.5),
        },
        TableCell: {
          border: alpha(RETRO_BEIGE_2, 0.33),
        },
        Tooltip: {
          bg: RETRO_BEIGE_2,
        },
        accent: {
          main: "#008080",
        },
        background: {
          backdrop: "rgba(0,0,0, 0.5)",
          default: RETRO_GREY,
          disabled: alpha(RETRO_GREY, 0.2),
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
        Avatar: {
          defaultBg: RETRO_GREY,
        },
        Switch: {
          defaultColor: darken(RETRO_BEIGE_1, 0.1),
        },
        TableCell: {
          border: alpha(RETRO_GREY, 0.33),
        },
        Tooltip: {
          bg: RETRO_GREY,
        },
        accent: {
          main: RETRO_PURPLE,
        },
        background: {
          backdrop: alpha(RETRO_GREY, 0.12),
          default: RETRO_BEIGE_1,
          disabled: alpha(RETRO_BEIGE_1, 0.2),
          glass: alpha(RETRO_BEIGE_1, 0.5),
        },
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
            "@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))": {
              backdropFilter: "blur(8px)",
              backgroundColor: "var(--mui-palette-background-backdrop)",
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
          "&:disabled": {
            cursor: "not-allowed",
            pointerEvents: "auto",
          },
          "&:hover:not(:active)": {
            transform: "translateY(-1px)",
            // transform: "scale(1.05)",
          },
          borderColor: "var(--mui-palette-primary-main)",
          borderRadius: 0,
          boxShadow: "none !important",
          textTransform: "none",
          transition: "transform 100ms ease-in-out 0ms",
          willChange: "transform",
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
          paddingBottom: 16,
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
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "var(--mui-palette-primary-main)",
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
      defaultProps: {
        TransitionComponent: Fade,
      },
      styleOverrides: {
        paper: {
          backgroundColor: "var(--mui-palette-background-default)",
          borderColor: "var(--mui-palette-TableCell-border)",
          boxShadow: "none",
          marginTop: 4,
        },
        root: {
          zIndex: "var(--mui-zIndex-popover)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "var(--mui-palette-primary-main)",
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
    menu: 2000,
    menuButton: 2001,
    popover: 2002,
    title: 1350,
  },
}
