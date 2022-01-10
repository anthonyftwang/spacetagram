import { createTheme } from '@mui/material/styles';

const colors = {
  palette: {
    primary: {
      main: '#008060',
    },
    secondary: {
      main: '#d82c0d',
    },
    error: {
      main: '#b98900',
    },
    success: {
      main: '#00a47c',
    },
  },
};

export const muiLightTheme = createTheme(colors);

export const muiDarkTheme = createTheme({
  ...colors,
  palette: {
    ...colors.palette,
    mode: 'dark',
  },
});
