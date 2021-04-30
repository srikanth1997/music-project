const express = require("express");
// const router = express.Router()
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const axios = require("axios");

app.get("/search", async (req, res) => {
  const TERM = req.query.term;
  const MEDIA = req.query.media;
  const api_url = `https://itunes.apple.com/search?term=${TERM}&media=${MEDIA}`;
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  // console.log(json);
  res.json(json);
});

app.listen(3001, () => {
  console.log('Server is listening on localhost:3001');
});

