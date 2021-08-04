import express from "express";
import {
  addChannel,
  getChannelById,
  getAllChannels,
  removeChannel,
  updateChannel,
} from "../controllers/channelsController";

const router = express.Router();

router.post("/channel", addChannel);
router.get("/channel/:id", getChannelById);
router.get("/channel", getAllChannels);
router.delete("/channel/:id", removeChannel);
router.put("/channel/:id", updateChannel);

module.exports = {
  routes: router,
};
