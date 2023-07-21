"use client";

import { useState } from "react";
import gamesStyles from "../../styles/Games.module.css"
import formStyles from "../../styles/Form.module.css";
import { UserAuth } from "@/app/context/AuthContext";

export default function registerGame() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const [district, setDistrict] = useState("");
    const [location, setLocation] = useState("");
    const [level, setLevel] = useState("");
    const [sex, setSex] = useState("");
    const [maxPlayer, setMaxPlayer] = useState("");

    const {user} = UserAuth();

    const dateOptions = [];
    const dateTime = new Date();
    for(let i = 0; i < 14; i++){
        const newDateTime = new Date(dateTime);
        newDateTime.setDate(newDateTime.getDate() + i);
        const date = newDateTime.toLocaleDateString("en-SG");

        dateOptions.push(date);
    }

    const hourOptions = []
    for(let i = 0; i < 24; i++){
        if(i < 10){
            hourOptions.push(`0${i}`);
        }else{
            hourOptions.push(`${i}`);
        }
    }

    const playerNumbers = [];
    for(let i = 0; i < 50; i++){
        playerNumbers.push(i + 1);
    }

    async function handleSubmit(e){
        e.preventDefault();
        const dateArray = date.split("/");
        const sqlDate =`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
        
        const sqlTime = `${hour}:${minute}:00`

        const game = [
            title,
            description,
            sqlDate,
            sqlTime,
            district,
            location,
            level, 
            sex, 
            maxPlayer
        ]

       const res = await fetch(`http://localhost:3000/api/games`, {
            method: "POST",
            body: JSON.stringify({
              game: game,
            }),
            headers: {
              "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        const gameId = data.insertId;

        const gameUser = [
            gameId,
            user.uid
        ]

        await fetch(`http://localhost:3000/api/gameUsers`, {
            method: "POST",
            body: JSON.stringify({
              gameUser: gameUser,
            }),
            headers: {
              "Content-Type": "application/json",
            },
        });
    }

    return(
        <div className={formStyles.container}>
            <h1>Register Game</h1>

            <form onSubmit={handleSubmit}>
                <div className={formStyles.card}>
                    <div>
                        <label>Title: </label>
                        <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter Title"/>
                    </div>

                    <div>
                        <label>Description: </label>
                        <input onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Enter Description"/>
                    </div>

                    <div>
                         <label>Date: </label>
                         <select onChange={(e) => setDate(e.target.value)}>
                            {dateOptions.map((date, i) => (
                                <option value={date}>{date}</option>
                            ))}
                         </select>
                    </div>

                    <div>
                        <label>Hour: </label>
                        <select onChange={(e) => setHour(e.target.value)}>
                            {hourOptions.map((hour, i) => (
                                <option value={hour}>{hour}</option>
                            ))}
                        </select>

                        <label>Minute: </label>
                        <select onChange={(e) => setMinute(e.target.value)}>
                            <option value="00">00</option>
                            <option value="30">30</option>
                        </select>
                    </div>

                    <div>
                        <label>District: </label>
                        <select onChange={(e) => setDistrict(e.target.value)}>
                            <option value="South West">South West</option>
                            <option value="North West">North West</option>
                            <option value="Central Singapore">Central Singapore</option>
                            <option value="North East">North East</option>
                            <option value="South East">South East</option>
                        </select>
                    </div>

                    <div>
                        <label>Location: </label>
                        <input onChange={(e) => setLocation(e.target.value)} type="text" placeholder="Enter District"/>
                    </div>

                    <div>
                        <label>Level: </label>
                        <select onChange={(e) => setLevel(e.target.value)}>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>

                    <div>
                        <label>Sex: </label>
                        <select onChange={(e) => setSex(e.target.value)}>
                            <option value="All">All</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label>Maximum Player: </label>
                        <select onChange={(e) => setMaxPlayer(e.target.value)}>
                            {playerNumbers.map((number, i) => (
                                <option value={number}>{number}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button>REGISTER GAME</button>
            </form>
        </div>
    );
}
