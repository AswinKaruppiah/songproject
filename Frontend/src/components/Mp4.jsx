/* eslint-disable react/prop-types */
// import { Suspense, lazy } from "react";
import { useRef, useState } from "react";

import { FaPlay } from "react-icons/fa6";

// const Ytiframe = lazy(() => import("./Ytiframe"));

function Mp4({ data }) {
  const ref = useRef(null);
  const [yt_id, setyt_id] = useState(data[0].yt_id);
  const [loadingiframe, setloadingiframe] = useState(true);
  const handleClick = () => {
    ref.current?.scrollIntoView();
  };

  return (
    <section
      ref={ref}
      className=" grid lg:grid-cols-3 gap-4 w-full sm:p-5 pt-5 "
    >
      <div className="relative lg:col-span-2">
        {loadingiframe && (
          <div className=" absolute  h-full flex z-10  bg-black justify-center items-center w-full rounded-2xl ">
            <div className="loader-line w-3/5 " />
          </div>
        )}
        <iframe
          src={`https://www.youtube.com/embed/${yt_id}`}
          loading="eager"
          frameBorder="0"
          allowFullScreen
          onLoad={() => setloadingiframe(false)}
          className={` aspect-video w-full rounded-2xl`}
        />
      </div>
      <div>
        {data &&
          data.map((item, index) => (
            <div
              key={index}
              className={`flex gap-4 py-2  justify-start items-center cursor-pointer transition-all duration-150 px-3 rounded-lg ${
                yt_id === item.yt_id && "bg-[#363333]"
              } hover:bg-[#363333]`}
            >
              <div
                key={index}
                onClick={() => {
                  setyt_id(item.yt_id);
                  handleClick();
                }}
                className="flex gap-4 py-2  justify-start items-center cursor-pointer "
              >
                {yt_id === item.yt_id ? (
                  <FaPlay color="#ff6321" />
                ) : (
                  <h3 className="font-poppins_light text-gray-300">
                    {index + 1}
                  </h3>
                )}

                <h1
                  className={`font-poppins_regular ${
                    yt_id === item.yt_id ? "text-custom_orange" : "text-white"
                  } `}
                >
                  {item.name.replace("video song", "")}
                </h1>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default Mp4;
