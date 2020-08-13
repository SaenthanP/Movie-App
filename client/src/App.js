
import React,{useState, useEffect} from 'react';
import { BrowserRouter as Router, Route ,Switch,Redirect} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';
import Login from "./components/login.component";
import UserContext from "./context/user.context";
 import MovieApp from "./components/movie-app.component";
 import HomePage from "./components/home-page.component";
 import Navbar from "./components/navbar.component";
 import Register from "./components/register.component";
import FavouritePage from './components/favourite.component';

function App() {
  const [userData,setUserData]=useState({
      token:undefined,
      user:undefined,
  });
  const [loggedIn, setLoggedIn] = useState();


  useEffect(()=>{
    setLoggedIn(localStorage.getItem('jwt'));
    
  },[]);
 
  return (

    <Router>
      <UserContext.Provider value={{userData,setUserData}}>
        <div className="container-fluid">
    <Navbar isAuthenticated={loggedIn}/>

          <Switch>
          <Route path="/" exact component={HomePage} />

          <Route path= "/login" exact component={Login} />
          <Route path="/register" exact component={Register}/>

          <Route path="/app" exact component={MovieApp}/>
          <Route path="/favourites" exact component={FavouritePage}/>
          <Redirect to="/app" exact component={MovieApp}/>

          </Switch>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
