"use client"

import Link from "next/link";
import headerStyles from "../styles/Header.module.css";
import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logOut } = UserAuth();


  return (
    <>
      <div className={headerStyles.container}>
      <Link className={headerStyles.logo} href="/">{"BKB🏀"}</Link>
      <nav>
        <Link href="/games">Games</Link>
        <Link href="/courts">Book Court</Link>
        <Link href="/teams">Teams</Link>
        {user === null ? <Link href="/signIn">Sign In</Link> : <p onClick={logOut}>Sign Out</p>}
      </nav>
      </div>
    </>
  );
};

export default Header;
