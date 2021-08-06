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
    const channelRef = firestore.collection("channels").doc(id);
    if (!channelRef.empty) {
      firestore.unionRes;
      await channelRef.update({
        messages: admin.firestore.FieldValue.arrayUnion(data),
      });
      console.log(`Message has been sent.`);
      res.status(200).send({message: 'Success!'});
    } else {
      console.log(`Message has not sent.`);

      res.status(500).send("Message has not sent.");
    }
  } catch (err) {
    console.log(`err:` +err);
    res.status(500).send("Somthing went wrong - " + err);
  }
};

const getMessages = async (req, res) => {
  const id = req.params.id;
const channelRef = firestore.collection("channels").doc(id);

const observer = await channelRef.onSnapshot(snapshot => {
 console.log(`changes: ${snapshot}`);
 res.send(snapshot)
}, err => {
 console.log(`Error: ${err}`);
 res.send(err)

});

};


module.exports = {
  sendMessage,
  getMessages,
  // ,
  // removeChannel,
  // updateChannel,
};
