import React, { useState, useEffect, useCallback, useMemo } from "react";
import milestoneSound from "./assets/audio/sound_milestone.mp3";
import doneSound from "./assets/audio/sound_done.mp3";

function Timer({ setDone, setTimerObject, setShouldHide }) {
  // Set up state variables for timer
  const [isRunning, setIsRunning] = useState(false);
  const [totalTime, setTotalTime] = useState(20 * 60); // 20 minutes in seconds
  const [timeOption, setTimeOption] = useState("20 minutes");
  const timeOptions = ["20 minutes", "30 minutes", "45 minutes", "60 minutes"];
  const [milestoneTime, setMilestoneTime] = useState(5 * 60); // 5 minutes in seconds
  const [milestoneOption, setMilestoneOption] = useState("5 minutes");
  const milestoneOptions = [
    "5 minutes",
    "10 minutes",
    "15 minutes",
    "30 minutes"
  ];
  const [timeRemaining, setTimeRemaining] = useState(totalTime);
  const [milestoneReached, setMilestoneReached] = useState(false);
  const [taskStatus, setTaskStatus] = useState("in progress");

  const audioMilestone = document.createElement("audio");
  audioMilestone.src = milestoneSound;
  audioMilestone.onended = () => setMilestoneReached(false);

  const audioDone = document.createElement("audio");
  audioDone.src = doneSound;

  const handlePlay = useCallback(
    (type) => {
      switch (type) {
        case "MILESTONE":
          audioMilestone.play();
          break;
        case "DONE":
          audioDone.play();
          break;
        default:
          break;
      }
    },
    [audioMilestone, audioDone]
  );

  useEffect(() => {
    if (taskStatus === "done") {
      // Mark day as done
      setDone(true);
      setIsRunning(false);
    }
  }, [taskStatus, setDone]);

  useEffect(() => {
    if (!isRunning) return;

    // Start timer
    let timer = setInterval(() => {
      setTimeRemaining((timeRemaining) => timeRemaining - 1);
      if (
        timeRemaining % milestoneTime === 0 &&
        !milestoneReached &&
        timeRemaining !== totalTime
      ) {
        handlePlay("MILESTONE");
        setMilestoneReached(true);
      }
      if (timeRemaining === 1) {
        clearInterval(timer);
        setTaskStatus("done");
        handlePlay("DONE");
      }
    }, 1000);
    // cleanup function
    return () => clearInterval(timer);
  }, [
    timeRemaining,
    milestoneReached,
    milestoneTime,
    totalTime,
    handlePlay,
    isRunning
  ]);

  let minutes = useMemo(() => Math.floor(timeRemaining / 60), [timeRemaining]);
  let seconds = useMemo(() => timeRemaining % 60, [timeRemaining]);

  useEffect(
    () =>
      setTimerObject({
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0")
      }),
    [minutes, seconds, setTimerObject]
  );

  const handleTimeOptionChange = (event) => {
    let newValue = 0;

    setTimeOption(event.target.value);
    switch (event.target.value) {
      case "20 minutes":
        newValue = 20 * 60;
        break;
      case "30 minutes":
        newValue = 30 * 60;
        break;
      case "45 minutes":
        newValue = 45 * 60;
        break;
      case "60 minutes":
        newValue = 60 * 60;
        break;
      default:
        newValue = 20 * 60;
    }
    setTotalTime(newValue);
    setTimeRemaining(newValue);
  };

  const handleMilestoneOptionChange = (event) => {
    let newValue = 0;

    setMilestoneOption(event.target.value);
    switch (event.target.value) {
      case "5 minutes":
        newValue = 5 * 60;
        break;
      case "10 minutes":
        newValue = 10 * 60;
        break;
      case "15 minutes":
        newValue = 15 * 60;
        break;
      case "30 minutes":
        newValue = 30 * 60;
        break;
      default:
        newValue = 5 * 60;
    }
    setMilestoneTime(newValue);
    setMilestoneReached(false);
  };

  const handleStartTimer = () => {
    setIsRunning(true);
  };

  const handlePauseTimer = () => {
    setIsRunning(false);
  };

  const handleStopTimer = () => {
    setIsRunning(false);
    setTimeRemaining(totalTime);
  };

  const shouldHide = totalTime > timeRemaining || isRunning;

  useEffect(() => setShouldHide(shouldHide), [shouldHide, setShouldHide]);

  return (
    <>
      <div className={`duration-interval-wrapper ${shouldHide ? "hide" : ""}`}>
        <div className="di-content">
          <select
            className="select"
            value={timeOption}
            onChange={handleTimeOptionChange}
          >
            {timeOptions.map((timeOption) => (
              <option key={timeOption} value={timeOption}>
                {timeOption}
              </option>
            ))}
          </select>
          <div className="di-label">Duration</div>
        </div>
        <div className="di-content">
          <select
            className="select"
            value={milestoneOption}
            onChange={handleMilestoneOptionChange}
          >
            {milestoneOptions.map((milestoneOption) => (
              <option key={milestoneOption} value={milestoneOption}>
                {milestoneOption}
              </option>
            ))}
          </select>
          <div className="di-label">Interval</div>
        </div>
      </div>

      <div className="timer-control-wrapper">
        {!isRunning ? (
          <button className="action-button" onClick={handleStartTimer}>
            <i className="gg-play-button"></i>
          </button>
        ) : (
          <button className="action-button" onClick={handlePauseTimer}>
            <i className="gg-play-pause"></i>
          </button>
        )}
        <button
          className={`action-button small ${shouldHide ? "" : "hide"}`}
          onClick={handleStopTimer}
        >
          <i className="gg-play-stop"></i>
        </button>
      </div>
    </>
  );
}

export default Timer;
