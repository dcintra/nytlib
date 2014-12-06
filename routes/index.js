var express = require('express');
var router = express.Router();
var request = require('request');
var libxmljs = require("libxmljs");

/* GET home page. */
router.get('/', function(req, res) {
    getBooks(res, "hardcover-fiction");
});

router.get('/list/:slug', function(req, res) {
    var slug = req.params.slug;
    console.log(slug);
    getBooks(res, slug);
});

router.get('/search/term=:query', function(req, res) {
    var query = req.params.query; 
       
    // GoodReads books search
    findBooksFromGoodReads(query,res);

});

function getBooks(res, name) {
    base = "http://api.nytimes.com/svc/books/v3/lists/";
    end = ".json?callback=books&api-key=59a865c91407e86de482eb167653783a%3A8%3A70173232";
    url = base + name + end;

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
            jbody = JSON.parse(body);
            var books = jbody.results.books;
            var title = jbody.results.display_name;


            res.render('index', {
                title: title,
                books: books
            });
        };
    });
}

function findBooksFromGoodReads(query,res) {

    // query = encodeURI(query);
    // goodreads = "https://www.goodreads.com/search/index.xml?key=ouR8rzRRu8T2kt6UrrD9w&q="+query;
    goodreads = "https://www.goodreads.com/search.xml?key=ouR8rzRRu8T2kt6UrrD9w&q=Ender%27s+Game"
    request(goodreads, function (error, response, body) {
      if (!error && response.statusCode == 200) {

           var xmlDoc = libxmljs.parseXml(body);
           var gchild = xmlDoc.get('//title');

            // jbody = JSON.parse(body);
            // var books = jbody.results.books;
            // book_title = books[0].title;

            console.log(gchild.text());

            // res.render('index', {
            //     title: "Hardcover Fiction",
            //     books: books
            // });
        };
    });


}



module.exports = router;
