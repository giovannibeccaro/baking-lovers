import type { AppProps } from "next/app";
import Navbar from "../components/Navbar/Navbar";
import "../styles/index.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
