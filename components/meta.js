import Head from "next/head";

import { SITE_NAME } from "../lib/constants"


const meta = ({ name, content }) => {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#BFBFBF"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#BFBFBF" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#BFBFBF" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
      <meta
        // name={`${SITE_NAME} | ${name}`}
        name='description'
        content={ content }
      />

      {/* <meta name="theme-color" content="rgb(255, 148, 67)" /> */}
      {/* <meta property="og:image" content={"/OGImage/AD-REM_favicon(1500px).png"} /> */}
      {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-E2097VL72Q"></script> */}
      {/* <script dangerouslySetInnerHTML={{__html:
      `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'default', {
          'ad_storage': 'denied',
          'analytics_storage': 'denied'
        });
        gtag('js', new Date());
      
        gtag('config', 'G-E2097VL72Q');
      `
      }}/> */}
    </Head>
  );
}


export default meta