import express from "express";
import {
  addChannel,
  getChannelById,
  getAllChannels,
  removeChannel,
  updateChannel,
  removeUserFromChannel,
  addUserToChannel
} from "../controllers/channelsController";

const router = express.Router();

router.post("/channel", addChannel);
router.get("/channel/:id", getChannelById);
router.get("/channel", getAllChannels);
router.delete("/channel/:id", removeChannel);
router.put("/channel/:id", updateChannel);
router.delete("/channel/:cid/:uid", removeUserFromChannel);
router.post("/channel/:cid/:uid", addUserToChannel);

module.exports = {
  routes: router,
};
