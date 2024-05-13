/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const StateContext = createContext();

export const ShareState = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState();
  const [trackIndex, setTrackIndex] = useState(0);
  const [link, setlink] = useState("");
  const [loading, setloading] = useState(false);
  const [query, setquery] = useState([]);
  const [data, setData] = useState();
  const [inputerror, setinputerror] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <StateContext.Provider
      value={{
        link,
        setlink,
        loading,
        setloading,
        query,
        setquery,
        data,
        setData,
        inputerror,
        setinputerror,
        currentTrack,
        setCurrentTrack,
        trackIndex,
        setTrackIndex,
        isPlaying,
        setIsPlaying,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
