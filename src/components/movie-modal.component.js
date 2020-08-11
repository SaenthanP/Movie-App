import React, { Component, useContext, useState, useEffect } from 'react';
import '../components/component.css';

import { Modal, Button, Card,Form } from 'react-bootstrap';
import Axios from 'axios';
export default function MovieModal(props) {
  const [isFavouriteMovieFound, setFavouriteMovie] = useState();
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState("");

  useEffect(() => {
    const ac = new AbortController();

    const isFavouriteFound = async () => {
      await Axios({
        method: 'post',
        url: 'http://localhost:5000/api/protected/isFavouriteFound',
        headers: {
          'Authorization': localStorage.getItem('jwt'),
  
  
        },
        data: {
          movieId: props.movie.id
        }
  
  
      }).then(res => {
        setFavouriteMovie(res.data);
      });
  
  
    }
    isFavouriteFound();
    //  getReviews();





    return () => ac.abort();
  });
  useEffect(() => {

    const ac = new AbortController();

    const getReviews = async () => {
      await Axios({
        method: 'get',
        url: 'http://localhost:5000/api/protected/reviews',
        headers: {
          'Authorization': localStorage.getItem('jwt'),
  
  
        }
  
  
      }).then(res => {
    
        setReviews(res.data);
      });
  
  
    }


getReviews();

return () => ac.abort();

  },[]);
  
  const getReviews = async () => {
    await Axios({
      method: 'get',
      url: 'http://localhost:5000/api/protected/reviews',
      headers: {
        'Authorization': localStorage.getItem('jwt'),


      }


    }).then(res => {
  
      setReviews(res.data);
    });


  }
  const handleFavourite = () => {
   
    
    if (isFavouriteMovieFound) {
      // console.log(isFavouriteFound()+" in if");
      return (
        <Button onClick={() => removeFavourite()}>Remove from Favourites</Button>

      );

    } else {

      return (
        <Button onClick={() => addFavourite()}>Add to Favourites</Button>


      );

    }
  }
  const addFavourite = async () => {

    await Axios({
      method: 'post',
      url: 'http://localhost:5000/api/protected/add',
      headers: {
        'Authorization': localStorage.getItem('jwt'),


      },
      data: {
        title: props.movie.title,
        movieId: props.movie.id,
        description: props.movie.overview,
        posterPath: props.movie.poster_path,
      }


    }).then(res => {
      handleFavourite();
      setFavouriteMovie(true);

    });
  }
  const removeFavourite = async () => {
    await Axios({
      method: 'delete',
      url: 'http://localhost:5000/api/protected/' + props.movie.id,
      headers: {
        'Authorization': localStorage.getItem('jwt'),


      },



    }).then(res => {
      setFavouriteMovie(false);
    });
  }
  const Reviews = (props) => {
    if (props.review.movieId == props.movie.id) {
      return (
      <Card key={props.review.key} className="review-card">
        <Card.Body>
          <div className="row">

            <div className="col-sm-12">
              <h6>{props.review.username}</h6>
            </div>
          </div>
          <div className="row">

            <div className="col-sm-12">
              <p>{props.review.review}</p>
            </div>
          </div>
        </Card.Body>
      </Card>);
    } else {
      return null;
    }
  }
const reviewCountUpdate=()=>{
  let count=0;
  for(var reviewIndex=0;reviewIndex<reviews.length;reviewIndex++){
    if(reviews[reviewIndex].movieId==props.movie.id){
      
      count++;
    }
  }
  return (  <label htmlFor="review"><b>{count} Review(s)</b></label>
  );
}
const onSubmit = async (e) => {

  try {
      e.preventDefault();
      e.target.reset();
      console.log(userReview);
      await Axios({
                method: 'post',
                url: 'http://localhost:5000/api/protected/addReview',
                headers: {
                    'Authorization': localStorage.getItem('jwt'),
  
  
                },
                data: {
                    "movieId":props.movie.id,
                    "review":userReview

                }
  
  
            }).then(res => {
              setReviews([...reviews, res.data]);
              setUserReview("");
            });
  
    
  } catch (err) {
      // err.response.data.Error && setError(err.response.data.Error);

  }
}
  return (


    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable={true}

    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.movie.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-sm-12 col-md-4">
            <img className="moviePoster movie-card" key={props.movie.key} src={props.movie.poster_path ? "https://image.tmdb.org/t/p/original" + props.movie.poster_path : require("../Assets/no_poster.jpg")} width="200px" height="300px"  ></img>
          </div>
          <div className="col-sm-12 col-md-8">
            <h4>Description</h4>
            <p>
              {props.movie.overview}
            </p>
          </div>

        </div>
       
        <form  onSubmit={onSubmit} className="form-review">
          <div className="form-group">
          { reviewCountUpdate()}

          <Form.Control as="textarea" rows="2" placeholder="Add a review" onChange={(e)=>setUserReview(e.target.value)}/>
          </div>
        
          <button className="btn btn-lg btn-primary btn-block text-uppercase review-btn" type="submit" disabled={userReview<1}>Post</button>

        </form>
        {/* {reviewCountUpdate()} */}
        {reviews.map(currentReview => <Reviews review={currentReview} key={currentReview._id} movie={props.movie} />)}

      </Modal.Body>
      <Modal.Footer>
        {handleFavourite()}

        {/* <FavouriteButton movie={props.movie} isFound={isFavouriteFound} /> */}

        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>

  );

}