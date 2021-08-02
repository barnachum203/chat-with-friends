import express from "express";
import { addUser } from "../controllers/usersController";

const router = express.Router();

router.post("/user", addUser);

module.exports = {
  routes: router,
};
