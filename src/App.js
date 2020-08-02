
import React,{useState, useEffect} from 'react';
import { BrowserRouter as Router, Route ,Switch,Redirect} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import Axios from 'axios';
import './App.css';
import Login from "./components/login.component";
import UserContext from "./context/user.context";
// import TodoApp from "./Components/todo-app.component";
function App() {
  const [userData,setUserData]=useState({
      token:undefined,
      user:undefined,
  });

  useEffect(()=>{
  
  },[]);
 
  return (

    <Router>
      <UserContext.Provider value={{userData,setUserData}}>
        <div className="parent container-fluid">


          <br />
          <Switch>
          <Route path={["/", "/login"]} exact component={Login} />
          </Switch>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
