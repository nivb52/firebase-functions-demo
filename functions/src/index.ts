// import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });



export {basicHTTP, basicPARAMS, api} from './http'
export {createUserRecord} from './auth'
export { gameCount, userTrend } from './firestore'
