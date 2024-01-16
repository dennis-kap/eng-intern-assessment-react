import React from 'react';

export default function StopWatchButton({isRunning, ToggleRun, ResetTime, LapTime}:
    {isRunning: boolean, ToggleRun: Function, ResetTime: Function, LapTime: Function}) {

    // Function that handles user input to change stopwatch running state
    function RunHandler() {
        ToggleRun();
    }

    // Function that handles user input to reset stopwatch
    function ResetHandler() {
        ResetTime();
    }

    // Function that handles user input to save a lap
    function LapHandler() {
        LapTime();
    }

    return (
        <div>
        <button onClick={RunHandler}>
            {isRunning ? 'Stop' : 'Start'}
        </button>

        <button onClick={ResetHandler}>
            Reset
        </button>

        <button onClick={LapHandler}>
            Lap
        </button>
        </div>
    )
}