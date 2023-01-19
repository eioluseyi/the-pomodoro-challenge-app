import { memo, useContext, useEffect } from "react";
import ConfettiExplosion from "confetti-explosion-react";
import ModuleWrapper from "../layout/ModuleWrapper";
import ProgressHistory from "./ProgressHistory";
import ShareProgress from "../ShareProgress";
import { ChallengeContext } from "../ChallengeWrapper";

function CompleteChallenge() {
  const { handlePlay, setLocalStorageData } = useContext(ChallengeContext);

  const instruction = <div className="title">Share your progress</div>;

  useEffect(() => {
    // Complete challenge

    // Set completed as true
    setLocalStorageData((e) => {
      return {
        ...e,
        completed: true
      };
    });

    // Play audio
    handlePlay("COMPLETE");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ModuleWrapper
      {...{
        actionContent: <ShareProgress />,
        instruction,
        options: { reset: true }
      }}
    >
      <ConfettiExplosion {...{ force: 2 }} />
      <div>
        <h1 style={{ marginBottom: "0" }}>Outstanding!</h1>
        <p style={{ margin: "0 30px" }}>Challenge complete!</p>
        <h1 style={{ marginTop: "0" }}>
          <span role="img" aria-label="celebrate">
            🎉
          </span>
        </h1>
        <ProgressHistory />
      </div>
    </ModuleWrapper>
  );
}

export default memo(CompleteChallenge);
