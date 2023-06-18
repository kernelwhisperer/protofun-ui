import { alpha, darken } from "@mui/material";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

import { RobotoFlexFF } from "./fonts";

declare module "@mui/material/styles" {
  interface TypeBackground {
    glass: string;
  }
}

const RETRO_GREY = "rgb(31, 34, 42)";
// const RETRO_GREY = "rgb(57, 65, 73)";
const RETRO_BEIGE = "rgb(225, 216, 205)";
// const RETRO_BEIGE = "rgb(200, 187, 155)";

export const globalStyles = `
  html {
    overflow-y: scroll;
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
    // border-radius: 2px;
    width: 10px;
  }

  ::-webkit-scrollbar {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${RETRO_GREY};
  }

  html[data-mui-color-scheme="dark"] ::-webkit-scrollbar-thumb {
    background-color: ${RETRO_BEIGE};
  }
`;

export const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        Avatar: {
          defaultBg: RETRO_BEIGE,
        },
        TableCell: {
          border: alpha(RETRO_BEIGE, 0.33),
        },
        background: {
          default: RETRO_GREY,
          glass: alpha(RETRO_GREY, 0.75),
        },
        mode: "dark",
        primary: {
          main: RETRO_BEIGE,
        },
        secondary: {
          main: alpha(RETRO_BEIGE, 0.2),
        },
        text: {
          primary: RETRO_BEIGE,
          secondary: darken(RETRO_BEIGE, 0.25),
        },
      },
    },
    light: {
      // https://colorhunt.co/palette/ff6d60f7d060f3e99f98d8aa
      palette: {
        Avatar: {
          defaultBg: RETRO_GREY,
        },
        TableCell: {
          border: alpha(RETRO_GREY, 0.33),
        },
        background: {
          default: RETRO_BEIGE,
          glass: alpha(RETRO_BEIGE, 0.75),
        },
        primary: {
          main: RETRO_GREY,
        },
        secondary: {
          main: alpha(RETRO_GREY, 0.2),
        },
        text: {
          primary: RETRO_GREY,
        },
      },
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "transparent",
          border: "1px solid",
          borderColor: "var(--mui-palette-primary-main)",
          borderRadius: 0,
          boxShadow: "12px 12px 0px 0px var(--mui-palette-primary-main)",
        },
      },
    },
  },
  typography: {
    fontFamily: RobotoFlexFF,
  },
});

// components: {
//   MuiButton: {
//     styleOverrides: {
//       root: {
//         background: "rgb(255,255,255, 0.15)",
//         textTransform: "none",
//       },
//     },
//   },
// },
// components: {
//   MuiButton: {
//     styleOverrides: {
//       root: {
//         background: "rgb(0,0,0, 0.05)",
//         textTransform: "none",
//       },
//     },
//   },
// },
