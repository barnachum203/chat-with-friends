import firebase from "../db";
import User from "../models/user";

const firestore = firebase.firestore();

const addUser = async (req, res) => {
  try {
    const data = req.body;
    const user = await firestore.collection("users").doc(data.uid).set(data);
    res.send(`Record saved sucessfully: ${data.displayName}`);
  } catch (err) {
    res.send(500, "Something went wrong...");
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await firestore.collection("users");
    const data = await users.get();
    const usersArray = [];
    if (data.exists) {
      res.status(200).send("No user record found");
    } else {
      data.forEach((doc) => {
        const user = new User(
          doc.id,
          doc.data().email,
          doc.data().displayName,
          doc.data().photoURL
        );
        //   console.log(doc.id, "=>", doc.data());
        usersArray.push(user);
      });
      res.status(200).send(usersArray);
    }
  } catch (err) {
    res.status(500).send("Somethig went wrong - " + err);
    console.log(err);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await firestore.collection("users").doc(id).get();
    if (user.exists) {
      console.log("user sent");
      res.status(200).send(user.data());
    } else {
      res.status(500).send(`No user found with the id: ${id}`);
    }
  } catch (err) {
    res.status(500).send("Somethig went wrong - " + err);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    //Update user only if the user id === to collection id.
    if (id === data.uid) {
      const userRef = await firestore.collection("users").doc(id).update(data);
      res.send(`updated user: ${data}`);
    } else {
      res.send(`Cannot update user id: ${id}`);
    }
  } catch (err) {
    res.status(500).send("Somethig went wrong - " + err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userRef = await firestore.collection("users").doc(id).delete();
    res.send(`User deleted Successfully.`);
  } catch (err) {
    res.status(500).send("Somethig went wrong - " + err);
  }
};

module.exports = {
  addUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
