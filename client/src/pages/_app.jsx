import "@/styles/globals.css";
import { StateProvider } from "@/context/StateContext";
import Head from "next/head";
import reducer, { initialState } from "@/context/StateReducers";

export default function App({ Component, pageProps }) {
  return (
      <StateProvider initialState={initialState} reducer={reducer}>
        <Head>
          <title>Whats-not-so-app</title>
          <link rel="shortcut icon" href="/favicon.png" />
        </Head>
        <Component {...pageProps} />
      </StateProvider>
  )
}
