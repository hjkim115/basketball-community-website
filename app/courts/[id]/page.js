"use client"

import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { useParams } from "next/navigation";
import TimeTable from "@/app/components/TimeTable";
import { UserAuth } from "@/app/context/AuthContext";

import 'react-day-picker/dist/style.css';
import courtStyles from "../../styles/Court.module.css"

export default function court(){
    const today = new Date();
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(today);
    const [court, setCourt] = useState();
    const [bookings, setBookings] = useState();

    const [startHour, setStartHour] = useState("");
    const [startMinute, setStartMinute] = useState("");
    const [durationHour, setDurationHour] = useState("");
    const [durationMinute, setDurationMinute] = useState("")

    const params = useParams();
    const id = params.id;

    const {user} = UserAuth();

    useEffect(() => {
        const fetchCourt = async () => {
            const res = await fetch(`http://localhost:3000/api/courts/${id}`);
            const data = await res.json();
      
            setCourt(data);
        };

        if(id){
            fetchCourt();
        }
    }, [id])

    useEffect(() => {
        const fetchBookings = async () => {
            const sqlDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            const res = await fetch(`http://localhost:3000/api/bookings?courtId=${id}&&date=${sqlDate}`);
            const data = await res.json();
      
            setBookings(data);
        };

        if(id){
            fetchBookings();
        }
    }, [id, date])

    //date
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 30);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    //times
    const hours = 24;
    const times = [];
    for(let i = 0; i < hours; i++){
        const hour = i < 10 ? `0${i}` : i;

        times.push(`${hour}:00`, `${hour}:30`)
    }   

    //booked Times
    const bookedTimes = [];
    if(bookings){
        for(let i = 0; i < bookings.length; i++){
            const booking = bookings[i];
            const selectedTimes = booking.selected_times["times"];
        
            for(let j = 0; j < selectedTimes.length; j++){
                const time = selectedTimes[j];
        
                bookedTimes.push(time);
            }
        }
    }

    //openTimes
    const openTimes = [];
    if(court){
        const openTimeIndex = times.indexOf(court.open_time);
        const closeTimeIndex = times.indexOf(court.close_time);
        
        for(let i = openTimeIndex; i < closeTimeIndex; i++){
            openTimes.push(times[i]);
        }
    }

    //startHours

    const startHours = [];

    if(court){
        const openHour = Number(openTimes[0].split(":")[0]);
        const closeHour = Number(openTimes[openTimes.length - 1].split(":")[0]);
    
        for(let i = openHour; i < closeHour + 1; i++){
            let hour = `${i}`;
    
            if(i < 10){
                hour = `0${hour}`;
            }
            startHours.push(hour);
        }
    }

    //durationHours
    const durationHours = []

    if(court){
        const operatingHours = openTimes.length / 2;
        for(let i = 0; i < operatingHours + 1; i++){
            let hour = `${i}`;
    
            if(i < 10){
                hour = `0${hour}`;
            }
    
            durationHours.push(hour);
        }
    }

    //minutes
    const minutes = ["00", "30"];

    
    function isValidStartTime(){
        const time = `${startHour}:${startMinute}`;

        if(startHour === "" || startMinute === ""){
            return false;
        }

        if(!openTimes.includes(time)){
            return false;
        }

        if(bookedTimes.includes(time)){
            return false;
        }

        return true;
    }

    function isValidDuration(){
        if(!isValidStartTime()){
            return false;
        }

        if(durationHour === "" || durationMinute === ""){
            return false;
        }

        if(durationHour === "00" && durationMinute === "00"){
            return false;
        }

        const durationCount = 2 * Number(durationHour) + (durationMinute === "30" ? 1 : 0);
        const startTimeIndex = times.indexOf(`${startHour}:${startMinute}`);

        for(let i = 1; i < durationCount; i++){
            const time = times[startTimeIndex + i];

            if(!openTimes.includes(time)){
                return false;
            }
            
            if(bookedTimes.includes(time)){
                return false;
            }
        }

        return true;
    }

    async function bookCourt(){
        if(!isValidDuration()){
            return 0;
        }

        const selectedTimes = [];
        const durationCount = 2 * Number(durationHour) + (durationMinute === "30" ? 1 : 0);
        const startTimeIndex = times.indexOf(`${startHour}:${startMinute}`);

        for(let i = 0; i < durationCount; i++){
            const time = times[startTimeIndex + i];

            selectedTimes.push(time)
        }

        const booking = [
            court.id,
            user.uid,
            `${year}-${month}-${day}`,
            {"times": selectedTimes}
        ];  

        await fetch(`http://localhost:3000/api/bookings`, {
            method: "POST",
            body: JSON.stringify({
              booking: booking,
            }),
            headers: {
              "Content-Type": "application/json",
            },
        });

        window.location.reload();
    }

    return (
        <div className={courtStyles.container}>
            {court ? <>
                <h1>{court.name}</h1>
                <h2>({`${year}/${month}/${day}`})</h2>

                <div 
                    style={{
                    backgroundImage: `url(../../../images/${court.image_path})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    }}
                    className={courtStyles.image}
                />

                <div className={courtStyles.description}>
                    <p>District: {court.district}</p>
                    <p>Location: {court.location}</p>
                    <p>Type: {court.type} Court</p>
                    <p>Size: {court.size} Court</p>
                    <p>Operating Hours: {court.open_time} ~ {court.close_time}</p>
                </div>
            </> : null}

            <div className={courtStyles.datePicker}>
                {open === true ? <div>
                    <DayPicker 
                        mode="single" 
                        disabled={{
                            after: maxDate,
                            before: today
                        }} 
                        fromMonth={today}
                        toMonth={maxDate}
                        required
                        selected={date}
                        onSelect={setDate}
                    />
                <button onClick={() => setOpen(!open)}>Close</button>
            </div>
             : <button onClick={() => setOpen(!open)}>Change Date</button>}

            </div>
            
            {court ? <TimeTable 
                times={times}
                bookedTimes={bookedTimes} 
                openTime={court.open_time} 
                closeTime={court.close_time}
            /> : null}

            {court && bookings ? <div className={courtStyles.form}>
 
                <div>
                    <h3>Start Time</h3>
                    <div>
                        <label>Hour: </label>
                        <select onChange={(e) => setStartHour(e.target.value)}>
                            <option value="">Select Hour</option>
                            {startHours.map((hour, i) => (
                                <option value={hour}>{hour}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Minute: </label>
                        <select onChange={(e) => setStartMinute(e.target.value)}>
                            <option value="">Select Minute</option>
                            {minutes.map((minute, i) => (
                                <option value={minute}>{minute}</option>
                            ))}
                        </select>
                    </div>
                    {isValidStartTime() == true ? <p style={{color: "green"}}>Valid</p> : <p style={{color: "red"}}>Not Valid</p>}
                </div>

                <div>
                    <h3>Duration</h3>
                    <div>
                        <label>Hour: </label>
                        <select onChange={(e) => setDurationHour(e.target.value)}>
                            <option value="">Select Hour</option>
                            {durationHours.map((hour, i) => (
                                <option value={hour}>{hour}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Minute: </label>
                        <select onChange={(e) => setDurationMinute(e.target.value)}>
                            <option value="">Select Minute</option>
                            {minutes.map((minute, i) => (
                                <option value={minute}>{minute}</option>
                            ))}
                        </select>
                    </div>
                    {isValidDuration() == true ? <p style={{color: "green"}}>Valid</p> : <p style={{color: "red"}}>Not Valid</p>}
                </div>
            </div> : null}

            {court && bookings ? <button onClick={bookCourt}>Book Court</button> : null}
        </div>
    );
}