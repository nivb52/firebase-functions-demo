import * as functions from "firebase-functions";
const cors = require("cors");


// basic exampels
export const basicHTTP = functions.https.onRequest((req, res) => {
  res.send(" Hello from Firebase !");
});

// in the end of the address add :
// ?name=firstname to end of the function for checking
// usually we will use with id (for retrive document/collection)
export const basicPARAMS = functions.https.onRequest((req, res) => {
  const name = req.query.name;
  if (!name) res.status(400).send("ERROR You must supply a name :(");

  res.send(`hello ${name}`);
});

// MORE EXAMPELS
// USING EXPRESS JS
import * as express from "express";

const app = express();

app.use(cors({ origin: true }));

// Custom Middleware
const logger = (req: any, res: any, next: any) => {
  console.log(req._parsedUrl.href);
  next();
};
//use Custom Middleware
app.use(logger);


// ROUTES: 
app.get("/puki", (req, res) => {
  res.send("Hello Puki");
});
app.get("/muki", (req, res) => {
  res.send("Go get Puki");
});
app.get("/old", (req, res) => {
  res.send("This Is Our Old Website");
});

export const api = functions.https.onRequest(app);