import React, { useState, useEffect } from 'react';
import '../App.css';
import Axios from 'axios';
import MovieModal from '../components/movie-modal.component';
import '../components/component.css';
import test from '../Assets/no_poster.jpg'
import { Redirect } from 'react-router-dom';
// import jwt from 'jsonwebtoken';
import { Button, Card, CardColumns, CardGroup, CardDeck, Dropdown, ButtonGroup, SplitButton, DropdownButton, Modal } from 'react-bootstrap';
import FavouritePage from './favourite.component';
require('dotenv').config();


export default function MovieApp() {
    const [movies, setMovies] = useState([]);
    const [movieTitle, setMovieTitle] = useState();
    const [selectedMovie, setSelectedMovie] = useState([]);
    const [error, setError] = useState(undefined);
    const [isSearchPage, setSearchPage] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [popularPageNumber, setPopularPageNumber] = useState(1);
    const [searchPageNumber, setSearchPageNumber] = useState(1);

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





        readPopularMovies(popularPageNumber);
    }, [popularPageNumber]);

    const readPopularMovies = async (popularPageNumber) => {
        setSearchPage(false);
        
        console.log(popularPageNumber);
        await Axios({
            method: 'post',
            url: 'http://localhost:5000/api/protected/get_popular_movies',
            headers: {
                'Authorization': localStorage.getItem('jwt'),
            },
            data: {
                pageNumber: popularPageNumber
            }
        }).then(res => {

            setMovies(res.data);
        });
    }
    const readNowPlayingMovies = async () => {
        setSearchPage(false);
        
        await Axios({
            method: 'get',
            url: 'http://localhost:5000/api/protected/get_now_playing',
            headers: {
                'Authorization': localStorage.getItem('jwt'),
            },
            
        }).then(res => {

            setMovies(res.data);
        });
    }


    const onSubmit = async (e) => {
        setSearchPageNumber(1);
        setSearchPage(true);
        try {
            e.preventDefault();
            e.target.reset();
            console.log(movieTitle);

            searchMovie();
        } catch (err) {
            // err.response.data.Error && setError(err.response.data.Error);

        }
    }
    const searchMovie = async () => {
        console.log("movie title" + movieTitle);
        await Axios({
            method: 'post',
            url: 'http://localhost:5000/api/protected/get_search',
            headers: {
                'Authorization': localStorage.getItem('jwt'),


            },
            data: {
                movieTitle,
                searchPageNumber
            }


        }).then(res => {
            // res.data.map(currentMovie => {

            // });

            console.log(res.data);
            setMovies(res.data);
        });

    }
    const imageClick = async (movie) => {


        console.log(movie);
        setSelectedMovie(movie);

        // console.log(selectedMovie);
        // console.log(selectedMovie.title)
        setModalShow(true);


    }

    const Movies = (props) => ((

        <>
            <button type="button" className="movie-poster-button" onClick={() => imageClick(props.movie)}><img className="moviePoster movie-card" key={props.movie.key} src={props.movie.poster_path ? "https://image.tmdb.org/t/p/original" + props.movie.poster_path : require("../Assets/no_poster.jpg")} width="200px" height="300px"  ></img></button>
        </>
    ));

    const nextPage = () => {
        console.log("pageNumber: " + popularPageNumber);
        if (!isSearchPage) {
        console.log(popularPageNumber);
                        setPopularPageNumber(popularPageNumber + 1);
        } else {
            setSearchPageNumber(searchPageNumber + 1);
            searchMovie();
        }
        // readPopularMovies();
    }
    const previousPage = () => {
        console.log("search: " + popularPageNumber);
        if (!isSearchPage) {
            console.log(popularPageNumber);

            setPopularPageNumber(popularPageNumber - 1);
        } else {
            setSearchPageNumber(searchPageNumber - 1);
            searchMovie();
        }
        // readPopularMovies();
    }
    return (

        <div className="container-fluid movie-page">
            <MovieModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                movie={selectedMovie}

            />
            <form onSubmit={onSubmit} className="form-add-task">

                <div className="row">
                    <div className="col-sm-8 d-flex">
                        <div className="form-group">
                            <input type="text" className="movie-search form-control" placeholder="Enter a movie title..." onChange={(e) => setMovieTitle(e.target.value)} />
                        </div>

                    </div>
                    <div className="col-sm-4  d-flex">
                        <Button className="text-uppercase search-btn" variant="dark" type="submit">Search</Button>


                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 d-flex">

                        {[DropdownButton].map((DropdownType, idx) => (
                            <DropdownType
                                as={ButtonGroup}
                                key={idx}
                                id={`dropdown-button-drop-${idx}`}
                                size="sm"
                                variant="secondary"
                                title="Sort by..."
                                className="sort-drop-down"

                            >
                                <Dropdown.Item eventKey="1" onClick={() => readPopularMovies()}>Get Most Popular</Dropdown.Item>
                                {/* <Dropdown.Item eventKey="2" onClick={() => readNowPlayingMovies()}>Get Now Playing in Theatres</Dropdown.Item> */}

                            </DropdownType>
                        ))}
                    </div>
                </div>
                <div className="container card-container">

                    {movies.map(currentMovie => <Movies movie={currentMovie} key={currentMovie.id} />)}
                    <div className="row">
                        <div className="col-sm-6">
                            <button className="back-page-btn" onClick={() => previousPage()} disabled={popularPageNumber <= 1||searchPageNumber<=1&&isSearchPage}>Back</button>
                        </div>
                        <div className="col-sm-6">
                            <button type="button" className="next-page-btn" onClick={() => nextPage(1)} disabled={movies.length < 20}>Foward</button>
                        </div>
                    </div>




                </div>

            </form>


        </div>

    );
}
