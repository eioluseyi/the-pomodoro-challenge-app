import { useContext } from "react";
import { ChallengeContext } from "../ChallengeWrapper";

function ProgressHistory() {
  const { formattedHistory, localStorageData } = useContext(ChallengeContext);
  return (
    <div className="history-wrapper">
      <div className="history-item">
        {formattedHistory.map((itm, idx) => (
          <span key={idx}>{itm}</span>
        ))}
      </div>
      {localStorageData.history?.map((itm, idx) => (
        <div key={idx} className="history-item">
          {itm.split(" ").map((subItm, subIdx) => (
            <span key={subIdx}>{subItm}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ProgressHistory;
