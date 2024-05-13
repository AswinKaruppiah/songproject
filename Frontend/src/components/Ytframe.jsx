/* eslint-disable react/prop-types */
import { useState } from "react";

function Ytframe({ id }) {
  const [loadingiframe, setloadingiframe] = useState(true);
  return (
    <>
      {loadingiframe && (
        <div className="absolute h-full flex justify-center items-center w-full">
          <div className="loader-line w-3/5 " />
        </div>
      )}
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        frameBorder="0"
        loading="eager"
        onLoad={() => setloadingiframe(false)}
        className={`aspect-video w-80 rounded-2xl`}
      />
    </>
  );
}

export default Ytframe;
