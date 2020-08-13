const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const reviewSchema=new Schema({
   
   username:{
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
    review:{
        type:String,
        required:true,
        trim:true,
    },
    date:{
        type:String, 
        required:true,
        trim:true,  
    }


});

const Review =mongoose.model('Review',reviewSchema);
module.exports=Review;