import admin from "firebase-admin";
import serviceAccount from './credentials.json'

const db =  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log("connected to DB");


module.exports = db;
