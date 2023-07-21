"use client"

import { useState } from "react";
import { UserAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import formStyles from "../../styles/Form.module.css"

export default function createTeam(){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [sex, setSex] = useState("");
    const [level, setLevel] = useState("");
    
    const router = useRouter();
    const {user} = UserAuth();

    async function handleSubmit(e){
        e.preventDefault();

        if(user === null){
            router.push("/signIn")
            return;
        }

        const team = [
            name,
            description,
            sex,
            level,
            user.uid,
            0,
            0,
            0
        ]

       const res = await fetch(`http://localhost:3000/api/teams`, {
            method: "POST",
            body: JSON.stringify({
              team: team,
            }),
            headers: {
              "Content-Type": "application/json",
            },
        });

        const data = await res.json()
        console.log(data)

        const teamId = data.insertId;

        const teamUser = [
            teamId,
            user.uid,
            "Accepted"
        ]

        await fetch(`http://localhost:3000/api/teamUsers`, {
            method: "POST",
            body: JSON.stringify({
              teamUser: teamUser,
            }),
            headers: {
              "Content-Type": "application/json",
            },
        });

        router.push("/teams")
    }

    function isValid(){
        if(name === ""){
            return false;
        }

        if(description === ""){
            return false;
        }

        if(sex === ""){
            return false;
        }

        if(level === ""){
            return false
        }

        return true;
    }

    return(
        <div className={formStyles.container}>
            <h1>Create Team</h1>
            <form onSubmit={handleSubmit}>
                <div className={formStyles.card}>
                    <div>
                        <label>Name: </label>
                        <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Name"/>
                    </div>

                    <div>
                        <label>Description: </label>
                        <input onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Enter Description"/>
                    </div>

                    <div>
                        <label>Sex: </label>
                        <select onChange={(e) => setSex(e.target.value)}>
                            <option value="">Select Sex</option>
                            <option value="All">All</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div>
                        <label>Level: </label>
                        <select onChange={(e) => setLevel(e.target.value)}>
                            <option value="">Select Level</option>
                            <option value="All">All</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                    {isValid() ? <p style={{color: "green"}}>Valid</p> : <p style={{color: "red"}}>Not Valid</p>}
                </div>
                <button disabled={!isValid()}>Create Game</button>
            </form>
        </div>
    );
}