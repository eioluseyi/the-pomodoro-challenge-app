import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
// import ConfettiExplosion from "confetti-explosion-react";
import { toast } from "react-toastify";
import completeSound from "./assets/audio/sound_complete.mp3";
import Init from "./steps/Init";
import Basic from "./steps/Basic";
import Done from "./steps/Done";
import Missed from "./steps/Missed";
import CompleteChallenge from "./steps/CompleteChallenge";

export const ChallengeContext = createContext({});

function ChallengeWrapper() {
  const [localStorageData, setLocalStorageData] = useState(
    localStorage.getItem("challengeData") !== "null"
      ? JSON.parse(localStorage.getItem("challengeData"))
      : {}
  );

  const setDataForLocalStorage = (e) =>
    localStorage.setItem("challengeData", JSON.stringify(e));

  useEffect(() => setDataForLocalStorage(localStorageData), [localStorageData]);

  // Source days from localStorage
  const days = useMemo(() => localStorageData?.days || [], [localStorageData]);

  const [numberOfDays] = useState(localStorageData?.numberOfDays || 7);
  // const [subject, setSubject] = useState(localStorageData?.subject || "");
  const [startDate, setStartDate] = useState(
    localStorageData?.startDate
      ? new Date(localStorageData.startDate)
      : new Date("01/15/2023 6:00")
  );

  // Calculate daysPast from startDate
  const daysPast = useMemo(() => new Date().getDate() - startDate.getDate(), [
    startDate
  ]);
  const isTodayDone = useMemo(() => days.length > daysPast, [days, daysPast]);

  const getHistoryData = useCallback(() => {
    let hasMissed = false;

    return Array(numberOfDays)
      .fill(true)
      .map((itm, idx) => {
        const res =
          days[idx] === "done"
            ? "done"
            : daysPast <= idx
            ? "undone"
            : hasMissed
            ? "undone"
            : "missed";
        if (res === "missed") hasMissed = true;
        return res;
      });
  }, [days, daysPast, numberOfDays]);

  const hasMissedDay = useMemo(
    () => getHistoryData().some((e) => e === "missed"),
    [getHistoryData]
  );

  const [step, setStep] = useState(() => {
    if (!localStorageData?.startDate) return "INIT";
    return hasMissedDay ? "MISSED" : "BASIC";
  });

  useEffect(() => {
    if (!localStorageData?.startDate) setStep("INIT");
  }, [localStorageData, setStep]);

  const historyData = useMemo(() => (numberOfDays ? getHistoryData() : []), [
    numberOfDays,
    getHistoryData
  ]);

  const formattedHistory = useMemo(
    () =>
      historyData.map((itm) =>
        itm === "done" ? "🟩" : itm === "missed" ? "🟥" : "⬜️"
      ),
    [historyData]
  );

  const audioComplete = document.createElement("audio");
  audioComplete.src = completeSound;

  const handlePlay = useCallback(
    (type) => {
      switch (type) {
        case "COMPLETE":
          audioComplete.play();
          break;
        default:
          break;
      }
    },
    [audioComplete]
  );

  useEffect(() => {
    // Complete challenge
    if (getHistoryData().every((e) => e === "done")) {
      setStep("COMPLETE");
    } else if (isTodayDone) setStep("DONE");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getHistoryData]);

  const handleComplete = () => {
    // Mark day as done
    setLocalStorageData((e) => {
      const days = [...e.days, "done"];

      if (days.length < numberOfDays) {
        toast(`Day ${days.length} done! ✊`);
        setStep("DONE");
      } else {
        setStep("COMPLETE");
      }

      return {
        ...e,
        days
      };
    });
  };

  const resetData = () => {
    setLocalStorageData({});
    localStorage.clear();
  };

  return (
    <ChallengeContext.Provider
      value={{
        formattedHistory,
        localStorageData,
        setLocalStorageData,
        startDate,
        setStartDate,
        setStep,
        resetData,
        handleComplete,
        numberOfDays,
        isTodayDone,
        handlePlay
      }}
    >
      <div className="challenge-wrapper">
        {step === "INIT" && <Init />}
        {step === "BASIC" && <Basic />}
        {step === "MISSED" && <Missed />}
        {step === "DONE" && <Done />}
        {step === "COMPLETE" && <CompleteChallenge />}
      </div>
    </ChallengeContext.Provider>
  );
}

export default ChallengeWrapper;
