/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useCallback, useContext } from "react";

// icons
import { IoIosPause } from "react-icons/io";
import { FaPlay, FaForward, FaBackward } from "react-icons/fa6";
import { FaFastBackward, FaFastForward } from "react-icons/fa";

import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from "react-icons/io";
import { StateContext } from "./context/State";

const Controls = ({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack,
  handleNext,
}) => {
  const { isPlaying, setIsPlaying } = useContext(StateContext);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  const skipForward = () => {
    audioRef.current.currentTime += 15;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 15;
  };

  const handlePrevious = () => {
    if (trackIndex === 0) {
      let lastTrackIndex = tracks.length - 1;
      setTrackIndex(lastTrackIndex);
      setCurrentTrack(tracks[lastTrackIndex]);
    } else {
      setTrackIndex((prev) => prev - 1);
      setCurrentTrack(tracks[trackIndex - 1]);
    }
  };

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  return (
    <div className="flex justify-between flex-wrap items-center p-6 ">
      <div className="flex justify-center gap-4  items-center">
        <button onClick={handlePrevious}>
          <FaFastBackward size={"1.5rem"} color="#ff6321" />
        </button>
        <button onClick={skipBackward}>
          <FaBackward size={"1.5rem"} color="#ff6321" />
        </button>

        <div className="cursor-pointer" onClick={togglePlayPause}>
          {isPlaying ? (
            <IoIosPause size={"4rem"} color="#ff6321" />
          ) : (
            <FaPlay size={"4rem"} color="#ff6321" />
          )}
        </div>
        <button onClick={skipForward}>
          <FaForward size={"1.5rem"} color="#ff6321" />
        </button>
        <button onClick={handleNext}>
          <FaFastForward size={"1.5rem"} color="#ff6321" />
        </button>
      </div>
      <div className="flex pt-7 gap-2 items-center">
        <button onClick={() => setMuteVolume((prev) => !prev)}>
          {muteVolume || volume < 5 ? (
            <IoMdVolumeOff size={"1.5rem"} color="#ff6321" />
          ) : volume < 40 ? (
            <IoMdVolumeLow size={"1.5rem"} color="#ff6321" />
          ) : (
            <IoMdVolumeHigh size={"1.5rem"} color="#ff6321" />
          )}
        </button>
        <input
          type="range"
          min={0}
          className="focus:outline-none"
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          style={{
            background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
          }}
        />
      </div>
    </div>
  );
};

export default Controls;
