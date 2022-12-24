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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-C6PWCWMMSP"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());

          gtag('config', 'G-C6PWCWMMSP');
        </script>

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html >
  )
}
