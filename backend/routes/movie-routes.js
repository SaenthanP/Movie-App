const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

router.post('/get_search', async (req, res) => {
  const searchItem = req.body.movieTitle;
  // var test='https://api.themoviedb.org/3/search/keyword?api_key='+process.env.MOVIE_API_KEY+'&query='+searchItem
  const apiRes = await axios.get('https://api.themoviedb.org/3/search/movie?api_key=' + process.env.MOVIE_API_KEY + '&query=' + searchItem)
  .then(res=>{return res});


  //  console.log(apiRes.data);
  res.json(apiRes.data.results);

});

router.post('/get_popular_movies', async (req, res) => {

  const apiRes = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + process.env.MOVIE_API_KEY + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false')
  .then(res=>{return res});


  //  console.log(apiRes.data);
  res.json(apiRes.data.results);

});





module.exports = router;