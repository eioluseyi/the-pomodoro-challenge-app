import { memo } from "react";
import ModuleWrapper from "../layout/ModuleWrapper";
import ShareProgress from "../ShareProgress";
import ProgressHistory from "./ProgressHistory";

function Done() {
  const instruction = <div className="title">Share your progress</div>;

  return (
    <ModuleWrapper
      {...{
        actionContent: <ShareProgress />,
        instruction,
        options: { reset: true }
      }}
    >
      <div>
        <h1 style={{ marginBottom: "0" }}>Awesome!</h1>
        <p style={{ margin: "0 30px" }}>You're done for the day!</p>
        <h1 style={{ marginTop: "0" }}>
          <span role="img" aria-label="celebrate">
            🙌
          </span>
        </h1>
        <ProgressHistory />
      </div>
    </ModuleWrapper>
  );
}

export default memo(Done);
