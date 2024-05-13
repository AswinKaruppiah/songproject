/* eslint-disable react/prop-types */
const ProgressBar = ({ progressBarRef, audioRef, timeProgress, duration }) => {
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  return (
    <div className="flex items-center w-full gap-2">
      <p className="text-custom_orange font-poppins_regular text-sm">
        {formatTime(timeProgress)}
      </p>
      <input
        type="range"
        ref={progressBarRef}
        defaultValue="0"
        onChange={handleProgressChange}
        className="focus:outline-none"
      />
      <p className="text-custom_orange font-poppins_regular text-sm">
        {formatTime(duration)}
      </p>
    </div>
  );
};

export default ProgressBar;
