require("dotenv").config();


const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

//Database
const database =  require("./database/database");

//Model
const BookModel =require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

//Initialise express
const booky = express();

booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());



mongoose.connect(process.env.MONGO_URL,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex:true,
}
).then(() => console.log("connected Establised"));


/*
Route            /
Description      Get all the books
Access           Public
Parameter        None
Methods          Get
*/

booky.get("/",async (req,res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
}
);
/*
Route            /is
Description      Get all the books isbm
Access           Public
Parameter        isbn
Methods          Get
*/

booky.get("/is/:isbn",async (req,res) => {
    const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});

    if(!getSpecificBook){
        return res.json({error:`no book found for ISBN of ${req.params.isbn}`});
    }

    return res.json({book: getSpecificBook});
});

/*
Route            /c
Description      Get all the books on category
Access           Public
Parameter        category
Methods          Get
*/

booky.get("/c/:category",async (req,res) => {
    const getSpecificBook = await BookModel.findOne({category:req.params.category});

    if(!getSpecificBook){
        return res.json({error:`no book found for category of ${req.params.category}`});
    }
    return res.json({book: getSpecificBook});
});

/*
Route            /l
Description      Get all the books on language
Access           Public
Parameter        language
Methods          Get
*/

booky.get("/l/:language",async(req,res) => {
    const getSpecificBook = await BookModel.findOne({language:req.params.category});

    if(!getSpecificBook){
        return res.json({error:`no book found for language of ${req.params.language}`});
    }
    return res.json({book: getSpecificBook});
});

/*
Route            /author
Description      Get all the authors 
Access           Public
Parameter        none
Methods          Get
*/

booky.get("/author",async(req,res) => {
    const getAllAuthor = await AuthorModel.find();
    return res.json(getAllAuthor);
});

/*
Route            /au
Description      Get  the authors on name
Access           Public
Parameter        name
Methods          Get
*/

booky.get("/au/:name",async (req,res) => {
    const getSpecificBook = await BookModel.findOne({author:req.params.name});

    if(!getSpecificBookh){
        return res.json({error:`no book found for author name of ${req.params.name}`});
    }

    return res.json({book: getSpecificBook});
});

/*
Route            /author/book
Description      Get all the authors on isbn
Access           Public
Parameter        isbn
Methods          Get
*/

booky.get("/author/book/:isbn",async(req,res) => {
    const getSpecificAuthor = await AuthorModel.findOne(req.params.isbn);

    if(!getSpecificAuthor){
        return res.json({error:`no author found for the book of ${req.params.isbn}`});
    }
    return res.json({authors: getSpecificAuthor});
});

/* Route            /publication
Description      Get all the publication 
Access           Public
Parameter        none
Methods          Get
*/

booky.get("/publication",async(req,res) => {
    const getAllPublication = await PublicationModel.find();
    return res.json(getAllPublication);
});

/* Route            /pub
Description      Get  the publication on name
Access           Public
Parameter        name
Methods          Get
*/

booky.get("/pub/:name",async(req,res) => {
    const getSpecificBook = await PublicationModel.findOne(req.params.name);

    if(!getSpecificBook){
        return res.json({error:`no book found for publication of ${req.params.name}`});
    }

    return res.json({book: getSpecificBook});
});
/* Route            /publication/book
Description      Get all the publication on isbn
Access           Public
Parameter        isbn
Methods          Get
*/

booky.get("/publication/book/:isbn",async(req,res) => {
    const getSpecificAuthor = await PublicationModel.findOne(req.params.isbn);
    

    if(!getSpecificAuthor){
        return res.json({error:`no publication found for the book of ${req.params.isbn}`});
    }
    return res.json({authors: getSpecificAuthor});
});


//post

/*
Route            /book/new
Description      Get  the new book
Access           Public
Parameter        None
Methods          post
*/
booky.post("/book/new",async (req,res) => {
    const { newBook } = req.body;
    const addNewBook = BookModel.create(newBook);
    return res.json({updataedBook:addNewBook,

        message:"new book added"}
        );
});
/*
Route            /author/new
Description      Get  the new author
Access           Public
Parameter        None
Methods          post
*/

booky.post("/author/new",async (req,res) => {
    const {newAuthor} = req.body;
    const addNewAuthor = AuthorModel.create(newAuthor);
    return res.json({updataedAuthor:addNewAuthor});
});

/*
Route            /publication/new
Description      Get  the new publication
Access           Public
Parameter        None
Methods          post
*/

booky.post("/publication/new",async(req,res) => {
    const {newPublication} = req.body;
    const addNewPublication = PublicationModel.create(newPublication);
    return res.json({updataedPublication: addNewPublication});
});

/**************PUT***************/
/*
Route            /book/update
Description      Update book on isbn
Access           PUBLIC
Parameter        isbn
Methods          PUT
*/

booky.put("/book/update/:isbn",async (req,res) => {
    const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn
      },
      {
        title: req.body.bookTitle
      },
      {
        new: true
      }
    );
  
    return res.json({
      books: updatedBook
    });
  });
  
  /*********Updating new author**********/
  /*
  Route            /book/author/update
  Description      Update /add new author
  Access           PUBLIC
  Parameter        isbn
  Methods          PUT
  */
  
  booky.put("/book/author/update/:isbn", async(req,res) =>{
    //Update book database
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn
    },
    {
      $addToSet: {
        authors: req.body.newAuthor
      }
    },
    {
      new: true
    }
  );
  
    //Update the author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
      {
        id: req.body.newAuthor
      },
      {
        $addToSet: {
          books: req.params.isbn
        }
      },
      {
        new: true
      }
    );
  
    return res.json(
      {
        bookss: updatedBook,
        authors: updatedAuthor,
        message: "New author was added"
      }
    );
  } );
  
  
  
  
  
  
  
  
  
  /*
  Route            /publication/update/book
  Description      Update /add new publication
  Access           PUBLIC
  Parameter        isbn
  Methods          PUT
  */
  
  booky.put("/publication/update/book/:isbn", async(req,res) => {
 
  
    //Update the book database
    const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn
      },
      {
        $addToSet: {
          publication: req.body.newPublication
        }
      },
      {
        new: true
      }
    );
 //updated publication database

    const updatedPublication = await PublicationModel.findOneAndUpdate(
      {
        id: req.body.newPublication
      },
      {
        $addToSet: {
          books: req.params.isbn
        }
      },
      {
        new: true
      }
    );

    return res.json(
      {
        bookss: updatedBook,
        publication: updatedPublication,
        message: "New publication was added"
      }
    );
  } );
  
  /****DELETE*****/
  /*
  Route            /book/delete
  Description      Delete a book
  Access           PUBLIC
  Parameter        isbn
  Methods          DELETE
  */
  
  booky.delete("/book/delete/:isbn", async (req,res) => {
    //Whichever book that doesnot match with the isbn , just send it to an updatedBookDatabase array
    //and rest will be filtered out
  
    const updatedBookDatabase = await BookModel.findOneAndDelete(
      {
        ISBN: req.params.isbn
      }
    );
  
    return res.json({
      books: updatedBookDatabase
    });
  });
  
  /*
  Route            /book/delete/author
  Description      Delete an author from a book and vice versa
  Access           PUBLIC
  Parameter        isbn, authorId
  Methods          DELETE
  */
  
  booky.delete("/book/delete/author/:isbn/:authorId", (req,res) => {
    //Update the book database
     database.books.forEach((book)=>{
       if(book.ISBN === req.params.isbn) {
         const newAuthorList = book.author.filter(
           (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
         );
         book.author = newAuthorList;
         return;
       }
     });
  
  
    //Update the author database
    database.author.forEach((eachAuthor) => {
      if(eachAuthor.id === parseInt(req.params.authorId)) {
        const newBookList = eachAuthor.books.filter(
          (book) => book !== req.params.isbn
        );
        eachAuthor.books = newBookList;
        return;
      }
    });
  
    return res.json({
      book: database.books,
      author: database.author,
      message: "Author was deleted!!!!"
    });
  });

booky.listen(3000,() => {
    console.log("server is up and running");
});