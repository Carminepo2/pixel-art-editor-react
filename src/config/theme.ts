import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },

    MuiToggleButton: {
      styleOverrides: {
        root: {
          margin: 0,
          border: 0,
          borderRadius: 0,
          marginBottom: 1,
        },
      },
    },
  },
});

export default theme;
