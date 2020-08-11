import React, { Component, useContext, useState, useEffect } from 'react';
import '../components/component.css';

import { Modal, Button,Card } from 'react-bootstrap';
import Axios from 'axios';
export default function MovieModal(props) {
  const [isFavouriteMovieFound, setFavouriteMovie] = useState();

  useEffect(() => {

 
    isFavouriteFound();







  });
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
const handleFavourite=()=>{
  
if(isFavouriteMovieFound){
  // console.log(isFavouriteFound()+" in if");
  return (
      <Button onClick={()=>removeFavourite()}>Remove from Favourites</Button>

  );

}else{
  
  return (
      <Button onClick={()=>addFavourite()}>Add to Favourites</Button>


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
      description:props.movie.overview,
      posterPath:props.movie.poster_path,
    }


  }).then(res => {
    handleFavourite();
  setFavouriteMovie(true);

  });
}
const removeFavourite = async () => {
  await Axios({
    method: 'delete',
    url: 'http://localhost:5000/api/protected/'+props.movie.id,
    headers: {
      'Authorization': localStorage.getItem('jwt'),


    },



  }).then(res => {
    setFavouriteMovie(false);
  });
}
const reviews = (props) => ((
  <Card className="review-card">
      <Card.Body>
      <div className="row">
        <div className="col-sm-12">

        </div>
        <div className="col-sm-12">
          
        </div>
      </div>
      </Card.Body>
  </Card>

));
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
        <div className="row">
          <div className="col-sm-12">
           
          </div>

        </div>
       
      </Modal.Body>
      <Modal.Footer>
        {handleFavourite()}

        {/* <FavouriteButton movie={props.movie} isFound={isFavouriteFound} /> */}

        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>

  );

}