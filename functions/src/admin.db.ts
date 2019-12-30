// initializeApp admin need only once !!
import * as admin from "firebase-admin";

// add cred
// // set GOOGLE_APPLICATION_CREDENTIALS= your_path in WIN
// // export GOOGLE_APPLICATION_CREDENTIALS=your_path in Linux
// const serviceAccount = require("./secrets/serviceAccountKey.json");

admin.initializeApp({
  // credential: admin.credential.cert(serviceAccount),
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://with-jeff.firebaseio.com"
});
export const db = admin.firestore();
