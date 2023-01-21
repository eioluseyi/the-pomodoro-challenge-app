import React, { useContext, useState } from "react";
import { ChallengeContext } from "../ChallengeWrapper";

function OptionsModal({ options = {} }) {
  const [isOpen, setIsOpen] = useState(false);

  const { resetData, handleComplete } = useContext(ChallengeContext);

  const hasOptions = !!Object.values(options).length;

  return (
    hasOptions && (
      <>
        <button
          className="action-button modal-trigger-button small"
          onClick={() => setIsOpen(true)}
        >
          <i className="gg-more-vertical-o"></i>
        </button>
        <div
          className={`modal-wrapper ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={`modal-content-wrapper ${isOpen ? "open" : ""}`}
          >
            {options?.markAsDone && (
              <button className="modal-button" onClick={handleComplete}>
                <span>
                  <i className="gg-check"></i>
                </span>{" "}
                Mark as done
              </button>
            )}
            {options?.reset && (
              <button
                className="modal-button"
                style={{ "--ggs": "0.8" }}
                onClick={resetData}
              >
                <span>
                  <i className="gg-redo"></i>
                </span>{" "}
                Reset
              </button>
            )}
          </div>
        </div>
      </>
    )
  );
}

export default OptionsModal;
