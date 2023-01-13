import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      <Link className="logo" href={"/"}>
        BakingLovers{" "}
      </Link>
      <ul>
        <Link href={"/"}>Home</Link>
        <Link href={"/dolci"}>Dolci</Link>
        {false && <Link href={"/"}>Contenuti</Link>}
        <Link href={"/"}>Login</Link>
      </ul>
    </nav>
  );
};

export default Navbar;
