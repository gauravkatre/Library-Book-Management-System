const mongoose=require("mongoose");

//create schema
const BookSchema = mongoose.Schema(
    {name:String,
    ISBN:String,
    title:String,
    pubDate:String,
     language:String,
     numpage: Number,
     authors:[Number],
     publication:[Number],
     category:[String]
    }
);


const BookModel = mongoose.model("books",BookSchema);

module.exports=BookModel;
