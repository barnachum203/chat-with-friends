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
// router.put("/channel/:id", updateChannel);
router.put("/channel/:cid", removeUserFromChannel);
router.put("/channel/:cid/:uid", addUserToChannel);

module.exports = {
  routes: router,
};
