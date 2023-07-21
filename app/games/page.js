"use client";

import gamesStyles from "../styles/Games.module.css";
import listStyles from "../styles/List.module.css"
import Link from "next/link";
import { useEffect, useState } from "react";

export default function games() {
    const[games, setGames] = useState([])
    const [twoWeeks, setTwoWeeks] = useState();
    const [selectedDate, setSelectedDate] = useState("");

    const [sex, setSex] = useState("");
    const [district, setDistrict] = useState("");
    const [level, setLevel] = useState("");

    useEffect(() => {
        const date = new Date();
        const defaultSelectedDate = date.toLocaleDateString("en-SG");
        
        const tempTwoWeeks = [];

        for(let i = 0; i < 14; i++){
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() + i);
        
            const weekday = newDate.toLocaleString("en-SG", {weekday: "short"});
            const dateString = newDate.toLocaleDateString("en-SG");
        
            tempTwoWeeks.push({
                weekday: weekday,
                date: dateString,
            })
        }

        setTwoWeeks(tempTwoWeeks);
        setSelectedDate(defaultSelectedDate);
    }, []);

    useEffect(() => {
        const fetchGames = async () => {
            const dateArray = selectedDate.split("/");
            const sqlDate = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`

            const res = await fetch(`http://localhost:3000/api/games?date=${sqlDate}`);
            const data = await res.json();
            setGames(data);
        }

        fetchGames();
    }, [selectedDate]);

    function filterGames(game){
        let result = true;

        if(sex !== ""){
            if(sex !== game.sex){
                result = false;
            }
        }

        if(district !== ""){
            if(district !== game.district){
                result = false;
            }
        }

        if(level !== ""){
            if(level !== game.level){
                result = false;
            }
        }

        return result;
    }
  
    return(
        <div className={listStyles.container}>
            <div className={gamesStyles.scrollMenu}>
                {twoWeeks ? twoWeeks.map((day, i) => ( 
                    <div onClick={() => setSelectedDate(day.date)}>
                        <p>{day.date.split("/")[0]}</p>
                        <p style={selectedDate === day.date ? {
                            textDecoration: "underline",
                            textDecorationColor: "blue",
                            textDecorationThickness: "2px",
                        } : null}>
                            {day.weekday}
                        </p>
                    </div>
                )) : null}
            </div>
            <div className={gamesStyles.filter}>
                <select onChange={(e) => setSex(e.target.value)}>
                    <option value="">All Sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <select onChange={(e) => setDistrict(e.target.value)}>
                    <option value="">All District</option>
                    <option value="South West">South West</option>
                    <option value="North West">North West</option>
                    <option value="Central Singapore">Central Singapore</option>
                    <option value="North East">North East</option>
                    <option value="South East">South East</option>
                </select>
                <select onChange={(e) => setLevel(e.target.value)}>
                    <option value="">All Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
            </div>
            <h1>Games</h1>
            {games.filter(filterGames).map((game, i) => (
                <div className={listStyles.card}>
                    <div>
                        <h2>{game.title}</h2>
                        <p>{game.location}</p>
                        <p>{game.sex}</p>
                        <p>{game.level}</p>
                    </div>
                    <Link className={listStyles.button} href={`/games/${game.id}`}>Participate</Link>
                </div>
            ))}
            <Link href="games/registerGame" className={listStyles.fixedButton}>Register Game</Link>
        </div>
    );
}