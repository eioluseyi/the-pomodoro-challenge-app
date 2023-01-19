import { useContext } from "react";
import { ChallengeContext } from "../ChallengeWrapper";
import ModuleWrapper from "../layout/ModuleWrapper";

function Missed() {
  const {
    setLocalStorageData,
    setStartDate,
    formattedHistory,
    setStep
  } = useContext(ChallengeContext);

  const handleMoveOn = () => {
    const newStartDate = new Date();

    // Move to history and set new startDate as today
    setLocalStorageData((e) => ({
      ...e,
      history: [formattedHistory.join(" "), ...e.history].slice(0, 2),
      startDate: newStartDate,
      days: []
    }));

    setStartDate(newStartDate);

    setStep("BASIC");
  };

  const actionContent = (
    <button className="action-button" onClick={handleMoveOn}>
      <i className="gg-repeat"></i>
    </button>
  );

  const instruction = (
    <div>
      <details style={{ maxWidth: "200px", marginInline: "auto" }}>
        <summary style={{ cursor: "pointer", fontWeight: "900", display: "" }}>
          Remember the
          <span style={{ borderBottom: "1px solid ", marginInline: "2px" }}>
            Rule?
          </span>
          <span
            role="img"
            aria-label="look"
            style={{ marginLeft: "2px", fontSize: "120%" }}
          >
            👀
          </span>
        </summary>
        If you miss a day, you have to start all over from <b>day 1</b>
      </details>
      <br />
      Don't be disappointed.
      <br />
      Let's go again! ✊
    </div>
  );

  return (
    <ModuleWrapper {...{ actionContent, instruction }}>
      <div>
        <h1 style={{ marginBottom: "0" }}>Oh no!</h1>
        <p style={{ margin: "0" }}>You missed a day..</p>
        <h1 style={{ marginTop: "0" }}>
          <span role="img" aria-label="sad">
            😔
          </span>
        </h1>
      </div>
    </ModuleWrapper>
  );
}

export default Missed;
