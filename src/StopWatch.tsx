import React, { useState, useEffect } from 'react'
import StopWatchButton from './StopWatchButton'

// Function that returns double digit string
function TwoDigit(n: number) {
    return n > 9 ? "" + n: "0" + n;
}

// Function to convert total milliseconds to hours, minutes, etc.
export function ConvertTime(totalMils: number) {

    // Hours, minutes and seconds found from the total seconds
    var hrs = Math.floor(totalMils / 3600000);
    var mins = Math.floor(totalMils / 60000 % 60);
    var secs = Math.floor(totalMils / 1000 % 60);

    // Times converted to strings to make sure the values are double digits
    if (hrs < 25) {
        var hrsStr = TwoDigit(hrs);
    } else {
        var hrsStr = String(hrs);
    }

    var minsStr = TwoDigit(mins);
    var secsStr = TwoDigit(secs);

    return [hrsStr, minsStr, secsStr];
}

// Main, default function that returns the HTML and includes the useState hooks along with functions to modify them
export default function StopWatch() {
    // useState hooks
    // lapList - List of laps
    // totalMils - Total number of milliseconds
    // isRunning - If stopwatch is running
    const [lapList, changeLaps] = useState([]);
    const [totalMils, setMilliseconds] = useState(0);
    const [isRunning, setRunning] = useState(false);
    
    // Portion of code that constantly increases the time by 10 milliseconds if the Stopwatch is running
    // Runs at interval of 10 milliseconds
    useEffect(() => {

        if (isRunning) {
            let interval = setInterval(() => {
                setMilliseconds(totalMils + 10);
            }, 10);

            return () => clearInterval(interval);
        }

    });

    // Function that toggles the running state of the stopwatch
    function ToggleRun() {
        (isRunning && totalMils !== 0)? setRunning(false): setRunning(true);
    }

    // Function that resets the stopwatch time
    function ResetTime() {
        if (isRunning) {
            ToggleRun();
        }
        setMilliseconds(0);
        changeLaps([]);
    } 


    // Converting the time to double digit strings
    const [hrsStr, minsStr, secsStr] = ConvertTime(totalMils);
    const curTime = `${hrsStr}:${minsStr}:${secsStr}`;

    // Function that laps stopwatch time
    function LapTime() {
        changeLaps(lapList => [...lapList, curTime]);
    } 

    return(
        <div>
            <h1>{curTime}</h1>

            <StopWatchButton 
            totalMils={totalMils} isRunning={isRunning}
            ToggleRun={ToggleRun} ResetTime={ResetTime} LapTime={LapTime}/>

            <h5>{lapList.length > 0 ? "Laps" : ""}</h5>
            {lapList.length > 0 ? <hr></hr> : <></>}

            <ul data-testid="lap-list">
                {lapList.map((lap, index) => (
                    <li>Lap {index+1}: <p>{lap}</p></li>
                ))}
            </ul>
        </div>
    )
}