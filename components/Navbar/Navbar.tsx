import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Navbar = () => {
  const { status, data } = useSession();
  const router = useRouter();
  const username = data?.user?.email?.split("@")[0];
  const currentPath = router.pathname;
  console.log(currentPath);

  return (
    <nav>
      <Link className="logo" href={"/"}>
        BakingLovers{" "}
      </Link>
      <ul>
        <Link className={currentPath === "/" ? "active" : ""} href={"/"}>
          Home
        </Link>
        <Link
          className={currentPath === "/dolci" ? "active" : ""}
          href={"/dolci"}
        >
          Dolci
        </Link>
        {false && <Link href={"/"}>Contenuti</Link>}
        {status === "unauthenticated" && (
          <Link
            className={currentPath === "/login" ? "active" : ""}
            href={"/login"}
          >
            Login
          </Link>
        )}
        {status === "authenticated" && (
          <Link
            className={currentPath === "/admin" ? "active" : ""}
            href={"/admin"}
          >
            Contenuti
          </Link>
        )}
        {status === "authenticated" && (
          <p className="username">Ciao {username}!</p>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
