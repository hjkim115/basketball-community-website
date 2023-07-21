"use client"

import { UserAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";
import formStyles from "../../styles/Form.module.css";
import { useRouter } from "next/navigation";

export default function registerMatch(){
    const {user} = UserAuth();
    const [isAdmin, setIsAdmin] = useState();
    const router = useRouter();

    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

    const [district, setDistrict] = useState("");
    const [location, setLocation] = useState("");
    const [sex, setSex] = useState("");

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

    async function handleSubmit(e){
        e.preventDefault();

        if(!isCompleted()){
            return;
        }

        const match = [
            date,
            time,
            district,
            location,
            sex
        ];

       await fetch(`http://localhost:3000/api/matches`, {
            method: "POST",
            body: JSON.stringify({
              match: match,
            }),
            headers: {
              "Content-Type": "application/json",
            },
        });

        router.push("/admin");
    }

    function isCompleted(){ 
        if(date === ""){
            return false;
        }

        if(time === ""){
            return false;
        }

        if(district === ""){
            return false;
        }

        if(location === ""){
            return false;
        }

        if(sex === ""){
            return false;
        }

        return true;
    }


    if(isAdmin != undefined){
        if(isAdmin == 0){
            return <h1>You need to admin in order to access!</h1>;
        }

        return (    
            <div className={formStyles.container}>
                <h1>Register Match</h1>
                <form onSubmit={handleSubmit}>
                    <div className={formStyles.card}>
                        <div>
                            <label>Date: </label>
                            <input onChange={(e) => setDate(e.target.value)} type="text" placeholder="Enter Date (YYYY-MM-DD)"/>
                        </div>

                        <div>
                            <label>Time: </label>
                            <input onChange={(e) => setTime(e.target.value)} type="text" placeholder="Enter Time (HH:MM)"/>
                        </div>

                        <div>
                            <label>District: </label>
                            <select onChange={(e) => setDistrict(e.target.value)}>
                                <option value="">Select District</option>
                                <option value="South West">South West</option>
                                <option value="North West">North West</option>
                                <option value="Central Singapore">Central Singapore</option>
                                <option value="North East">North East</option>
                                <option value="South East">South East</option>
                            </select>
                        </div>

                        <div>
                            <label>Location: </label>
                            <input onChange={(e) => setLocation(e.target.value)} type="text" placeholder="Enter Location"/>
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
                        {isCompleted() ? <p style={{color: "green"}}>Completed</p> : <p style={{color: "red"}}>Not Completed</p>}
                    </div> 
                    <button>Register</button>
                </form>
            </div>
        );
    }
}