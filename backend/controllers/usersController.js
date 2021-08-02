import firebase from "../db";
import User from "../models/user";

const firestore = firebase.firestore();

const addUser = async (req, res, next) => {
  if (!err) {
    const data = req.body;
    const user = await firestore.collection("users").doc().set(data);
    res.send(`Record saved sucessfully: ${user}`);
  } else {
    res.send(500, "Something went wrong...");
  }
};

module.exports = {
  addUser,
};
