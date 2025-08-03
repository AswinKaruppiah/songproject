import axios from "axios";

export const fetchdata = async (id, query, setquery) => {
  const options = {
    method: "GET",
    url: "https://spotify-downloader9.p.rapidapi.com/playlistTracks",
    params: {
      id: id,
      limit: "50",
      offset: "0",
    },
    headers: {
      "x-rapidapi-key": "0bccf3a49cmshdb470e12fe5fc79p1492e7jsn48f4dd2b5763",
      "x-rapidapi-host": "spotify-downloader9.p.rapidapi.com",
    },
  };

  try {
    const res = await axios.request(options);
    // console.log(res?.data?.data?.items);

    res?.data?.data?.items?.map((item) => {
      query.push(
        item.album.name +
          " video song - " +
          item.album.artists.map((item) => {
            return item?.name;
          })
      );
    });

    // console.log(query);
  } catch (error) {
    console.log(error);
    setquery([]);

    return {
      status: 404,
      error: error,
    };
  }
};
