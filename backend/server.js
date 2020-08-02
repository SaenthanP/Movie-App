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

const testRouter=require('./routes/test');
app.use('/api/protected',passport.authenticate('jwt', {session: false}),testRouter);

app.listen(port,()=>{
    console.log('Server is running on port: '+port);
});
