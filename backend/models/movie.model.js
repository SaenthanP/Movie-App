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
        type:String,
        required:true,
        trim:true,
    }

});

const User =mongoose.model('User',userSchema);
module.exports=User;