const router = require('express').Router();
let User = require('../models/user.model');
let Movie = require('../models/movie.model');
let Review = require('../models/review.model');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');



router.get('/getUserId', async (req, res) => {
  
  return res.json(req.user._id);

});



//Gets movies searched by user input
router.post('/get_search', async (req, res) => {
  const searchItem = req.body.movieTitle;
  const searchPageNumber=req.body.searchPageNumber;
  const apiRes = await axios.get('https://api.themoviedb.org/3/search/movie?api_key=' + process.env.MOVIE_API_KEY + '&query=' + searchItem+'&page='+searchPageNumber)
    .then(res => { return res });

  return res.json(apiRes.data.results);

});


//Gets most popular movies

// let cachedData;
// let cacheTime;
router.post('/get_popular_movies', async (req, res) => {
  let {pageNumber}=req.body;
  // console.log(pageNumber);
  // var cacheTimeDifference = Date.now() - cacheTime;
  // if (cacheTime && cacheTimeDifference < 600000) {
  //   return res.json(cachedData);
  // }
  const apiRes = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + process.env.MOVIE_API_KEY + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page='+pageNumber)
    .then(res => { return res });

  // cachedData = apiRes.data.results;
  // cacheTime = Date.now();

  return res.json(apiRes.data.results);

});

//handles favourite movies
router.get('/favourites', async (req, res) => {
  const favourites = await Movie.find({ userId: req.user._id });
  return res.json(favourites);
});

router.post('/add', async (req, res) => {
  let { title, movieId,description,posterPath } = req.body;


  const isTaken = await Movie.findOne({ movieId: movieId, userId: req.user._id });
  if (isTaken) {
    return res.status(400).json({ Error: "Movie already added" });
  }
  const newMovie = new Movie({
    title,
    movieId,
    userId: req.user._id,
    description,
    posterPath
  });
  newMovie.save()
    .then(movie => res.json(movie))
    .catch(err => res.status(400).json({ Error: err }));
});

router.delete('/:id', async (req, res) => {
  const movieToDelete = await Movie.findOne({ userId: req.user._id, movieId: req.params.id });

  if (!movieToDelete) {
    return res.status(400).json({ Error: "Movie not found" });
  }
  const deletedMovie = await Movie.findByIdAndDelete(movieToDelete._id);
  const movies = await Movie.find({ userId: req.user._id });
  return res.json(movies);
});

router.post('/isFavouriteFound', async (req, res) => {
  
  let { movieId } = req.body;


  const isTaken = await Movie.findOne({ movieId: movieId, userId: req.user._id });
  if (isTaken) {
    return res.json(true);
  }
  return res.json(false);
});

//Handles reviews

router.get('/reviews', async (req, res) => {
  const reviews = await Review.find({});
  return res.json(reviews);

});

router.post('/addReview', async (req, res) => {
  let { movieId,review } = req.body;


  if (review.length<=0) {
    return res.status(400).json({ Error: "Empty review" });
  }

  const newReview = new Review({
    username:req.user.username,
    userId:req.user._id,
    movieId,
    review,
    date:Date.now(),
  });
  newReview.save()
    .then(review => res.json(review))
    .catch(err => res.status(400).json({ Error: err }));
});

router.delete('/delete_review/:id', async (req, res) => {
  const reviewToDelete = await Review.findOne({ _id: req.params.id });

  if (!reviewToDelete) {
    return res.status(400).json({ Error: "review not found" });
  }
  const deletedReview = await Review.findByIdAndDelete(reviewToDelete._id);
  const reviews = await Review.find({ });
  return res.json(reviews);
});

router.post('/test', async (req, res) => {
  res.json(req.user._id);
});




module.exports = router;