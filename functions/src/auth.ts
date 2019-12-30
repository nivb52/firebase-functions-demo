import * as functions from "firebase-functions";
import {db} from './admin.db'


export const createUserRecord = functions.auth
  .user()
  .onCreate((user, context) => {
    const userRef = db.doc(`users/${user.uid}`);

    userRef.set({
        name: user.displayName,
        createdAt: context.timestamp,
        gameCount: "0" 
    })
  });
