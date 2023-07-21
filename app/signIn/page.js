"use client"

import Link from "next/link";
import { useState } from "react"
import {GoogleButton} from "react-google-button";
import authStyles from "../styles/Auth.module.css"
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function signIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  const {signIn, googleSignIn} = UserAuth()
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
        await signIn(email, password)
        setError("")
    }catch(error){
        setError(error)
        console.log(error.message)
    }

    router.push("/");
  }

  const signInWithGoogle = async () => {
      try{
          await googleSignIn(email, password)
          setError("")
      }catch(error){
          setError(error)
          console.log(error.message)
      }

      router.push("/");
  }

  return (
    <div className={authStyles.container}>
      <h1>Sign In</h1>
      <p>
        Don't have an account yet? 
        <Link href="/signUp"> Sign up</Link>
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter Email"/>
        </div>

        <div>
          <label>Password: </label>
          <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Enter Password"/>
        </div>

        <button>SIGN IN</button>
      </form>
      <GoogleButton onClick={signInWithGoogle}/>
    </div>
  )
}
