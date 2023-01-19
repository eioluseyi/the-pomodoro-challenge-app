import { memo, useContext, useState } from "react";
import { ChallengeContext } from "../ChallengeWrapper";
import Timer from "../Timer";
import ProgressHistory from "./ProgressHistory";
import ModuleWrapper from "../layout/ModuleWrapper";

function Basic() {
  const { handleComplete } = useContext(ChallengeContext);
  const [timerObject, setTimerObject] = useState({});
  const [shouldHide, setShouldHide] = useState();

  const actionContent = (
    <div style={{ display: "grid", gap: "30px" }}>
      <Timer
        setDone={handleComplete}
        setTimerObject={setTimerObject}
        setShouldHide={setShouldHide}
      />
    </div>
  );
  const instruction = (
    <div className={`basic-instruction ${shouldHide ? "hide" : ""}`}>
      <p>
        Your progress so far
        <br />
      </p>
      <ProgressHistory />
    </div>
  );

  return (
    <ModuleWrapper
      {...{
        actionContent,
        instruction,
        options: { reset: true, markAsDone: true }
      }}
    >
      <div className="timer-display-wrapper">
        {timerObject.minutes || "00"}:{timerObject.seconds || "00"}
      </div>
    </ModuleWrapper>
  );
}

export default memo(Basic);
