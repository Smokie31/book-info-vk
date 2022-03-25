
//importing
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const { json, type } = require('express/lib/response');
const res = require('express/lib/response');

const Book = require('./model/books.js');

//importing mongoose
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://book-info-vk:bookinfoaa@cluster0.hu62m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser: true}, () =>{
    console.log("Connected to database successfully");
})

//assigning port
const PORT = 5000;

//configuring body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
const jsonParser = bodyParser.json();


//configuring CORS 
app.use(cors());

//app health
app.get('/health', (req, res) => {
    res.send('Website is up and running');
});


//adding a new book to database
app.post('/book', (req, res) =>{
    const book = req.body;

    const newBook = new Book(book);

    newBook.save((err, book) =>{
        if(err){
            res.send({
                success : false,
                message : err
            });
        }
        else{
            res.send({
                success : true,
                message : 'Book Added successfully',
                book : book
            })
        }
    });
    
});


//get all books
app.get('/book', async (req, res) =>{
    const books = await Book.find();
    res.send(books);
    console.log(books);
});

//search book by isbn
app.post('/book/search', async (req, res) => {
    const queryIsbn = req.body.isbn

    const book = await Book.findOne({isbn : queryIsbn});
    if(book){
        res.send({
            status : "success",
            book : book,
        });
        console.log("Book found successfully");}
    
        else{
            res.send({
                status : "failed",
                message : "Book not found"
            })
            console.log("Book not found");
        }

    }
)

//delete by isbn
app.post('/book/delete', async (req, res) => {
    const queryIsbn = req.body.isbn

    const book = await Book.deleteOne({isbn : queryIsbn});
    
    res.send(book);

    }
)

//Update book info by Isbn
app.post('/book/update', jsonParser,  async (req, res) => {
    const queryIsbn = req.body.isbn

    const oldBook = await Book.findOne({isbn : queryIsbn});

    const book = await Book.updateOne({isbn : queryIsbn}, {$set: {
        title : req.body.title,
        author : req.body.author,
        price : req.body.price,
    }});
    
    res.send(book);
    // console.log(oldBook);
    // console.log(book.body);

    // if(oldBook != book.body){
    //     console.log("Changes made successfully");
    // }
    // else{
    //     console.log("Changes failed to be made");
    // }
    
    



    }
)


//making app listen
app.listen(PORT, () =>{
    console.log(`server is running on port: ${PORT}`);
});