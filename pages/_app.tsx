import type { AppProps } from "next/app";
import Navbar from "../components/Navbar/Navbar";
import "../styles/index.scss";
import { SessionProvider } from "next-auth/react";
import { ContextProvider } from "../context/AppContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ContextProvider>
        <SessionProvider session={pageProps.session}>
          <Navbar />
          <Component {...pageProps} />
        </SessionProvider>
      </ContextProvider>
    </>
  );
}
