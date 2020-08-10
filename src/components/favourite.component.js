import React, { Component, useContext, useState, useEffect } from 'react';
import '../components/component.css';

import { Modal, Button,Table } from 'react-bootstrap';
import Axios from 'axios';
export default function FavouritePage(props) {
    const [favouriteMovies, setFavouriteMovies] = useState([]);

    useEffect(() => {
  
   
     readFavouriteMovies();
  
  
  
  
  
  
  
    },[]);
    const readFavouriteMovies = async () => {
        await Axios({
            method: 'get',
            url: 'http://localhost:5000/api/protected/favourites',
            headers: {
                'Authorization': localStorage.getItem('jwt'),
            }
        }).then(res => {

            setFavouriteMovies(res.data);
        });
    }
    const Movie = (props) => ((
        <tbody>
            <tr>

                <td key={props.movie._id}>{props.movie.title}</td>
                <td>"test</td>

                <td  >{<button type="button" className="delete-btn" > Click to Complete!</button>}</td>
            </tr>

        </tbody>
    ));

  return (
    <div className="container-fluid movie-page">

    <div className="container favourite">
    <Table className="favourite-table" striped bordered hover variant="dark">
        <thead>
            <tr>
                <th>Movie</th>
                <th>Description</th>
                <th>Remove from favourites</th>

            </tr>
        </thead>


        {favouriteMovies.map(currentMovie => <Movie movie={currentMovie} key={currentMovie._id} />)}

    </Table>
</div>
</div>
  );

}