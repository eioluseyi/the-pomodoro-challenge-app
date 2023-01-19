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
          className="action-button small"
          style={{
            position: "absolute",
            bottom: "5px",
            right: "5px",
            boxShadow: "none"
          }}
          onClick={() => setIsOpen(true)}
        >
          <i className="gg-more-vertical-o"></i>
        </button>
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(2px)",
            display: "flex",
            visibility: isOpen ? "visible" : "hidden",
            alignItems: "center",
            justifyContent: "center",
            zIndex: isOpen ? "1" : "-1",
            color: "#555"
          }}
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
