import type { AppProps } from "next/app";
import Navbar from "../components/Navbar/Navbar";
import "../styles/index.scss";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Navbar />
        <NextNProgress color="#ca5369" height={5} />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
