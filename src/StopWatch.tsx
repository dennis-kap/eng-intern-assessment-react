import React, {useState} from 'react';

function TwoDigit(n: number) {
    return n > 9 ? "" + n: "0" + n;
}

const Stopwatch = () => {
    const [isRunning, setRunning] = useState(false);
    const [totalSeconds, setSeconds] = useState(0);

    function toggleRunning() {
        setRunning(!isRunning);
    }

    var hrs = Math.floor(totalSeconds / 3600);
    var mins = Math.floor((totalSeconds % 3600) / 60);
    var secs = totalSeconds % 60;

    var hrsStr = TwoDigit(hrs);
    var minsStr = TwoDigit(mins);
    var secsStr = TwoDigit(secs);

    return(
        <div>
            <h2>Stopwatch - Dennis K</h2>

            <h1>{hrsStr}:{minsStr}:{secsStr}</h1>

            <button onClick={toggleRunning}>
                {isRunning ? 'Stop' : 'Start'}
            </button>
            
            <button></button>
        </div>

    )
}

export default Stopwatch;