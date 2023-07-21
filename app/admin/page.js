"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";
import adminStyles from "../styles/Admin.module.css"

export default function admin(){
    const {user} = UserAuth();
    const [isAdmin, setIsAdmin] = useState();
    const [courtRequests, setCourtRequests] = useState();
    const [selectedRequest, setSelectedRequest] = useState({id: 0, status: ""});
    const [matches, setMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(0);
    const [teams, setTeams] = useState();
    const [selectedTeam, setSelectedTeam] = useState(0);

    useEffect(() => {
        const fetchMatches = async () => {
            const res = await fetch(`http://localhost:3000/api/matches`);
            const data = await res.json();

            const filteredData = [];
            for(let i = 0; i < data.length; i++){
                const match = data[i];
                if(match.winning_team == null){
                    filteredData.push(match);
                }
            }

            setMatches(filteredData);
        }

        fetchMatches();
    },[])

    useEffect(() => {
        const fetchTeams = async () => {
            const res = await fetch(`http://localhost:3000/api/participatingTeams?matchId=${selectedMatch}`);
            const data = await res.json();

            setTeams(data);
        }

        if(selectedMatch != 0){
            fetchTeams();
        }
    },[selectedMatch])

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

    useEffect(() => {
        const fetchRequests = async () => {
            const res = await fetch(`http://localhost:3000/api/courtRegisterRequests`);
            const data = await res.json();

            setCourtRequests(data);
        }

        if(isAdmin != undefined && isAdmin == 1){
            fetchRequests();
        }
    }, [isAdmin]);

    function getStatusColor(status){
        if(status === "Not Verified"){
            return "red";
        }

        return "green";
    }

    function handleRequestClick(id, status){
        if(selectedRequest.id == id){
            setSelectedRequest({id: 0, status: ""});
        }else{
            setSelectedRequest({
                id: id,
                status: status
            });
        }
    }

    function handleMatchClick(id){
        if(selectedMatch == id){
            setSelectedMatch(0);
        }else{
            setSelectedMatch(id);
        }
    }
 
    async function handleVerification(){
        let status;
        if(selectedRequest.status === "Not Verified"){
            status = "Verified";
        }else{
            status = "Not Verified";
        }

        const values = [
            status,
            selectedRequest.id
        ];

       await fetch("http://localhost:3000/api/courtRegisterRequests", {
            method: "PUT",
            body: JSON.stringify({
              values: values,
            }),
            headers: {
              "Content-Type": "application/json",
            },
        });

        window.location.reload();
    }

    async function setWinner(){
        await fetch(`http://localhost:3000/api/matches/${selectedMatch}`, {
            method: "PUT",
            body: JSON.stringify({
              team: selectedTeam,
            }),
            headers: {
              "Content-Type": "application/json",
            },
        });

        //이긴팀 승수를 + 1하고, 전체 게임 +1 승률 다시 계산해서 update
        let winningTeam;
        let losingTeam;

        for(let i = 0; i < teams.length; i++){
            const team = teams[i];
            if(team.id == selectedTeam){
                winningTeam = team;
            }else{
                losingTeam = team;
            }
        }

        const winningTeamTotalMatch = winningTeam.total_match_count + 1;
        const winningTeamWonMatch = winningTeam.won_match_count + 1;
        const winningTeamWinningPercentage = winningTeamWonMatch / winningTeamTotalMatch * 100;

        const winningTeamValues = [
            winningTeamTotalMatch,
            winningTeamWonMatch,
            winningTeamWinningPercentage
        ];

        await fetch(`http://localhost:3000/api/teams/${winningTeam.id}`, {
            method: "PUT",
            body: JSON.stringify({
              values: winningTeamValues,
            }),
            headers: {
              "Content-Type": "application/json",
            },
        });

        const losingTeamTotalMatch = losingTeam.total_match_count + 1;
        const losingTeamWonMatch = losingTeam.won_match_count;
        const losingTeamWinningPercentage = losingTeamWonMatch / losingTeamTotalMatch * 100;

        const losingTeamValues = [
            losingTeamTotalMatch,
            losingTeamWonMatch,
            losingTeamWinningPercentage
        ];

        await fetch(`http://localhost:3000/api/teams/${losingTeam.id}`, {
            method: "PUT",
            body: JSON.stringify({
              values: losingTeamValues,
            }),
            headers: {
              "Content-Type": "application/json",
            },
        });

        window.location.reload();
    }

    if(isAdmin != undefined){
        if(isAdmin == 0){
            return <h1>You need to admin in order to access!</h1>;
        }

        return (
            <div className={adminStyles.container}>
                <h1>Admin</h1>
                {courtRequests ? <div className={adminStyles.card}>
                    <h2>Court Register Requests</h2>
                    <div className={adminStyles.headers}>
                        <p>Location</p>
                        <p>Contact Number</p>
                        <p>Status</p>
                    </div>
                    {courtRequests.map((request, i) => (
                        <div 
                            onClick={() => handleRequestClick(request.id, request.status)}
                            style={request.id == selectedRequest.id ? {
                                borderStyle: "solid",
                                borderWidth: "1px",
                                borderRadius: "10px"
                            } : null}
                        >
                            <p>{request.location}</p>
                            <p>{request.contact_no}</p>
                            <p style={{color: getStatusColor(request.status)}}>
                                {request.status}
                            </p>
                        </div>
                    ))}
                    {selectedRequest.id != 0 ? <button onClick={handleVerification}>
                        {selectedRequest.status === "Verified" ? "Unverify" : "Verify"}
                    </button> : null}
                </div> : null}

                <div className={adminStyles.card}>
                    <h2>Set Match Result</h2>
                    <div className={adminStyles.headers}>
                        <p>Match ID</p>
                        <p>Date</p>
                        <p>Time</p>
                        <p>Location</p>
                    </div>

                    {matches.map((match, i) => (
                        <div onClick={() => handleMatchClick(match.id)} style={match.id == selectedMatch ? {
                            borderStyle: "solid",
                            borderRadius: "10px",
                            borderWidth: "1px"
                        } : null}>
                            <p>{match.id}</p>
                            <p>{match.date}</p>
                            <p>{match.time}</p>
                            <p>{match.location}</p>
                        </div>
                    ))}

                    {selectedMatch != 0 && teams ? <div className={adminStyles.selectTeam}>
                        {teams.length >= 2 ? <>
                            <h3>Select Winning Team</h3>
                            <select onChange={(e) => setSelectedTeam(e.target.value)}>
                                <option value={0}>Select Team</option>
                                {teams.map((team, i) => (
                                    <option value={team.id}>{team.name}</option>
                                ))}
                            </select> 
                            <button onClick={setWinner} disabled={selectedTeam==0}>Set Winner</button>
                        </> :
                        <p style={{color: "red"}}>Match is not full yet!</p>}
                    </div> : null}
                </div>


                <div className={adminStyles.buttons}>
                    <Link href="admin/registerCourt">Register Court</Link>
                    <Link href="admin/registerMatch">Register Match</Link>
                </div>
            </div>
        );
    }
}