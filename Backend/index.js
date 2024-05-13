import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Playlist from "./routes/playlist.js";
import mongoose from "mongoose";

const app = express();

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
  } catch (err) {
    console.log(err);
  }
};
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

//api
app.use(express.json());

//it allows us to relax the security applied to an API.
app.use(cors({ credentials: true, origin: true }));

app.use("/", Playlist);

app.listen(8800, async () => {
  await connect();
  console.log("sever start");
});
