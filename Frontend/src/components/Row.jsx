/* eslint-disable react/prop-types */
import { useState } from "react";
import Mp3 from "./Mp3";
import Mp4 from "./Mp4";

export const Row = ({ data }) => {
  const [boolean, setboolean] = useState(true);

  return (
    <div className=" p-[1.5%]">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => {
            setboolean(true);
          }}
          className={`font-poppins_regular text-sm font-semibold  tracking-wide  ${
            boolean ? "bg-custom_orange" : "bg-white text-custom_orange"
          } rounded-3xl px-5 py-2 duration-300  `}
        >
          Mp3/Audio
        </button>
        <button
          onClick={() => {
            setboolean(false);
          }}
          className={`font-poppins_regular ${
            boolean ? "bg-white text-custom_orange" : "bg-custom_orange"
          } text-sm font-semibold  tracking-wide  rounded-3xl px-4 py-1.5 duration-300 `}
        >
          Mp4/Video
        </button>
      </div>
      {boolean ? <Mp3 data={data} /> : <Mp4 data={data} />}
    </div>
  );
};
