'use strict';
import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config';
import userRoutes from './routes/user-routes'

const app = express();

app.use(express.json());
app.use(cors);
//If you are using Express 4.16+ you can remove this line:
app.use(bodyParser.json())

app.use('/api', userRoutes.routes)

app.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});

//get all channels
app.get("/", (req, res) => {
  res.send(`a get request with / route on port ${config.port}`);
});

//get a specific channel
app.get("/chat/:id", (req, res) => {
    const id = Number(req.params.id);
    console.log(`requsted item with id: ${id}`);
    const item = data.filter((item) => item.id === id);
    res.send(item);
  });
  
  //create new channel 
  app.post("/chat", (req, res) => {
    res.send(`a post request with / route on port ${config.port}`);
  });
  

  //delete channel
  app.delete("/chat/:id", (req, res) => {
    res.send(`a delete request with / route on port ${config.port}`);
  });