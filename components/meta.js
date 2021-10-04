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
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
      <meta
        name={`${SITE_NAME} | ${name}`}
        content={ content }
      />
      {/* <meta property="og:image" content={"/OGImage/AD-REM_favicon(1500px).png"} /> */}
      {/* <!-- Async script executes immediately and must be after any DOM elements used in callback. --> */}
      <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDHtpls0cGSxvFJrh1ZVR15y6bpVVaSdIk&callback=initMap&v=weekly"
        async
      ></script>      
    </Head>
  );
}


export default meta