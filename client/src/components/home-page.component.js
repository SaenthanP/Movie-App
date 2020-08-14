import React, { useEffect } from 'react';
import '../App.css';

import Axios from 'axios';
import TypeWriterEffect from '../components/typewriter.component'

export default function HomePage() {


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
    }, []);




    return (
    //     <div className="parent">
    //         <div className="section1">
    //             <div className="row section-1-row">
    //                 <div className="col-sm-12 col-md-6 center-block">
    //                     <img className="section-1-img" src={require("../Assets/movie.jpg")} alt="movie graphic Designed by rawpixel.com / Freepik" />
    //                     <div className="row">
    //                         <div className="col-sm-12" >
    //                             <a href="http://www.freepik.com" id="credit-id">Designed by rawpixel.com / Freepik</a>
    //                         </div>
    //                     </div>

    //                 </div>
    //                 <div className="col-sm-12 col-md-6 title-col">
    //                     {/* <h1 className="title-header">Search millions of movies, <br/>and keep track of your favourites!</h1> */}
    //                     <TypeWriterEffect text="Hey there! Login to search millions of movies and favourite the best ones!" />

    //                 </div>
    //             </div>

    //             {/* <div className="section2">
    //    </div> */}
    //             <div className="row ">
    //                 <div className="col-sm-12 col-md-6 info-list">
    //                     <ul>
    //                         <li>Keep track of your favourite movies!</li>
    //                         <li>Leave and read reviews from other users</li>
    //                         <li>Search hundreds of movies with a few clicks!</li>

    //                     </ul>
    //                 </div>
    //                 <div className="col-sm-12 col-md-6 info-list" >
    //                     {/* <h1 className="title-header">Search millions of movies, <br/>and keep track of your favourites!</h1> */}
    //                     <ul>
    //                         <li>Explore the most popular movies</li>
    //                         <li>Expore upcoming movies</li>
    //                         <li>Explore movies that are now playing in theatres</li>

    //                     </ul>
    //                 </div>
    //             </div>

    //         </div>

    //     </div>




<div className="parent">
            <div className="section1">
                <div className="row section-1-row">
                    <div className="col-sm-12 col-md-6 center-block">
                        <img className="section-1-img" src={require("../Assets/movie.jpg")} alt="movie graphic Designed by rawpixel.com / Freepik" />
                        <div className="row">
                            <div className="col-sm-12" >
                            <a href="https://www.freepik.com/vectors/people">People vector created by rawpixel.com - www.freepik.com</a>                            </div>
                        </div>

                    </div>
                    <div className="col-sm-12 col-md-6 title-col">
                        {/* <h1 className="title-header">Search millions of movies, <br/>and keep track of your favourites!</h1> */}
                        <TypeWriterEffect text="Hey there! Login to search hundreds of movies and favourite the best ones!" />

                    </div>
                </div>
                </div>

                <div className="section2">
                <div className="row">
                   

                    <div className="col-sm-12 col-md-4 info-list d-flex justify-content-center">
                        <ul>
                            <li>Keep track of your favourite movies!</li>
                            <li>Leave and read reviews from other users</li>
                            <li>Search hundreds of movies with a few clicks!</li>

                        </ul>
                    </div>
                    <div className="col-sm-12 col-md-4 ">
                    <img className="section-2-img" src={require("../Assets/3110.jpg") } alt="movie graphic Designed by rawpixel.com / Freepik" />
                        <div className="row">
                            <div className="col-sm-12" >
                            <a href='https://www.freepik.com/vectors/book'>Book vector created by upklyak - www.freepik.com</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 info-list d-flex justify-content-center" >
                        {/* <h1 className="title-header">Search millions of movies, <br/>and keep track of your favourites!</h1> */}
                        <ul>
                            <li>Explore the most popular movies</li>
                            <li>Expore upcoming movies</li>
                            <li>Explore movies that are now playing in theatres</li>

                        </ul>
                    </div>
                </div>
                </div>
                </div>


    );
}
