"use client"

import { useState } from "react"
import {GoogleButton} from "react-google-button";
import authStyles from "../styles/Auth.module.css"
import { UserAuth } from "../context/AuthContext";

export default function signUp() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")

    const {createUser, googleSignIn} = UserAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
          await createUser(email, password, userName);
          setError("");
        }catch(error){
          setError(error)
        }

        window.location.href = "http://localhost:3000";
    }

    const signInWithGoogle = async () => {
        try{
            await googleSignIn(email, password)
            setError("")
        }catch(error){
            setError(error)
            console.log(error.message)
        }
    }

    return (
        <div className={authStyles.container}>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
            <div>
                <label>User Name: </label>
                <input onChange={(e) => setUserName(e.target.value)} type="text" placeholder="Enter User Name"/>
            </div>

            <div>
                <label>Email: </label>
                <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter Email"/>
            </div>

            <div>
                <label>Password: </label>
                <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Enter Password"/>
            </div>

            <button>SIGN UP</button>
            </form>
            <GoogleButton onClick={signInWithGoogle} label="Continue with Google"/>
        </div>
  )
}
