import '../styles/globals.css'
import type { AppProps } from 'next/app'
import app_theme from '../styles/theme'
import { ThemeProvider } from '@mui/material/styles'

import AuthContextProvider from '../contexts/AuthContext'
import { CssBaseline } from '@mui/material'
import Script from 'next/script'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={app_theme}>
      <CssBaseline />
      <AuthContextProvider>
        <Head>
          <meta property="og:title" content="Holifi" />
          <meta
            property="og:description"
            content="AI generated holiday themed music!"
          />
          <meta
            property="og:image"
            content="/snow_cabin.jpg"
          />
        </Head>
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-C6PWCWMMSP" />
        <Script id='google-analytics' strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-C6PWCWMMSP', {
            page_path: window.location.pathname,
          });
        `,
        }} />
        <Component {...pageProps} />
      </AuthContextProvider>
    </ThemeProvider>
  )
}

export default MyApp
