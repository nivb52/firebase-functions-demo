import * as functions from "firebase-functions";
import { db } from "./admin.db";

export const gameCount = functions.firestore
  .document(`games/{gameId}`)
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data();
    if (!data) return;
    const userRef = db.doc(`users/${data.uid}`);

    const userSnap = await userRef.get();
    const userData = userSnap.data();

    const isGameCount = userData ? userData.gameCount : false;
    // @ts-ignore   // in case no gameCount key
    const gameCount = isGameCount ? userData.gameCount + 1 : 1;

    //no games
    if (!gameCount) {
      console.log(gameCount, " first match count");
      return userRef.create({
        gameCount
      });
    }

    return userRef.update({
      gameCount
    });
  });


export const userTrend = functions.firestore
.document('games/{gameId}')
.onUpdate( (snapshot, context) => {
    const before = snapshot.before.data()
    const after = snapshot.after.data()
    if (!before || !after) return

    let trend

    if (after.score >= before.score) trend = 'you are improving :)'
    else trend = 'practice make perfect, keep on going :)'

    const userRef = db.doc(`users/${after.uid}`)
    return userRef.update({
        trend
    })
})
