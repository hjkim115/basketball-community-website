"use client"

import { UserAuth } from "./context/AuthContext";
import { useState, useEffect } from "react";
import homeStyles from "./styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  const {user} =UserAuth();
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    const fetchIsAdmin = async () => {
        const res = await fetch(`http://localhost:3000/api/user?id=${user.uid}`);
        const data = await res.json();

        setIsAdmin(data.is_admin);
    }
    
    if(user){
        fetchIsAdmin();
    }
  }, [user])


  return (
    <div className={homeStyles.container}>
      <h1>Home</h1>
      {user && user !== null ? <h2>Hello {user.displayName}!!!</h2> : null}
      {isAdmin != undefined && isAdmin == 1 ? <Link className={homeStyles.adminButton} href="/admin">Admin</Link> : null}
    </div>
  )
}
