import axios from "axios";
import ytdl from "ytdl-core";
import dotenv from "dotenv";
import AWS from "aws-sdk";
import ytschema from "../model/ytschema.js";

process.env.YTDL_NO_UPDATE = 1;

dotenv.config();
AWS.config.update({ region: "ap-southeast-2" });

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
});

export const uploadfile = async (params, item, index) => {
  return await s3
    .upload(params)
    .promise()
    .then(async (data) => {
      console.log(`${index}---------Successfully uploaded data------${item}`);
      return data;
    })
    .catch((err) => {
      console.log(`${index}--------err in AWS uploaded------${item}`);
      console.log(err);
      return { name: item, error: `err in AWS uploaded------${item}` };
    });
};

const api = async (item, index) => {
  var img;
  var ytid;

  return await axios
    .request(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.YT_APIKEY}&type=all&q=${item}&maxResults=1`
    )
    .then(async (res) => {
      try {
        const download = await ytdl(
          `https://youtu.be/${res.data.items[0].id.videoId}`,
          {
            format: "mp3",
            quality: "highestaudio",
          }
        );

        ytid = res.data.items[0].id.videoId;
        img = res.data.items[0].snippet.thumbnails;
        // console.log(download);
        return await uploadfile(
          {
            Body: download,
            Bucket: "spotsyncdb",
            Key: item,
            ContentType: "audio/mpeg",
            ACL: "public-read",
          },
          item,
          index
        )
          .then((result) => {
            if (result.error) {
              return {
                name: result.name,
                yt_id: ytid,
                img_url: [img],
                error: result.error,
              };
            } else {
              return {
                yt_id: ytid,
                name: result.Key,
                img_url: img,
                song_url: result.Location,
              };
            }
          })
          .catch((err) => {
            console.log(err, "test");
            console.log(`${index}--------err in AWS uploaded------${item}`);
            return {
              name: item,
              yt_id: ytid,
              img_url: [img],
              error: `err in Getting file------${item}`,
            };
          });
      } catch (error) {
        console.log("err in audio convention");
        return {
          name: item,
          yt_id: ytid,
          error: `err in audio convention-${item} `,
        };
      }
    })
    .catch((error) => {
      console.log("error in yt api");
      return { name: item, error: `error in yt api-${item}` };
    });
};

export const playlist = (req, res) => {
  res.send("hi");
};

export const getplaylist = async (req, res, next) => {
  try {
    const options = await Promise.all(
      req.body.data.map(async (item, index) => {
        const find = await ytschema.findOne({ name: item });
        if (find) {
          console.log(`------------already exist----------${item}-${index}`);
          return find;
        } else {
          return await api(item, index)
            .then(async (res) => {
              if (res.error) {
                return res;
              } else {
                const newsong = await new ytschema(res);
                const savedsong = await newsong.save();
                return savedsong;
              }
            })
            .catch((error) => {
              return error;
            });
        }
      })
    );
    res.status(200).json(options);
  } catch (error) {
    res.status(500).json(error);
  }
};
