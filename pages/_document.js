import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        {/* <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin /> */}
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Bad+Script&family=Montserrat&family=Comfortaa&family=Open+Sans:wght@500;700;800&display=swap'
          rel='stylesheet'
          crossOrigin='anonymous'
        />
        <meta property='og:title' content='Holifi' />
        <meta
          property='og:description'
          content='AI generated holiday themed music!'
        />
        <meta property='og:image' content='/snow_cabin.jpg' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
