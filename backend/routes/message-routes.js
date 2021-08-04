import express from "express";
import { sendMessage } from "../controllers/messagesController";

const router = express.Router();

router.post("/message/:id", sendMessage);
// router.get("/channel/:id", getChannelById);
// router.get("/channel", getAllChannels);
// router.delete("/channel/:id", removeChannel);
// router.put("/channel/:id", updateChannel);

module.exports = {
  routes: router,
};
