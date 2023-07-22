import React, { useEffect, useState } from 'react';
import './laptimer.css';

const LapTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [laps, setLaps] = useState([]);
  const [intervalId, setIntervalId] = useState(null);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (seconds === 60) {
      setSeconds(0);
      setMinutes((prev) => prev + 1);
    }
  }, [seconds]);

  const addSeconds = () => {
    console.log('addSeconds');
    setSeconds((prev) => prev + 1);
  };

  const handleStart = () => {
    console.log('handleStart');
    setIsStarted(true);
    if (!intervalId) setIntervalId(setInterval(addSeconds, 200)); // set miliseconds to 1000 for 1 second
  };

  const handleReset = () => {
    console.log('handleReset');
    clearInterval(intervalId);
    setIntervalId(null);
    setIsStarted(false);
    setSeconds(0);
    setMinutes(0);
    setLaps([]);
  };
  const handleLaps = () => {
    console.log('handleLaps');
    if (isStarted)
      setLaps((laps) => [...laps, { minutes: minutes, seconds: seconds }]);
  };

  return (
    <div className="container">
      <h2>
        Time : {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </h2>
      <button onClick={() => handleStart()}>Start</button>
      <button onClick={() => handleReset()}>Reset</button>
      <button onClick={() => handleLaps()}>Lap</button>
      <ol>
        {laps.map((lap) => {
          return (
            <li>
              {lap.minutes.toString().padStart(2, '0')}:
              {lap.seconds.toString().padStart(2, '0')}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default LapTimer;
