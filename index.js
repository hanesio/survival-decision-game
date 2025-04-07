import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from 'cors';

import Single from "./models/Single.js";

const app = express();
dotenv.config();
app.use(bodyParser.json({ extended: true }));
app.use(cors());


app.get("/api/test", (req, res) => {
    res.send("Dies war ein HTTP Request")
});

const PORT = process.env.PORT || 6001; // wichtig dass der Port aus env kommt...warum auch immer


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log("Connected to backend"));
  })
  .catch((error) => console.log(`${error} did not connect`));


/* INSERT SINGLES*/
app.post('/api/singles/create', (req,res) => { // auf neuere ARt umstellen (async await)
    console.log(req.body); 
    Single.create(req.body).then(function(singledata){
        res.send(singledata)
    })
  });

  /* OUTPUT ROUTES */
app.get('/api/singles/find', async function(req,res) {
  const all = await Single.find();
  res.send(all);              
  });

  /* INTERACT ROUTES */
app.get('/api/singles/find/:id', async function(req,res) {
  try{
    var fetchid = req.params.id;
    var result = await Single.findOne({ '_id': fetchid }); 
  } catch(err) {
    result = err.message;
    console.error("Error Message:", result);
  }
  res.send(result);             
  });