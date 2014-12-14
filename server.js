var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://tfiprework_admin:tfi123@ds063870.mongolab.com:63870/ashtfiprework");
var Book = require("./app/models/book");


var app = express();
app.use(bodyParser.urlencoded()); //delegating the body parser to read the body of any request coming to this app
app.use(bodyParser.json());

var port = process.env.PORT || 1234;
var router = express.Router(); //creating an instance of the express router which is a class provided by express

router.get("/", function (req, res) {
    res.json({
        "message": "Api is functional. Use /api/books for the Book API"
    });
});

router.route("/books")
    .get(function (req, res) {
        Book.find(function (error, books) {
            if (error)
                res.send(error);
            res.json(books);

        });
    })
    .post(function (req, res) {
        var book = new Book();
        book.title = req.body.title;
        book.author = req.body.author;
        book.synopsis = req.body.synopsis;
        book.save(function (error) {
            if (error)
                res.send(error);
            res.json({
                "message": "Book created!!!!"
            });
        });
    });

router.route("/books/:id")
    .get(function (req, res) {
        Book.findById(req.params.id, function (error, book) {
            if (error)
                res.send(error);
            res.json(book);

        });
    })
    .put(function (req, res) {
        Book.findById(req.params.id, function (error, book) {
            if (error)
                res.send(error);
            book.title = req.body.title;
            book.author = req.body.author;
            book.synopsis = req.body.synopsis;
            book.save(function (error) {
                if (error)
                    res.send(error);
                res.json({
                    "message": "Book has been updated"
                });
            });
        });
    })
    .delete(function (req, res) {
        Book.remove({
            _id: req.params.id
        }, function (error, book) {
            if (error)
                res.send(error);
            res.json(book);

        });
    });

app.use("/api", router);

app.use("/",function(req,res){
   res.json({"message":"Access the API at /api/books"}); 
});

app.listen(port); //waiting for a user's request on the port

