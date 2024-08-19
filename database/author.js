const mongoose=require("mongoose");

//create author schema
const AuthorSchema = mongoose.Schema(
    {
        id : Number,
        name : String,
        book :[String]
    },
    {
        id : Number,
        name :String,
        book :[String]
    }
);


const AuthorModel = mongoose.model("authors",AuthorSchema);

module.exports=AuthorModel;