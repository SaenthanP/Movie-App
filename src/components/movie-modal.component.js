import React, { Component, useContext, useState, useEffect } from 'react';
import '../components/component.css';

import { Modal,Button} from 'react-bootstrap';

export default function MovieModal(props) {
    return (


        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        
         
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
           
          </Modal.Body>
          <Modal.Footer>
          <Button >Add to favourites</Button>

            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>

      );

}