const mongoose=require("mongoose");

//create schema
const PublicationSchema = mongoose.Schema(
    {
        id:Number,
        name:String,
        book:[String]

    },
);


const PublicationModel = mongoose.model("publication",PublicationSchema);

module.exports=PublicationModel;