"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import listStyles from "../styles/List.module.css"

export default function courts() {
    const [courts, setCourts] = useState([]);

    useEffect(() => {
        const fetchCourts = async() => {
            const res = await fetch("http://localhost:3000/api/courts");
            const data = await res.json();

            setCourts(data);
        }

        fetchCourts();
    }, [])


    function changeDate(){
        setOpen(false);
    }

    return(
        <div className={listStyles.container}>
            <h1>Courts</h1>
            {courts.map((court, i) => (
                <div className={listStyles.card}>
                    <div>
                        <h2>{court.name}</h2>
                        <p>{court.district}</p>
                        <p>{court.location}</p>
                        <p>{court.type}, {court.size}</p>
                    </div>
                    <Link className={listStyles.button} href={`/courts/${court.id}`}>Book Court</Link>
                </div>
            ))}
            <Link className={listStyles.fixedButton} href="/courts/register">Register Court</Link>
        </div>
    );
}