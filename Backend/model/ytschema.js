import mongoose from "mongoose";

const YtSchema = new mongoose.Schema(
  {
    yt_id: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    img_url: {
      type: [Object],
      required: false,
    },
    song_url: {
      type: String,
      required: false,
    },
    error: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Yt", YtSchema);
