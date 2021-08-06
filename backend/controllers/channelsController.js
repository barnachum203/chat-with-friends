import firebase from "../db";
import Channel from "../models/channel";

const firestore = firebase.firestore();

const addChannel = async (req, res) => {
  try {
    const data = req.body;
    const channel = await firestore.collection("channels").add(data);
    res.send(`Channel record saved sucessfully: ${data.name}`);
  } catch (err) {
    res.send(500, "Something went wrong...");
  }
};

const getChannelById = async (req, res) => {
  try {
    const id = req.params.id;
    const channel = await firestore.collection("channels").doc(id).get();
    res.send(channel.data());
  } catch (err) {
    res.send(500, "Something went wrong - " + err);
  }
};

const getAllChannels = async (req, res) => {
  try {
    const channelCollection = firestore.collection("channels");
    const channel = await channelCollection.get();
    if (channel.empty) {
      res.send(200, "There is no channels to send");
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
    res.send(500, "Something went wrong - " + err);
  }
};

const removeChannel = async (req, res) => {
  try {
    const id = req.params.id;
    const channel = await firestore.collection("channels").doc(id).delete();
    res.send("Channel deleted successfully");
  } catch (err) {
    res.send(500, "Something went wrong - " + err);
  }
};

const updateChannel = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const channel = await firestore.collection("channels").doc(id).update(data);
    res.send(`updated successfully`);
  } catch (err) {
    res.send(500, "Something went wrong - " + err);
  }
};

module.exports = {
  addChannel,
  getChannelById,
  getAllChannels,
  removeChannel,
  updateChannel,
};
