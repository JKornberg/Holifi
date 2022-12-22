import '../styles/globals.css'
import type { AppProps } from 'next/app'
import app_theme from '../styles/theme'
import { ThemeProvider } from '@mui/material/styles'

import AuthContextProvider from '../contexts/AuthContext'
import { CssBaseline } from '@mui/material'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={app_theme}>
      <CssBaseline />
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </ThemeProvider>
  )
}

export default MyApp
