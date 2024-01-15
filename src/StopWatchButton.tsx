import React from 'react';

export default function StopWatchButton({isRunning, toggleRun, resetTime}:
    {isRunning: boolean, toggleRun: Function, resetTime: Function}) {

    // Function that handles user input to change stopwatch running state
    function runHandler() {
        toggleRun();
    }

    // Function that handles user input to reset stopwatch
    function resetHandler() {
        resetTime();
    }

    return (
        <div>
        <button onClick={runHandler}>
            {isRunning ? 'Stop' : 'Start'}
        </button>

        <button onClick={resetHandler}>
            Reset
        </button>
        </div>
    )
}