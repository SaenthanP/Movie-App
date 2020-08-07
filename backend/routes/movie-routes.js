const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

router.post('/get_search', async (req, res) => {
  const searchItem = req.body.movieTitle;
  const apiRes = await axios.get('https://api.themoviedb.org/3/search/movie?api_key=' + process.env.MOVIE_API_KEY + '&query=' + searchItem)
    .then(res => { return res });

  return res.json(apiRes.data.results);

});
let cachedData;
let cacheTime;
router.post('/get_popular_movies', async (req, res) => {
  var cacheTimeDifference=Date.now()-cacheTime;
  if (cacheTime && cacheTimeDifference<600000) {
    return res.json(cachedData);
  }
  const apiRes = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + process.env.MOVIE_API_KEY + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false')
    .then(res => { return res });

  cachedData = apiRes.data.results;
  cacheTime = Date.now();
  
  return res.json(apiRes.data.results);

});


router.post('/test', async (req, res) => {
  res.json("SAENTHAN UR AN ABOSULUTE CLOWN");
});




module.exports = router;