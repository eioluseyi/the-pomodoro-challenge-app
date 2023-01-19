import { useCallback, useContext, useState } from "react";
import { ChallengeContext } from "../ChallengeWrapper";
import ModuleWrapper from "../layout/ModuleWrapper";

function Init() {
  const {
    startDate,
    setStartDate,
    numberOfDays,
    setStep,
    setLocalStorageData
  } = useContext(ChallengeContext);

  const [_startDate, set_startDate] = useState(startDate);

  const mida = new Date();
  mida.setDate(new Date().getDate() - (numberOfDays - 1));
  const minDate = mida.toISOString().substring(0, 10);

  const handleProceed = useCallback(() => {
    // Calculate daysPast from startDate
    const daysPast = new Date().getDate() - _startDate.getDate();

    // Fill all days past
    const days = Array(daysPast).fill("done");

    // Save the values to local storage
    setLocalStorageData((e) => ({
      ...e,
      id: "index",
      history: [],
      startDate: _startDate,
      days
    }));

    setStartDate(_startDate);

    // Move to next screen
    setStep("BASIC");
  }, [_startDate, setStartDate, setLocalStorageData, setStep]);

  const actionContent = (
    <>
      <input
        type="date"
        className="date-input"
        value={_startDate.toISOString().substring(0, 10)}
        min={minDate}
        onChange={(e) => set_startDate(new Date(e.target.value || new Date()))}
      />
      <button className="action-button" onClick={handleProceed}>
        <i className="gg-chevron-right"></i>
      </button>
    </>
  );

  const instruction = "Choose a start date";

  return (
    <ModuleWrapper {...{ actionContent, instruction }}>
      <div>
        <h1 className="heading">
          Hello<i style={{ marginLeft: "-2px" }}>!</i>{" "}
          <span role="img" aria-label="wave">
            👋
          </span>
        </h1>
        <div className="sub-title">You are about to begin a new Challenge</div>
      </div>
    </ModuleWrapper>
    // <div className="init-wrapper module-wrapper">
    // <div>
    //   <h2>
    //     Hello<i style={{ marginLeft: "-2px" }}>!</i>{" "}
    //     <span role="img" aria-label="wave">
    //       👋
    //     </span>
    //   </h2>
    //   <div>Choose your start date</div>
    // </div>

    //   <div className="bottom-details-wrapper">
    // <input
    //   type="date"
    //   className="date-input"
    //   value={_startDate.toISOString().substring(0, 10)}
    //   min={minDate}
    //   onChange={(e) => set_startDate(new Date(e.target.value))}
    // />
    // <button className="action-button" onClick={handleProceed}>
    //   ➜
    // </button>
    //   </div>
    // </div>
  );
}

export default Init;
