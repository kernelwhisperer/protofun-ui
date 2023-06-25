import { alpha } from "@mui/material";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

import { RobotoFlexFF } from "./fonts";

declare module "@mui/material/styles" {
  interface TypeBackground {
    glass: string;
  }
  // interface SimplePaletteColorOptions {
  //   raw?: string;
  // }
}

// https://colorhunt.co/palette/ff6d60f7d060f3e99f98d8aa
const RETRO_GREY = "rgb(31, 34, 42)";
const RETRO_GREY_AF = "rgb(48, 51, 59)";
// const RETRO_GREY = "rgb(57, 65, 73)";

const RETRO_BEIGE_1 = "rgb(200, 187, 155)";
const RETRO_BEIGE_1_AF = "rgb(209, 200, 178)";
// const RETRO_YELLOW = "rgb(238, 187, 95)";

const RETRO_BEIGE_2 = "rgb(236, 225, 211)";
const RETRO_PURPLE = "rgb(184, 119, 182)";

export const globalStyles = `
  html {
    overflow-y: scroll;
  }

  body::before {
    filter: url(#noiseFilter);
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
    background-color: ${RETRO_BEIGE_1_AF};
  }

  html[data-mui-color-scheme="dark"] ::-webkit-scrollbar {
    background-color: ${RETRO_GREY_AF};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${RETRO_GREY};
  }

  html[data-mui-color-scheme="dark"] ::-webkit-scrollbar-thumb {
    background-color: ${RETRO_BEIGE_1};
  }
`;

export const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        TableCell: {
          border: alpha(RETRO_BEIGE_2, 0.33),
        },
        background: {
          default: RETRO_GREY,
          glass: alpha(RETRO_GREY_AF, 0.5),
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
          glass: alpha(RETRO_BEIGE_1_AF, 0.5),
        },
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
    MuiPaper: {
      styleOverrides: {
        root: {
          // TODO get actual breakpoint
          "@media (min-width: 600px)": {
            boxShadow: "12px 12px 0px 0px var(--mui-palette-primary-main)",
          },

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
});
