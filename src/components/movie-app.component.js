import React, { useState, useEffect } from 'react';
import '../App.css';
import Axios from 'axios';

import { Redirect } from 'react-router-dom';
// import jwt from 'jsonwebtoken';
import { Button } from 'react-bootstrap';
require('dotenv').config();


export default function MovieApp() {
    const [movies, setMovies] = useState([]);

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





        const readMovies = async () => {
            await Axios({
                method: 'post',
                url: 'http://localhost:5000/api/protected/get_popular_movies',
                headers: {
                    'Authorization': localStorage.getItem('jwt'),
                }
            }).then(res => {
                console.log(res);
                // var nums=[1,2,3,4,5];
                // setMovies(nums);
    
            });
        }
        checkLoggedIn();

        readMovies();
        // console.log(movies);
    }, []);



    const onSubmit = async (e) => {

        try {
            e.preventDefault();
            e.target.reset();
            console.log(process.env.MOVIE_API_KEY);


        } catch (err) {
            // err.response.data.Error && setError(err.response.data.Error);

        }
    }
    return (
        <div className="container-fluid movie-page">
            <form onSubmit={onSubmit} className="form-add-task">
                <div className="row">
                    <div className="col-sm-8 d-flex">
                        <div className="form-group">
                            <input type="text" className="movie-search form-control" placeholder="Task" />
                        </div>

                    </div>
                    <div className="col-sm-4  d-flex">
                        <Button className="text-uppercase search-btn" variant="dark" type="submit">Search</Button>


                    </div>
                </div>
                <div className="container card-container">
                    <img src="https://image.tmdb.org/t/p/w200/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"></img>
                    <img src="https://image.tmdb.org/t/p/w200/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"></img>
                    <img src="https://image.tmdb.org/t/p/w200/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"></img>
                    <img src="https://image.tmdb.org/t/p/w200/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"></img>
                    <img src="https://image.tmdb.org/t/p/w200/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"></img>
                    <img src="https://image.tmdb.org/t/p/w200/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"></img>
                    <img src="https://image.tmdb.org/t/p/w200/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"></img>
                    <img src="https://image.tmdb.org/t/p/w200/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"></img>
                    <img src="https://image.tmdb.org/t/p/w200/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"></img>
                    <img src="https://image.tmdb.org/t/p/w200/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"></img>
                    <img src="https://image.tmdb.org/t/p/w200/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"></img>
                    <img src="https://image.tmdb.org/t/p/w200/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"></img>
                    <img src="https://image.tmdb.org/t/p/w200/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"></img>
                    <img src="https://image.tmdb.org/t/p/w200/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"></img>
                    <img src="https://image.tmdb.org/t/p/w200/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"></img>
                    <img src="https://image.tmdb.org/t/p/w200/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"></img>
                    <img src="https://image.tmdb.org/t/p/w200/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"></img>

                </div>

            </form>


        </div>

    );
}
