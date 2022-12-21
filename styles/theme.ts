import { createTheme } from "@mui/material";
import { purple, orange, pink, grey, green, red, blue} from '@mui/material/colors';



const app_theme = createTheme({
  status: {
    danger: orange[500],
  },

  palette: {
    mode: 'dark',
    primary: {
      main: '#999999',
      contrastText: '#fff',
    },
    secondary: {
      main: green[400],
    },
    text: {
      primary: '#fff',
      secondary: red[400],
    },
    background: {
      default: '#1f1f1f',
    },
    info: {
      main : orange[500]
    },
    success: {
      main: pink[500]
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1.2rem',
          fontWeight: 700,
          color: '#000',
          backgroundColor: red['400'],
          margin: "1rem"
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#fff",
          '&.Mui-focused': {
            color: "red['400']",
          },
        },
      },
    },
          

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiFilledInput-input': {
            boxShadow: '0 0 0 100px #333 inset'

          },
          '& .MuiOutlinedInput-input': {
            boxShadow: '0 0 0 100px #222 inset'
          },
          '& .MuiOutlinedInput-input:invalid': {
            boxShadow: '0 0 0 100px #222 inset'
          },
          '&.Mui-focused fieldset': {
            border: '1px solid red'
          },
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: green[200],
        },
        checked: {},

      },
    },
  },
  typography: {
    fontFamily: [
      'Open Sans',
    ].join(','),
    body1 : {
      fontSize: '1.1rem',
      fontWeight: 500,
    },
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
  },
});

export default app_theme;