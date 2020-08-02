import React, { Component, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import UserContext from "../context/user.context";
// import Axios from 'axios';
// import Error from './error.component';
export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const { setUserData } = useContext(UserContext);

    const onSubmit = async (e) => {

        // try {
        //     e.preventDefault();

        //     const loginUser = {
        //         username,
        //         password,

        //     }
        //     const loginRes = await Axios.post("http://localhost:5000/users/login", loginUser);
        //     setUserData({
        //         token: loginRes.data.token,
        //         user: loginRes.data.user,
        //     });

        //     localStorage.setItem("auth-token", loginRes.data.token);
        //     window.location = '/app';
        // } catch (err) {
        //     err.response.data.Error && setError(err.response.data.Error);
        // }
    }

    return (
      
        <div className="row">

            <div className="col-sm-12 d-flex">

                <div className="card signin-card">
                    <div className="card-body">
                        {/* {error && (<Error message={error} show={true} clearError={() => setError(undefined)} />)} */}

                        <h5 className="card-title text-center">Sign In</h5>
                        <form onSubmit={onSubmit} className="form-signin">
                            <div className="form-group">
                                <label htmlFor="inputEmail">Username</label>
                                <input type="text" className="form-control" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputEmail">Password</label>
                                <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button className="btn btn-lg btn-primary btn-block text-uppercase signin-btn" type="submit">Sign in</button>
                            <Link to="/register" >Register</Link>

                        </form>
                    </div>
                </div>
            </div>
        </div>
            

        );
}
