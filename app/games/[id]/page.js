"use client"

import detailStyles from "../../styles/Details.module.css"
import {useParams} from "next/navigation";
import { useEffect, useState } from "react";
import { UserAuth } from "@/app/context/AuthContext";

export default function game(){
    const [game, setGame] = useState();
    const [gameUsers, setGameUsers] = useState();
    const params = useParams();
    const id = params.id;

    const {user} = UserAuth();

    useEffect(() => {
        const fetchGame = async () => {
            const res = await fetch(`http://localhost:3000/api/games/${id}`);
            const data = await res.json();
      
            setGame(data);
        };

        const fetchGameUsers = async () => {
            const res = await fetch(`http://localhost:3000/api/gameUsers?gameId=${id}`);
            const data = await res.json();

            setGameUsers(data);
        }
    
        if(id){
            fetchGame();
            fetchGameUsers();
        }
    }, [id])

    async function participate(){
        if(game.max_player <= gameUsers.length){
            return;
        }

        for(let i = 0; i < gameUsers.length; i++){
            const userId = gameUsers[i].user_id;

            if(userId === user.uid){
                return;
            }
        }

        const gameUser = [
            id,
            user.uid
        ]

       const res = await fetch(`http://localhost:3000/api/gameUsers`, {
            method: "POST",
            body: JSON.stringify({
              gameUser: gameUser,
            }),
            headers: {
              "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        console.log(data);
    }


    return(
        <div className={detailStyles.container}>
            {game && gameUsers ? <>
                <h1>{game.title}</h1>
                <div>
                    <p>Description: {game.description}</p>
                    <p>Date: {game.date}</p>
                    <p>Time: {game.time}</p>
                    <p>District: {game.district}</p>
                    <p>Location: {game.location}</p>
                    <p>Level: {game.level}</p>
                    <p>Sex: {game.sex}</p>
                    <p>Player Count: {gameUsers.length} / {game.max_player}</p>
                </div>
            </> : null}

            <button onClick={participate}>Participate</button>
        </div>
    );
}