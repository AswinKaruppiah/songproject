/* eslint-disable react/prop-types */
import { useContext } from "react";
import { StateContext } from "./context/State";
import { IoIosPause } from "react-icons/io";
import { FaPlay } from "react-icons/fa6";

export const List = ({ data, handleClick }) => {
  const {
    isPlaying,
    setIsPlaying,
    trackIndex,
    setCurrentTrack,
    setTrackIndex,
  } = useContext(StateContext);
  return (
    <div>
      {data.map((item, index) => (
        <div
          key={index}
          className={`flex gap-4 py-2  justify-start items-center cursor-pointer transition-all duration-150 px-3 rounded-lg ${
            trackIndex === index && "bg-[#363333]"
          } hover:bg-[#363333]`}
          onClick={() => {
            setCurrentTrack(data[index]);
            setTrackIndex(index);
            handleClick();
          }}
        >
          {trackIndex === index ? (
            isPlaying ? (
              <IoIosPause
                onClick={() => {
                  setIsPlaying((prev) => !prev);
                }}
                color="#ff6321"
                size={"1.3rem"}
              />
            ) : (
              <FaPlay
                onClick={() => {
                  setIsPlaying((prev) => !prev);
                }}
                color="#ff6321"
              />
            )
          ) : (
            <h3 className="font-poppins_light text-gray-300">{index + 1}</h3>
          )}

          <h1
            className={`font-poppins_regular ${
              trackIndex === index ? "text-custom_orange" : "text-white"
            } `}
          >
            {item.name.replace("video song", "")}
          </h1>
        </div>
      ))}
    </div>
  );
};
