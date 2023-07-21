import timeTableStyles from "../styles/TimeTable.module.css"

export default function TimeTable({times, bookedTimes, openTime, closeTime}){
    //labels
    const labels = [];
    const hours = 24;
    const divisionCount = 4;
    for(let i = 0; i < divisionCount + 1; i++){
        const label = i * hours / divisionCount;
        let labelString = `${label}`
        if(label < 10){
            labelString = `0${label}`
        }

        labels.push(labelString);
    }

    function getColor(time){
        const timeIndex = times.indexOf(time);
        const openTimeIndex = times.indexOf(openTime);
        const closeTimeIndex = times.indexOf(closeTime);

        if(timeIndex < openTimeIndex || timeIndex >= closeTimeIndex){
            return "gray";
        }

        if(bookedTimes.includes(time)){
            return "red";
        }

        return "white";
    }

    return(
        <div className={timeTableStyles.container}>
            <div className={timeTableStyles.labels}>
                {labels.map((label, i) => (
                    <p>{label}</p>
                ))}
            </div>
            <div className={timeTableStyles.timeTable}>
                {times.map((time, i) => (
                <div className={timeTableStyles.time} style={{width : `${100 / 24 * 2}%`, backgroundColor: `${getColor(time)}`}}/>
                ))}
            </div>
            <div className={timeTableStyles.colorDescription}>
                <p><span style={{color: "gray"}}>Gray</span>: Closed</p>
                <p><span style={{color: "red"}}>Red</span>: Booked</p>
                <p>White: Open</p>
            </div>
        </div>
    );
}