"use client"

import { UserAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import formStyles from "../../styles/Form.module.css"

export default function registerCourt(){
    const {user} = UserAuth();
    const [isAdmin, setIsAdmin] = useState();
    const router = useRouter();

    const [name, setName] = useState("");
    const [district, setDistrict] = useState("");
    const [location, setLocation] = useState("");
    const [type, setType] = useState("");
    const [size, setSize] = useState("");
    const [openTime, setOpenTime] = useState("");
    const [closeTime, setCloseTime] = useState("");
    const [imagePath, setImagePath] = useState("");

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

        const court = [
            name,
            district,
            location,
            type,
            size,
            openTime,
            closeTime,
            imagePath
        ];
        
        await fetch("http://localhost:3000/api/courts", {
            method: "POST",
            body: JSON.stringify({
              court: court,
            }),
            headers: {
              "Content-Type": "application/json",
            },
        });

        router.push("/admin");
    }

    function isCompleted(){
        if(name === ""){
            return false;
        }

        if(district === ""){
            return false;
        }

        if(location === ""){
            return false;
        }

        if(type === ""){
            return false;
        }

        if(size === ""){
            return false;
        }

        if(openTime === ""){
            return false;
        }

        if(closeTime === ""){
            return false;
        }

        if(imagePath === ""){
            return false;
        }

        return true;
    }


    if(isAdmin != undefined){
        if(isAdmin == 0){
            return <h1>You need to be admin in order to access!</h1>;
        }

        return (    
            <div className={formStyles.container}>
                <h1>Register Court</h1>
                <form onSubmit={handleSubmit}>
                    <div className={formStyles.card}>
                        <div>
                            <label>Name: </label>
                            <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Name"/>
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
                            <label>Type: </label>
                                <select onChange={(e) => setType(e.target.value)}>
                                <option value="">Select Type</option>
                                <option value="Indoor">Indoor</option>
                                <option value="Outdoor">Outdoor</option>
                            </select>
                        </div>

                        <div>
                            <label>Size: </label>
                            <select onChange={(e) => setSize(e.target.value)}>
                                <option value="">Select Size</option>
                                <option value="Half">Half</option>
                                <option value="Full">Full</option>
                            </select>
                        </div>

                        <div>
                            <label>Open Time: </label>
                            <input onChange={(e) => setOpenTime(e.target.value)} type="text" placeholder="Enter Open Time (HH:MM)"/>
                        </div>

                        <div>
                            <label>Close Time: </label>
                            <input onChange={(e) => setCloseTime(e.target.value)} type="text" placeholder="Enter Close Time (HH:MM)"/>
                        </div>

                        <div>
                            <label>Image Path: </label>
                            <input onChange={(e) => setImagePath(e.target.value)} type="text" placeholder="Enter Image Path"/>
                        </div>
                     
                        {isCompleted() ? <p style={{color: "green"}}>Completed</p> : <p style={{color: "red"}}>Not Completed</p>}
                    </div>

                    <button>Register</button>
                </form>
            </div>
        );
    }
}