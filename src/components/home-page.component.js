import React, { Component, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import UserContext from "../context/user.context";
import Axios from 'axios';
import User from '../'
// import Error from './error.component';
export default function HomePage() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const { setUserData } = useContext(UserContext);


    const onSubmit = async (e) => {

    }

    return (
      <div></div>
      
            

        );
}
