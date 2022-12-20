import { createTheme } from "@mui/material";
import { purple, orange, pink, grey} from '@mui/material/colors';



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
      main: purple[400],
    },
    text: {
      primary: '#fff',
      secondary: purple[200],
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
          backgroundColor: purple[200],
          margin: "1rem"
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
            boxShadow: '0 0 0 100px #444 inset'
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
          color: purple[200],
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