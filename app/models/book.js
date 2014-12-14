
var mongoose=require("mongoose");       //first thing to define a schema is the database connector
var Schema=mongoose.Schema;

var bookSchema=new Schema(
    {
        title:String,
        author:String,
        synopsis:String 
    }
);

//this file needs to get packaged
module.exports=mongoose.model("Book",bookSchema);   //model is for the app to use; schema is for the DB to use


