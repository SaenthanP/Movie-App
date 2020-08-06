const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const passport=require('passport');

require('dotenv').config();

const app=express();
const port=process.env.PORT||5000;

app.use(cors());
app.use(bodyparser.json());
app.use(passport.initialize());


require('./config/passport')(passport);

const uri=process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology:true });
const connection=mongoose.connection;
connection.openUri('open',()=>{
    console.log("Mongo database connection established successfully");
});

/*
Only put ,passport.authenticate('jwt',{session:false}) for routes that have to be secured
*/
const usersRouter=require('./routes/users');
app.use('/api/users',usersRouter);

const movieRouter=require('./routes/movie-routes');
app.use('/api/protected', passport.authenticate('jwt', {session: false}),movieRouter);


// a;pp.get('/app',passport.authenticate('jwt', {session: false},{ failureRedirect: "/" }),  function(req, res) {
//     console.log("it working");
//     window.location="/app";
//   });

app.listen(port,()=>{
    console.log('Server is running on port: '+port);
});
