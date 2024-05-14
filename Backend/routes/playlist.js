import express from "express";
import { getplaylist, playlist } from "../controller/playlist.js";

const router = express.Router();

router.get("/", playlist);
router.post("/getplaylist", getplaylist);

export default router;
