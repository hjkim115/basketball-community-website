"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import detailStyles from "../../styles/Details.module.css"
import { UserAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function match(){
    const [match, setMatch] = useState([]);
    const [manageableTeams, setManageableTeams] = useState();
    const [selectedTeam, setSelectedTeam] = useState(0);
    const [matchTeams, setMatchTeams] = useState([]);

    const {user} = UserAuth();
    const router = useRouter();

    const searchParams = useSearchParams();
    const matchId = searchParams.get("matchId");

    useEffect(() => {
        const fetchMatch = async () => {
            const res = await fetch(`http://localhost:3000/api/matches/${matchId}`);
            const data = await res.json();
      
            setMatch(data);
        }; 

        const fetchMatchTeams = async () => {
            const res = await fetch(`http://localhost:3000/api/matchTeams?matchId=${matchId}`);
            const data = await res.json();

            setMatchTeams(data)
        }

        fetchMatch();
        fetchMatchTeams();
    }, [])

    useEffect(() => {
        const fetchUserTeams = async () => {
            const res = await fetch(`http://localhost:3000/api/teamUsers?userId=${user.uid}`);
            const data = await res.json();

            const filteredData = []
            for(let i = 0; i < data.length; i++){
                const team = data[i];

                if(team.manager === user.uid){
                    filteredData.push(team);
                }
            }
      
            setManageableTeams(filteredData);
        }; 

        if(user){
            fetchUserTeams();
        }
    }, [user])

    async function participate(){
        const matchTeam = [
            matchId,
            selectedTeam
        ];

        await fetch("http://localhost:3000/api/matchTeams", {
            method: "POST",
            body: JSON.stringify({
            matchTeam: matchTeam,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        router.push("/teams");
    }

    function isValid(){
        if(matchTeams.length >= 2){
            return false;
        }

        for(let i = 0; i < matchTeams.length; i++){
            const matchTeam = matchTeams[i];

            if(selectedTeam == matchTeam.team_id){
                return false;
            }
        }

        if(selectedTeam == 0){
            return false;
        }
        
        return true;
    }

    return (
        <div className={detailStyles.container}>
            {match ? <>
                <h1>{match.sex} Match</h1>
                <div>
                    <p>Date: {match.date}</p>
                    <p>Time: {match.time}</p>
                    <p>District: {match.district}</p>
                    <p>Location: {match.location}</p>
                    <p>Team Count: {matchTeams.length} / 2</p>
                </div>

                {manageableTeams ? (manageableTeams.length == 0 ? 
                    <div>
                        <p>No teams managable!</p>
                    </div> : 
                    <div>
                        <label>Teams: </label>
                        <select onChange={(e) => setSelectedTeam(e.target.value)}>
                            <option value={0}>Select Team</option>
                            {manageableTeams.map(((team, i) => (
                                <option value={team.id}>{team.name}</option>
                            )))}
                        </select>
                        {!isValid() ? <p style={{color: "red"}}>Not Valid</p> : <p style={{color: "green"}}>Valid</p>}
                    </div>) : null}

                <button disabled={!isValid()} onClick={participate}>participate</button>
            </> : null}
        </div>
    );
}