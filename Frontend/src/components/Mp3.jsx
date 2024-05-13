/* eslint-disable react/prop-types */
import { useRef } from "react";
import AudioPlayer from "./AudioPlayer";
import { List } from "./List";

function Mp3({ data }) {
  const ref = useRef(null);
  const handleClick = () => {
    ref.current?.scrollIntoView();
  };
  return (
    <div ref={ref} className="grid lg:grid-cols-3 gap-4 w-full sm:p-5 pt-5 ">
      <div className="lg:col-span-2">
        <AudioPlayer tracks={data} />
      </div>

      <List data={data} handleClick={handleClick} />
    </div>
  );
}

export default Mp3;
