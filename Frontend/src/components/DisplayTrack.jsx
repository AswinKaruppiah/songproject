/* eslint-disable react/prop-types */
import { BsMusicNoteBeamed } from "react-icons/bs";

const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  handleNext,
}) => {
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  return (
    <div className="flex flex-col w-full  justify-start items-start">
      {currentTrack?.song_url && (
        <audio
          src={currentTrack?.song_url}
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={handleNext}
        />
      )}

      {currentTrack?.img_url ? (
        <img
          src={
            currentTrack?.img_url[0].high?.url ||
            currentTrack?.img_url[0].default?.url ||
            currentTrack?.img_url[0].medium?.url
          }
          alt="audio avatar"
          className="h-80 w-full md:w-[65%] object-fill  rounded-2xl"
        />
      ) : (
        <div className="flex justify-center items-center w-full py-4 h-full">
          <span className="text-7xl bg-[#989898] p-3 rounded-full">
            <BsMusicNoteBeamed />
          </span>
        </div>
      )}
      <h1 className="text-custom_orange text-2xl py-4 font-poppins_medium tracking-wide">
        {currentTrack?.error
          ? currentTrack?.error
          : currentTrack.name.replace("video song", "")}
      </h1>
    </div>
  );
};
export default DisplayTrack;
