import express from "express";
import { addUser, getUsers, getUserById, updateUser } from "../controllers/usersController";

const router = express.Router();

router.post("/user", addUser);
router.get("/user", getUsers);
router.get("/user/:id", getUserById);
router.put("/user/:id", updateUser);


module.exports = {
  routes: router,
};
