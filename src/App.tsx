import React, { useState, useEffect } from 'react'
import { StopWatch, ConvertTime } from './StopWatch'
import StopWatchButton from './StopWatchButton'

var time = 0;

export function getTime(): number {
    return time;
}

export default function App() {
    // lapList - List of laps
    const [lapList, addLap] = useState([]);
    const [totalMils, setMilliseconds] = useState(0);
    const [isRunning, setRunning] = useState(false);
    
    // Portion of code that constantly increases the time if the Stopwatch is running
    // Runs at interval of 10 milliseconds
    useEffect(() => {

        if (isRunning) {
            let interval = setInterval(() => {
                setMilliseconds(totalMils + 10);
                time = totalMils;
            }, 10);

            return () => clearInterval(interval);
        }

    });
    
    // Function that toggles the running state of the stopwatch
    function ToggleRun() {
        setRunning(!isRunning);
    }

    // Function that resets the stopwatch time
    function ResetTime() {
        if (isRunning) {ToggleRun();}
        time = 0;
        setMilliseconds(time);
    } 

    // Function that laps stopwatch time
    function LapTime() {
        const [hrsStr, minsStr, secsStr, milsStr] = ConvertTime(totalMils);
        const newLap = `${hrsStr}:${minsStr}:${secsStr}.${milsStr}`;

        addLap(lapList => [...lapList, newLap]);
    } 

    return(
        <div>
            <h2>Stopwatch - Dennis K</h2>
            <StopWatch />
            <StopWatchButton isRunning={isRunning} ToggleRun={ToggleRun} ResetTime={ResetTime} LapTime={LapTime}/>

            <ul id="lap-list">
                {lapList.map(lap => (
                    <li>{lap}</li>
                ))}
            </ul>
        </div>
    )
}
