import firebase from "../db";
import Channel from "../models/channel";
import admin from "firebase-admin";

const firestore = firebase.firestore();

const addChannel = async (req, res) => {
  try {
    const data = req.body;
    const channel = await firestore.collection("channels").add(data);
    res.send(`Channel record saved sucessfully: ${data.name}`);
  } catch (err) {
    res.status(500).send("Something went wrong...");
  }
};

const getChannelById = async (req, res) => {
  try {
    const id = req.params.id;
    const channel = await firestore.collection("channels").doc(id).get();
    res.send(channel.data());
  } catch (err) {
    res.status(500).send("Something went wrong - " + err);
  }
};

const getAllChannels = async (req, res) => {
  try {
    const channelCollection = firestore.collection("channels");
    const channel = await channelCollection.get();
    if (channel.empty) {
      res.status(200).send("There is no channels to send");
    } else {
      const channels = [];
      channel.forEach((doc) => {
        const channel = new Channel(
          doc.id,
          doc.data().name,
          doc.data().pass,
          doc.data().messages
        );
        channels.push(channel);
      });
      res.send(channels);
    }
  } catch (err) {
    res.status(500).send("Something went wrong - " + err);
  }
};

const removeChannel = async (req, res) => {
  try {
    const cid = req.params.cid;
    const uid = req.params.uid;
    const channelRef = firestore.collection("channels").doc(cid);
    const channel = await channelRef.get();
    const user = await firestore.collection("users").doc(uid).get()
    if(channel.data().creatorId == user.data().uid){
      channelRef.delete()
    }
    res.send("Channel deleted successfully");
  } catch (err) {
    res.status(500).send("Something went wrong - " + err);
  }
};

//Unused
const updateChannel = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const channel = await firestore.collection("channels").doc(id).update(data);
    res.send(`updated successfully`);
  } catch (err) {
    res.status(500).send("Something went wrong - " + err);
  }
};

const removeUserFromChannel = async (req, res) => {
  try {
    const cid = req.params.cid;
    const uid = req.body.uid;
    const channelRef = firestore.collection("channels").doc(cid);
    const user = await firestore.collection("users").doc(uid).get();
    await channelRef.update({
      users: admin.firestore.FieldValue.arrayRemove(user.data().displayName),
    });
    console.log(
      `removed user: ${user.data().displayName} from: ${cid} successfully`
    );
    res.status(200).send(`removed successfully`);
  } catch (error) {
    console.log("Something went wrong - " + error);
    res.status(500).send("Something went wrong - " + error);
  }
};

const addUserToChannel = async (req, res) => {
  try {
    const cid = req.params.cid;
    const uid = req.params.uid;
    const channelRef = firestore.collection("channels").doc(cid);
    const user = await firestore.collection("users").doc(uid).get();
    await channelRef.update({
      users: admin.firestore.FieldValue.arrayUnion(user.data().displayName),
    });
    console.log(
      `added user: ${user.data().displayName} to: ${cid} successfully`
    );
    res.status(200).send(`removed successfully`);
  } catch (error) {
    console.log("Something went wrong - " + error);
    res.status(500).send("Something went wrong - " + error);
  }
};

module.exports = {
  addChannel,
  getChannelById,
  getAllChannels,
  removeChannel,
  updateChannel,
  removeUserFromChannel,
  addUserToChannel,
};
