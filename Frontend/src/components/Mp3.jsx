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
    <div ref={ref} className="grid lg:grid-cols-6 gap-4 w-full sm:p-5 pt-5 ">
      <div className="lg:col-start-1 col-span-4">
        {data[0].error ? null : <AudioPlayer tracks={data} />}
      </div>
      <div className="lg:col-start-5 col-span-6">
        <List data={data} handleClick={handleClick} />
      </div>
    </div>
  );
}

export default Mp3;
