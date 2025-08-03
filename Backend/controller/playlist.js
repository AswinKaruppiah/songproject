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
  try {
    const data = await s3.upload(params).promise();
    console.log(`${index}---------Successfully uploaded data------${item}`);
    return data;
  } catch (err) {
    console.error(`${index}--------Error uploading to AWS------${item}`, err);
    return { name: item, error: `AWS upload failed: ${err.message}` };
  }
};

const api = async (item, index) => {
  let img, ytid;

  try {
    const res = await axios.request(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.YT_APIKEY}&type=all&q=${item}&maxResults=1`
    );

    if (!res.data.items.length) {
      throw new Error(`No results found for ${item}`);
    }

    ytid = res.data.items[0].id.videoId;
    img = res.data.items[0].snippet.thumbnails;

    let download;
    try {
      download = await ytdl(`https://youtu.be/${ytid}`, {
        format: "mp3",
        quality: "highestaudio",
      });
    } catch (error) {
      console.error(
        `${index}--------Error in audio conversion------${item}`,
        error
      );
      return {
        name: item,
        yt_id: ytid,
        error: `Audio conversion failed: ${error.message}`,
      };
    }

    const uploadResult = await uploadfile(
      {
        Body: download,
        Bucket: "spotsyncdb",
        Key: item,
        ContentType: "audio/mpeg",
        ACL: "public-read",
      },
      item,
      index
    );

    if (uploadResult.error) {
      return {
        name: uploadResult.name,
        yt_id: ytid,
        img_url: [img],
        error: uploadResult.error,
      };
    } else {
      return {
        yt_id: ytid,
        name: uploadResult.Key,
        img_url: img,
        song_url: uploadResult.Location,
      };
    }
  } catch (error) {
    console.error(
      `${index}--------Error fetching YouTube data------${item}`,
      error
    );
    return { name: item, error: `YouTube API failed: ${error.message}` };
  }
};

export const playlist = (req, res) => {
  res.send("hi");
};

export const getplaylist = async (req, res, next) => {
  try {
    const data = req.body?.data;
    if (!Array.isArray(data) || !data.length) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    const results = await Promise.all(
      data.map(async (item, index) => {
        try {
          const existing = await ytschema.findOne({ name: item });
          if (existing) {
            console.log(`------------Already exists----------${item}-${index}`);
            return existing;
          } else {
            const fetched = await api(item, index);
            if (fetched.error) {
              return fetched;
            }

            const newsong = new ytschema(fetched);
            const saved = await newsong.save();
            return saved;
          }
        } catch (innerErr) {
          console.error(
            `${index}--------Unexpected error processing item------${item}`,
            innerErr
          );
          return {
            name: item,
            error: `Processing failed: ${innerErr.message}`,
          };
        }
      })
    );

    res.status(200).json(results);
  } catch (outerErr) {
    console.error(
      "--------Unexpected error in getplaylist handler--------",
      outerErr
    );
    res.status(500).json({ error: `Server error: ${outerErr.message}` });
  }
};
