import express from "express";
import {
  addUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/usersController";

const router = express.Router();

router.post("/user", addUser);
router.get("/user", getUsers);
router.get("/user/:id", getUserById);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

module.exports = {
  routes: router,
};
