import React from 'react';
import { getTime } from './App';

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
    var mils = Math.floor((totalMils % 1000) / 10);

    // Times converted to strings to make sure the values are double digits
    if (hrs < 25) {
        var hrsStr = TwoDigit(hrs);
    } else {
        var hrsStr = String(hrs);
    }

    var minsStr = TwoDigit(mins);
    var secsStr = TwoDigit(secs);
    var milsStr = TwoDigit(mils);

    return [hrsStr, minsStr, secsStr, milsStr];
}

export function StopWatch() {
    
    const totalMils: number = getTime();

    const [hrsStr, minsStr, secsStr, milsStr] = ConvertTime(totalMils);

    return(
        <div>
            <h1>{hrsStr}:{minsStr}:{secsStr}.{milsStr}</h1>
        </div>
    )
}