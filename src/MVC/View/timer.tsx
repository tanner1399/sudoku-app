interface TimerProps {
  elapsedTime: number;
}

function Timer({ elapsedTime }: TimerProps) {
  // Format the elapsed time into minutes and seconds
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return <div className="timer">Time: {formatTime(elapsedTime)}</div>;
}

export default Timer;
