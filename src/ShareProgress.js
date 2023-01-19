import { useContext } from "react";
import { toast } from "react-toastify";
import { ChallengeContext } from "./ChallengeWrapper";

const ShareProgress = () => {
  const { localStorageData, formattedHistory } = useContext(ChallengeContext);

  const handleShare = () => {
    const shareable =
      (localStorageData.history || []).reduce(
        (prev, curr) => prev + "\n\n" + curr,
        formattedHistory.join(" ")
      ) + "\n\n#7DayChallenge\n#Celeforce";

    const copyShareable = () => {
      navigator.clipboard.writeText(shareable).then(
        () => {
          toast("Copied! Share on your platform of choice.");
        },
        (err) => {
          toast("Couldn't copy for some reason");
        }
      );
    };

    if (navigator.share) {
      navigator
        .share({
          title: "Progress",
          text: shareable
        })
        .catch((e) => {
          toast("Couldn't share for some reason");
        });
    } else {
      copyShareable();
    }
  };

  return (
    <div className="share-progress">
      <button className="action-button" onClick={handleShare}>
        {navigator.share ? (
          <i className="gg-share" style={{ marginLeft: "-10px" }}></i>
        ) : (
          <i className="gg-copy" style={{ "--ggs": "0.8" }}></i>
        )}
      </button>
    </div>
  );
};

export default ShareProgress;
