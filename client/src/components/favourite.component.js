import React, { useState, useEffect } from 'react';
import '../components/component.css';

import { Button, Card } from 'react-bootstrap';
import Axios from 'axios';
export default function FavouritePage(props) {
    const [favouriteMovies, setFavouriteMovies] = useState([]);

    useEffect(() => {
        const checkLoggedIn = async () => {
            if (localStorage.getItem('jwt')) {

                Axios({
                    method: 'get',
                    url: 'http://localhost:5000/api/users/isAuthenticated',
                    headers: {
                        'Authorization': localStorage.getItem('jwt'),
                    }
                }).catch(err => {
                    window.location = '/';
                    localStorage.removeItem('jwt');
                });
            }

        }
        checkLoggedIn();
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
                        <img className="moviePoster movie-card" key={props.movie.key} src={props.movie.posterPath ? "https://image.tmdb.org/t/p/original" + props.movie.posterPath : require("../Assets/no_poster.jpg")} width="210px" height="310px" alt="movie poster" ></img>
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
                    <Button  onClick={()=>{removeFavourite(props.movie.movieId)}} variant="outline-dark">Remove</Button>
                    </div>
                </div>
            </Card.Body>
        </Card>

    
    ));

    return (
        <div className="container-fluid movie-page">

            <div className="container-fluid favourite">
                {favouriteMovies.map(currentMovie => <Movie movie={currentMovie} key={currentMovie._id} />)}
                {favouriteMovies.length<=0&&<h4>There are no favourites...Please go back and favourite the best ones</h4>}
            </div>
        </div>
    );

}