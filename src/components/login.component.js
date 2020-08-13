import React, { Component, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import UserContext from "../context/user.context";
import Axios from 'axios';
import User from '../'
import ErrorModal from '../components/error-modal.component';

// import Error from './error.component';
export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const { setUserData } = useContext(UserContext);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        const checkLoggedIn= async()=>{
            if(localStorage.getItem('jwt')){
            Axios({
                method: 'get',
                url: 'http://localhost:5000/api/users/isAuthenticated',
                headers: {
                    'Authorization': localStorage.getItem('jwt'),
                }
            }).then(res=>{
                window.location = '/app';

            }).catch(err=>{
                window.location = '/login';
                localStorage.removeItem('jwt');

            });
        }
        }
        checkLoggedIn();
        // if(localStorage.getItem('jwt')){
        //     window.location='/app';
        // }

    }, []);
    const onSubmit = async (e) => {

        try {
            e.preventDefault();

            const loginUser = {
                username,
                password,

            }
            const loginRes = await Axios.post("http://localhost:5000/api/users/login", loginUser);
           
            localStorage.setItem('jwt',loginRes.data.token);
           console.log(loginRes.data.payload);
        
            console.log(loginRes.data.token);
            window.location = '/app';
        } catch (err) {
            setError(err.response.data.Error);

            console.log(err);
            setModalShow(true);
            console.log(err.response.data.Error+" test");
        }
    }

    return (
      
        <div className="row">

            <div className="col-sm-12 d-flex">

                <div className="card signin-card">
                    <div className="card-body">
                    <ErrorModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                error={error}

            />
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
