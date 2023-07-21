"use client"

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import detailStyles from "../../styles/Details.module.css"
import { UserAuth } from "@/app/context/AuthContext";

export default function team(){
    const[team, setTeam] = useState()
    const params = useParams();
    const id = params.id;

    const {user} = UserAuth();

    useEffect(() => {
        const fetchTeam = async () => {
            const res = await fetch(`http://localhost:3000/api/teams/${id}`);
            const data = await res.json();
      
            setTeam(data);
        };

        if(id){
            fetchTeam();
        }
    }, [id])

    async function apply(){
        const teamUser = [
            id,
            user.uid,
            "Waiting"
        ]

        await fetch("http://localhost:3000/api/teamUsers", {
            method: "POST",
            body: JSON.stringify({
                teamUser: teamUser,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    return(
        <div className={detailStyles.container}>
            {team ? <>
                <h1>{team.name}</h1>
                <h2>{team.description}</h2>
                <div>
                    <p>{team.sex} team</p>
                    <p>Level: {team.level}</p>
                </div>

                <button onClick={apply}>Apply For Team</button>
            </> : null}
        </div>
    );
}