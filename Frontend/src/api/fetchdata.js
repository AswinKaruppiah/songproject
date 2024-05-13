import axios from "axios";

export const fetchdata = async (id, query, setquery) => {
  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/playlist_tracks/",
    params: {
      id: id,
      offset: "0",
      limit: "100",
    },
    headers: {
      "X-RapidAPI-Key": "0bccf3a49cmshdb470e12fe5fc79p1492e7jsn48f4dd2b5763",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  try {
    const res = await axios.request(options);
    // console.log(res.data.items);
    res.data.items.map((item) => {
      query.push(
        item.track.name +
          " video song - " +
          item.track.artists.map((item) => {
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
