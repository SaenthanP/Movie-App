import React, { useState, useEffect } from 'react';
import '../App.css';
import Axios from 'axios';
import test from '../Assets/no_poster.jpg'
import { Redirect } from 'react-router-dom';
// import jwt from 'jsonwebtoken';
import { Button } from 'react-bootstrap';
require('dotenv').config();


export default function MovieApp() {
    const [movies, setMovies] = useState([]);
    const [movieTitle, setMovieTitle] = useState();

    const [error, setError] = useState(undefined);



    useEffect(() => {
        console.log(localStorage.getItem('jwt'));
        const checkLoggedIn = async () => {
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
        checkLoggedIn();





        const readPopularMovies = async () => {
            await Axios({
                method: 'post',
                url: 'http://localhost:5000/api/protected/get_popular_movies',
                headers: {
                    'Authorization': localStorage.getItem('jwt'),
                }
            }).then(res => {

                setMovies(res.data);
            });
        }

        readPopularMovies();
    }, []);



    const onSubmit = async (e) => {

        try {
            e.preventDefault();
            e.target.reset();
            console.log(movieTitle);
            const searchMovie=async()=>{
                await Axios({
                    method: 'post',
                    url: 'http://localhost:5000/api/protected/get_search',
                    headers: {
                        'Authorization': localStorage.getItem('jwt'),
                       

                    },
                    data:{
                        movieTitle
                    }
                  
                    
                }).then(res => {
                    // res.data.map(currentMovie => {

                    // });

                    console.log(res.data);
                    setMovies(res.data);
                });
            
            }
            searchMovie();
        } catch (err) {
            // err.response.data.Error && setError(err.response.data.Error);

        }
    }
    const Movies = (props) => ((
        
        <img className="moviePoster" key={props.movie.key} src={props.movie.poster_path ? "https://image.tmdb.org/t/p/original"+props.movie.poster_path : require("../Assets/no_poster.jpg" )} width="200px" height="300px"></img>
                
    ));
    return (
        <div className="container-fluid movie-page">
            <form onSubmit={onSubmit} className="form-add-task">
                <div className="row">
                    <div className="col-sm-8 d-flex">
                        <div className="form-group">
                            <input type="text" className="movie-search form-control" placeholder="Enter a movie title..." onChange={(e) => setMovieTitle(e.target.value)}/>
                        </div>

                    </div>
                    <div className="col-sm-4  d-flex">
                        <Button className="text-uppercase search-btn" variant="dark" type="submit">Search</Button>


                    </div>
                </div>
                <div className="container card-container">
                {movies.map(currentMovie => <Movies movie={currentMovie} key={currentMovie.id} />)}

                   

                </div>

            </form>


        </div>

    );
}
