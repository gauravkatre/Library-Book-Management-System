const books = [
    {name:"Tesla",
    ISBN:"1234book",
    title:"Tesla",
    pubDate:"2023-08-02",
     language:"en",
     numpage: 200,
     authors:[1,2],
     publication:[1],
     category:["tech","edu","space"]
    }
]

const authors = [
    {
        id : 1,
        name : "gaurav",
        book :["1234book","atomic habit"]
    },
    {
        id : 2,
        name :"Elon Musk",
        book :["1234book"]
    }
  
]



const publication = [
    {
        id:1,
        name:"kriti pub",
        book:["1234book"]

    },

    {
        id:2,
        name:"kriti pub",
        book:[]

    }
]


module.exports = {books,authors,publication};