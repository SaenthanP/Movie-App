import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import UserContext from "../context/user.context";
import Axios from 'axios';

export default function Register() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const onSubmit = async (e) => {

        try {
            e.preventDefault();

            const registerUser = {
                username,
                password,
                confirmPassword
            }
            const registrationRes = await Axios.post("http://localhost:5000/api/users/register", registerUser);

            window.location = '/login';


        } catch (err) {
            // err.response.data.Error && setError(err.response.data.Error);
        }
    }


    return (
        <div className="row">
            <div className="col-sm-12 d-flex">
                <div className="card signin-card">
                    <div className="card-body">
                        {/* {error && (<Error message={error} clearError={()=>setError(undefined)}/>)} */}

                        <h5 className="card-title text-center">Register</h5>
                        <form onSubmit={onSubmit} className="form-signin">
                            <div className="form-group">
                                <label htmlFor="inputEmail">Username</label>
                                <input type="text" className="form-control" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputEmail">Password</label>
                                <input type="password" className="form-control" placeholder="Password (Min 8 characters)" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputEmail">Confirm Password</label>
                                <input type="password" className="form-control" placeholder="Re-enter Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-lg btn-primary btn-block text-uppercase signin-btn" type="submit">Register</button>
                            </div>
                            <Link to="/login" >Login</Link>

                        </form>
                    </div>
                </div>
            </div>
        </div>


    );
}
