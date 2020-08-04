import React, { useState, useEffect } from 'react';
import '../App.css';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
// import jwt from 'jsonwebtoken';


export default function MovieApp() {
    const [taskName, setTaskName] = useState();
    const [error, setError] = useState(undefined);

    const [todo, setTodo] = useState([]);

    useEffect(() => {
        console.log(localStorage.getItem('jwt'));
         const checkLoggedIn=async()=>{
         
           await Axios.get("http://localhost:5000/api/users/isAuthenticated",{ headers: { "Authorization": localStorage.getItem('jwt') } })
            .then(res=>{
              if(!res.data){
                  window.location='/';
              }
               return res.data;
             });
            
            //  if(!isLoggedIn){
            //     window.location='/';
            //  }
        }
      

// Axios.get("http://localhost:5000/api/users/isTokenValid",{"token":localStorage.getItem('jwt')})
// .then(res=>{
//         console.log(res.data);
// }); 
        // const checkLoggedIn=async()=>{
        //       const isLoggedIn=Axios.get("http://localhost:5000/api/users/isAuthenticated",{ headers: { "Authorization": localStorage.getItem('jwt') } })
        //     .then(r=>{
        //         console.log("first"+r.data);
        //        return r.data;
        //      });
        //      console.log(isLoggedIn.data);
        //      if(!isLoggedIn){
        //         window.location='/';
        //      }
        // }
      
        checkLoggedIn();
      
        // const res=Axios.get("http://localhost:5000/api/users/isAuthenticated",{ headers: { "Authorization": localStorage.getItem('jwt') } });
//   console.log(res.data);
    }, []);



    return (
        <div className="container-fluid ">
            <p>YOUR IN BOI</p>
          
        </div>

    );
}
