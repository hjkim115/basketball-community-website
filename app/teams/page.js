"use client";

import { TemplateContext } from "next/dist/shared/lib/app-router-context";
import listStyles from "../styles/List.module.css"
import teamsStyles from "../styles/Teams.module.css"
import Link from "next/link";
import { useEffect, useState } from "react";
import team from "./[id]/page";

export default function teams() {
    const [currentMenu, setCurrentMenu] = useState("Teams")
    const [teams, setTeams] = useState([])
    const [matches, setMatches] = useState([])
    const [rankings, setRankings] = useState([])

    useEffect(() => {
        const fetchTeams = async () => {
            const res = await fetch(`http://localhost:3000/api/teams`);
            const data = await res.json();
      
            setTeams(data);
        };

        const fetchMatches = async () => {
            const res = await fetch(`http://localhost:3000/api/matches`)
            const data = await res.json();

            setMatches(data);
        }

        const fetchRankings = async () => {
            const res = await fetch(`http://localhost:3000/api/rankings`)
            const data = await res.json();

            setRankings(data);
        }

        fetchTeams();
        fetchMatches();
        fetchRankings();
    }, [])
    
    function getMenuStyle(menu){
        if(menu === currentMenu){
            return {
                textDecoration: "underline",
                textDecorationColor: "blue",
                textDecorationThickness: "2px"
            };
        }

        return null;
    }

    return(
        <div className={listStyles.container}>
            <div className={teamsStyles.menus}>
                <p style={getMenuStyle("Teams")} onClick={() => setCurrentMenu("Teams")}>Teams</p>
                <p style={getMenuStyle("Matches")} onClick={() => setCurrentMenu("Matches")}>Matches</p>
                <p style={getMenuStyle("Rankings")} onClick={() => setCurrentMenu("Rankings")}>Rankings</p>
            </div>
            <h1>{currentMenu}</h1>

            {currentMenu === "Teams" ? <>
                {teams.map((team, i) => (
                    <div className={listStyles.card}>
                        <div>
                            <h2>{team.name}</h2>
                            <p>{team.description}</p>
                            <p>{team.sex}</p>
                            <p>{team.level}</p>
                        </div>
                        <Link className={listStyles.button} href={`/teams/${team.id}`}>Join</Link>
                    </div>
                ))}
            </> : null}

            {currentMenu === "Matches" ? <>
                {matches.map((match, i) => (
                    <div className={listStyles.card}>
                        <div>
                            <h2>{match.sex} Match</h2>
                            <p>{match.date}</p>
                            <p>{match.time}</p>
                            <p>{match.location}</p>
                        </div>
                        <Link className={listStyles.button} href={`/teams/match?matchId=${match.id}`}>Participate</Link>
                    </div>
                ))}
            </> : null}

            {currentMenu === "Rankings" ? <div className={teamsStyles.rankings}>
                    <div className={teamsStyles.headers}>
                        <p>Ranking</p>
                        <p>Name</p>
                        <p>Winning Percentage</p>
                        <p>Won Match Count</p>
                        <p>Total Match Count</p>
                    </div>
                    {rankings.map((ranking, i) => (
                        <div>
                            <p>{i + 1}</p>
                            <p>{ranking.name}</p>
                            <p>{ranking.winning_percentage}%</p>
                            <p>{ranking.won_match_count}</p>
                            <p>{ranking.total_match_count}</p>
                        </div>
                    ))}
            </div> : null}
            
            <Link href="teams/createTeam" className={listStyles.fixedButton}>Create Team</Link>
        </div>
    );
}