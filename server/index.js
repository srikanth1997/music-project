const express = require("express");
// const router = express.Router()
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const axios = require("axios");

app.get("/search", async (req, res, next) => {
  try {
    const TERM = req.query.term;
    const MEDIA = req.query.media;
    const api_url = `https://itunes.apple.com/search?term=${TERM}&media=${MEDIA}`;
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    res.json(json);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// api call with axios
// app.get("/search", async (req, res, next) => {
//   try {
//     const TERM = req.query.term;
//     const MEDIA = req.query.media;
//     const api_url = `https://itunes.apple.com/search?term=${TERM}&media=${MEDIA}`;
//     const axios_response = await axios.get(api_url, { params: { term: TERM, media: MEDIA } });
//     res.send(axios_response.data.results);
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });


app.listen(3001, () => {
  console.log("Server is listening on localhost:3001");
});
