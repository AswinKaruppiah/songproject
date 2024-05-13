/* eslint-disable react/prop-types */
import { useContext, useRef, useState } from "react";
import "../styles/customize-progress-bar.css";

// import components
import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import { StateContext } from "./context/State";

const AudioPlayer = ({ tracks }) => {
  const { currentTrack, setCurrentTrack, setTrackIndex, trackIndex } =
    useContext(StateContext);

  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  setCurrentTrack(tracks[trackIndex]);

  // reference
  const audioRef = useRef();
  const progressBarRef = useRef();

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };

  return (
    <>
      <div>
        <div>
          <DisplayTrack
            {...{
              currentTrack,
              audioRef,
              setDuration,
              progressBarRef,
              handleNext,
            }}
          />
          <Controls
            {...{
              audioRef,
              progressBarRef,
              duration,
              setTimeProgress,
              tracks,
              trackIndex,
              setTrackIndex,
              setCurrentTrack,
              handleNext,
            }}
          />
          <ProgressBar
            {...{ progressBarRef, audioRef, timeProgress, duration }}
          />
        </div>
      </div>
    </>
  );
};
export default AudioPlayer;
