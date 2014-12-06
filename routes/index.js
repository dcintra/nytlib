var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res) {
    getBooks(res);
});


function getBooks(res) {
    url = 'http://api.nytimes.com/svc/books/v3/lists/hardcover-fiction.json?callback=books&api-key=59a865c91407e86de482eb167653783a%3A8%3A70173232';

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
            jbody = JSON.parse(body);
            var books = jbody.results.books;
            // book_title = books[0].title;

            console.log(books);

            res.render('index', {
                title: "Hardcover Fiction",
                books: books
            });
        };
    });
}


module.exports = router;
