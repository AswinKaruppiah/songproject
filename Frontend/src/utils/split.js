import axios from "axios";
import { fetchdata } from "../api/fetchdata";

export const split_link = async (
  link,
  setlink,
  setloading,
  query,
  setquery,
  setData
) => {
  setloading(true);
  var sp_link = link.split("/");
  sp_link = sp_link[4].split("?");

  // setlink("");

  await fetchdata(sp_link[0], query, setquery)
    .then(async () => {
      await axios
        .post("http://localhost:8800/getplaylist", {
          data: query,
        })
        .then((response) => {
          setquery([]);
          setData(response.data);
          setloading(false);
        })
        .catch((err) => {
          setquery([]);
          console.error(err);
        });
    })
    .catch((err) => {
      setquery([]);
      console.error(err);
    });
};
