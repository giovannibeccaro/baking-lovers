import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  useEffect(() => {
    document.body.classList.add("bg");

    return () => {
      document.body.classList.remove("bg");
    };
  }, []);

  return (
    <>
      <Head>
        <title>Home - BakingLovers</title>
        <meta name="description" content="Home page of BakingLovers." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main-home">
        <h1>Deliziati con la nostra pasticceria</h1>
        <Link href="/dolci">
          <button>Vai ai dolci</button>
        </Link>
      </main>
    </>
  );
}
