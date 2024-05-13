import { useContext } from "react";
import { StateContext } from "./context/State";

import { fetchdata } from "../api/fetchdata";
import axios from "axios";

function Input() {
  const {
    link,
    setlink,
    loading,
    setloading,
    query,
    setquery,
    setData,
    inputerror,
    setinputerror,
    setCurrentTrack,
    setTrackIndex,
  } = useContext(StateContext);

  const split_link = async () => {
    setData();
    setinputerror();
    if (link) {
      var sp_link = link.split("/");
      setlink("");
      if (sp_link[4]) {
        sp_link = sp_link[4].split("?");
        setloading(true);
        await fetchdata(sp_link[0], query, setquery)
          .then(async (res) => {
            if (res?.status === 404) {
              setloading(false);
              return setinputerror({
                error:
                  "Spotify API Error (or) Unable to get Playlist (or) check your internet connection",
              });
            } else {
              await axios
                .post("https://songproject-6osu.onrender.com/getplaylist", {
                  data: query,
                })
                .then((response) => {
                  setquery([]);
                  console.log(response.data);
                  setCurrentTrack(response.data[0]);
                  setTrackIndex(0);
                  setData(response.data);

                  setloading(false);
                })
                .catch((err) => {
                  setquery([]);
                  console.error(err);
                  return setinputerror({
                    error: "Sever Isn't Answering.",
                  });
                });
            }
          })
          .catch((err) => {
            setquery([]);
            console.error(err);
            return setinputerror({
              error: "Spotify API Error",
            });
          });
      } else {
        return setinputerror({
          error: "Replace the correct URL here.",
        });
      }
    } else {
      return setinputerror({
        error: "Enter the URL , please.",
      });
    }
  };

  return (
    <div className="flex h-screen justify-center items-center flex-col">
      <h1 className="text-5xl sm:text-7xl text-center  pb-8 text-custom_orange font-poppins_medium">
        Paste Your playlist <br /> Link
      </h1>

      <input
        type="url"
        placeholder="Spotify Playlist Url"
        value={link}
        className={`px-7 sm:w-1/2 w-full py-3  rounded-3xl mt-5 mb-10 focus:outline-none border-custom_orange  border-2 bg-transparent text-white `}
        onChange={(e) => setlink(e.target.value)}
      />

      {/* <button
        className={`px-7 ${
          loading ? "sm:w-1/4 w-2/5" : "w-40 bg-custom_orange"
        }   duration-500 font-poppins_light text-white px-7 py-3 rounded-3xl sm:mx-4 hover:bg-orange-700 `}
        onClick={() => (loading ? null : split_link())}
      > */}
      {!loading && (
        <button
          className=" duration-500 bg-custom_orange  font-poppins_light text-white px-7 py-3 rounded-3xl sm:mx-4 hover:bg-orange-700 "
          onClick={() => (loading ? null : split_link())}
        >
          Import Playlist
          {/* {loading ? <div className="loader-line w-full" /> : "Import Playlist"} */}
        </button>
      )}

      {loading && (
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-3xl sm:text-5xl  text-center  pb-8 text-orange-50 font-poppins_regular">
            Importing your songs
          </h1>
          <div className="loader-line w-[80%] sm:w-2/3" />
        </div>
      )}

      {inputerror && (
        <h1 className="pt-3 px-4 font-poppins_regular text-lg text-red-600">
          {inputerror.error}
        </h1>
      )}
    </div>
  );
}

export default Input;
