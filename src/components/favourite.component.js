import React, { Component, useContext, useState, useEffect } from 'react';
import '../components/component.css';

import { Modal, Button, Table, Card } from 'react-bootstrap';
import Axios from 'axios';
export default function FavouritePage(props) {
    const [favouriteMovies, setFavouriteMovies] = useState([]);

    useEffect(() => {


        readFavouriteMovies();







    }, []);
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
    const removeFavourite = async (id) => {
        await Axios({
          method: 'delete',
          url: 'http://localhost:5000/api/protected/'+id,
          headers: {
            'Authorization': localStorage.getItem('jwt'),
      
      
          },
      
      
      
        }).then(res => {
          setFavouriteMovies(res.data);
        });
      }
    const Movie = (props) => ((
        <Card className="favourite-card">
            <Card.Body>
                <div className="row">
                    <div className="col-sm-3">
                        <img className="moviePoster movie-card" key={props.movie.key} src={props.movie.posterPath ? "https://image.tmdb.org/t/p/original" + props.movie.posterPath : require("../Assets/no_poster.jpg")} width="210px" height="310px"  ></img>
                        <div className="row">
                            <div className="col-sm-12">
                                <p><b>{props.movie.title}</b></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <p>{props.movie.description}</p>
                    </div>
                    <div className="col-sm-2">
                        <button onClick={()=>{removeFavourite(props.movie.movieId)}}>Remove</button>
                    </div>
                </div>
            </Card.Body>
        </Card>

        // <tbody>
        //     <tr>

        //         <td key={props.movie._id}>{props.movie.title}</td>
        //         <td>{props.movie.description}</td>

        //         <td  >{<button type="button" className="delete-btn" > Click to Complete!</button>}</td>
        //     </tr>

        // </tbody>
    ));

    return (
        <div className="container-fluid movie-page">

            <div className="container-fluid favourite">
                {favouriteMovies.map(currentMovie => <Movie movie={currentMovie} key={currentMovie._id} />)}
                {/* 
    <Table className="favourite-table" striped bordered hover variant="dark" >
        <thead>
            <tr>
                <th>Movie</th>
                <th>Description</th>
                <th>Remove</th>

            </tr>
        </thead>



    </Table> */}
            </div>
        </div>
    );

}