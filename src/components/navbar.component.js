import React, { Component, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import UserContext from "../context/user.context";
import Axios from 'axios';
import User from '../'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './component.css';

// import Error from './error.component';
export default function Login(props) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const {setUserData}=useContext(UserContext);
    const logout=()=>{
    setUserData({
        token:undefined,
        user:undefined,
    });
    localStorage.removeItem("jwt");
    window.location='/';
    
    };

if(props.isAuthenticated===null){
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            
            <Navbar.Brand href="/">Movie-Flix</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">

                <Nav className="mr-auto">
                    <Link to="/login" className="nav-link">Sign in</Link>
                    <Link to="/register" className="nav-link">Register</Link>

                </Nav>
            </Navbar.Collapse>
        </Navbar>


    );
}else{
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/app">Movie-Flix</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">

                <Nav className="mr-auto">
                        <Link to="/favourites" className="nav-link">Favourites</Link>

                    <Link to="/" className="nav-link" onClick={logout}>Sign Out</Link>

                </Nav>
            </Navbar.Collapse>
        </Navbar>


    );
}
   
}
