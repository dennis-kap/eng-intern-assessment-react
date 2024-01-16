import React from 'react';

// Main, default function that returns the HTML and includes the functions to handle button presses
export default function StopWatchButton({isRunning, totalMils, ToggleRun, ResetTime, LapTime}:
    {isRunning: boolean, totalMils: number, ToggleRun: Function, ResetTime: Function, LapTime: Function}) {

    var hasRun = false;

    // Function that handles user input to change stopwatch running state
    function RunHandler() {
        console.log(hasRun);
        ToggleRun();
        if (isRunning) {hasRun = true};
        console.log(isRunning );
        
    }

    // Function that handles user input to reset stopwatch
    function ResetHandler() {
        ResetTime();
        if (!isRunning) {hasRun = false};
    }

    // Function that handles user input to save a lap
    function LapHandler() {
        LapTime();
    }

    // Checks if Stopwatch can be reset
    const canReset = isRunning && (totalMils !== 0);

    return (
        <div>
        <button onClick={RunHandler}>
            {isRunning ? 'Stop' : 'Start'}
        </button>

        <button onClick={ResetHandler} disabled={canReset}>
            Reset
        </button>

        <button onClick={LapHandler} disabled={!isRunning}>
            Lap
        </button>
        </div>
    )
}