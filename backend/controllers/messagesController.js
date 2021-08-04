import firebase from "../db";
import admin from "firebase-admin";

const firestore = firebase.firestore();

const sendMessage = async (req, res) => {
  //TODO: When user sends a message, we need to get that user id.
  /** 
   * Arguments:
   * Message, Uid, Time stamp.
  */
  const id = req.params.id;
  const data = req.body;
  const uid = data.uid; //Need to past uid of the user in the body.

  try {
    const channelRef = await firestore.collection("channels").doc(id);
    if (!channelRef.empty) {
      firestore.unionRes;
      await channelRef.update({
        messages: admin.firestore.FieldValue.arrayUnion(data),
      });
      res.send("Added message ");
    } else {
      res.send("Message Not added ");
    }
  } catch (err) {
    res.status(500).send("Somthing went wrong - " + err);
  }
};



module.exports = {
  sendMessage,
  // getMessages,
  // ,
  // removeChannel,
  // updateChannel,
};
