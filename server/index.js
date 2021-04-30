const express = require("express");
// const router = express.Router()
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const axios = require("axios");

app.get("/search", async (req, res) => {
  const TERM = req.query.term;
  const MEDIA = req.query.media;
  // console.log(TERM);
  // console.log(MEDIA);
  const api_url = `https://itunes.apple.com/search?term=${TERM}&media=${MEDIA}`;
  const fetch_response = await fetch(api_url);
  // console.log("is here");
  // console.log(fetch_response);
  const json = await fetch_response.json();
  // console.log(json);
  res.json(json);
});

app.listen(3001, () => {
  console.log('Server is listening on localhost:3001');
});

// // const url = "https://restcountries.eu/rest/v2/name/brazil";
// const url = "https://itunes.apple.com/lookup?id=909253&entity=album";

// // router.get('/', function(request, response){

// // });
// axios.get(url).then(response =>{

// })

// module.exports = router;
