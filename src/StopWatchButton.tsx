import React from 'react';

// Main, default function that returns the HTML and includes the functions to handle button presses
export default function StopWatchButton({isRunning, totalMils, ToggleRun, ResetTime, LapTime}:
    {isRunning: boolean, totalMils: number, ToggleRun: Function, ResetTime: Function, LapTime: Function}) {

    var hasRun = false;

    // Function that handles user input to change stopwatch running state
    function RunHandler() {
        ToggleRun();
        if (isRunning) {
            hasRun = true;
        }
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

    return (
        <div>
        <button onClick={RunHandler} className={isRunning ? 'stop-btn' : 'start-btn'}>
            {isRunning ? 'Stop' : 'Start'}
        </button>

        <button onClick={ResetHandler}>
            Reset
        </button>

        <button onClick={LapHandler} className='lap-btn' disabled={!isRunning}>
            Lap
        </button>
        </div>
    )
}