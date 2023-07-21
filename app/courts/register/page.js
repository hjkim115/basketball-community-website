"use client"

import { useState } from "react";
import formStyles from "../../styles/Form.module.css";

export default function registercourt(){
    const [location, setLocation] = useState("");
    const [contactNumber, setContactNumber] = useState("")

    async function handleSubmit(){
        const request = [
            location,
            contactNumber,
            "Not Verified"
        ];

       await fetch(`http://localhost:3000/api/courtRegisterRequests`, {
            method: "POST",
            body: JSON.stringify({
              request: request,
            }),
            headers: {
              "Content-Type": "application/json",
            },
        });
    }

    return (
            <div className={formStyles.container}>
                <h1>Register Court</h1>
                <h2>Based on this form we will visit your court in person to verify</h2>
                <h2> before registering the court to our website.</h2>
                <h2>Thank you!!</h2>
                <form onSubmit={handleSubmit}>
                    <div className={formStyles.card}>
                        <div>
                            <label>Location: </label>
                            <input onChange={(e) => setLocation(e.target.value)} type="text" placeholder="Enter Location"/>
                        </div>
                        <div>
                            <label>Contact Number: </label>
                            <input onChange={(e) => setContactNumber(e.target.value)} type="text" placeholder="Enter Contact Number"/>
                        </div>
                    </div>
                    <button>Send Request</button>
                </form>
            </div>
    );
}