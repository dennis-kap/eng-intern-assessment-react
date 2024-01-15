import React, {useState, useEffect} from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

export default function App() {
    const [isRunning, setRunning] = useState(false);
    const [totalMils, setMilliseconds] = useState(0);

    // Portion of code that constantly increases the time if the Stopwatch is running
    useEffect(() => {
        if (isRunning) {
            setMilliseconds(totalMils+10);
            // setTimeout(() => setMilliseconds(totalMils+10), 1);
        }
    });

    // Function that resets the stopwatch time
    function resetTime() {
        setMilliseconds(0);
    } 

    // Function that toggles the running state of the stopwatch
    function toggleRun(): void {
        setRunning(!isRunning);
    }

    return(
        <div>
        <StopWatch totalMils={totalMils}/>
        <StopWatchButton isRunning={isRunning} toggleRun={toggleRun} resetTime={resetTime}/>
        </div>
    )
}
