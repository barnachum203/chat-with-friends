import express from "express";
import { sendMessage , getMessages} from "../controllers/messagesController";

const router = express.Router();

router.post("/message/:id", sendMessage);
router.get("/message/:id", getMessages);
// router.get("/channel", getAllChannels);
// router.delete("/channel/:id", removeChannel);
// router.put("/channel/:id", updateChannel);

module.exports = {
  routes: router,
};
