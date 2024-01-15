import React, {useState, useEffect} from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

export default function App() {
    const [isRunning, setRunning] = useState(false);
    const [totalMils, setMilliseconds] = useState(0);

    // Portion of code that constantly increases the time if the Stopwatch is running
    useEffect(() => {

        if (isRunning) {
            let interval = setInterval(() => {
                setMilliseconds(totalMils + 10);
            }, 10);

            return () => clearInterval(interval);
        }

    });

    
    // Function that toggles the running state of the stopwatch
    function toggleRun() {
        setRunning(!isRunning);
    }

    // Function that resets the stopwatch time
    function resetTime() {
        if (isRunning) {toggleRun();}
        setMilliseconds(0);
    } 

    return(
        <div>
        <StopWatch totalMils={totalMils}/>
        <StopWatchButton isRunning={isRunning} toggleRun={toggleRun} resetTime={resetTime}/>
        </div>
    )
}
