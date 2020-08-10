const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const movieSchema=new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
   userId:{
        type:String,
        required:true,
        trim:true,
    },
    movieId:{
        type:Number,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    posterPath:{
        type:String,
        trim:true,

    }

});

const Movie =mongoose.model('Movie',movieSchema);
module.exports=Movie;