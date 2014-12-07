var express = require('express');
var router = express.Router();
var request = require('request');
var libxmljs = require("libxmljs");

var categories = [
    "combined-print-and-e-book-nonfiction",
    "combined-print-and-e-book-fiction",

    "e-book-fiction",
    "e-book-nonfiction",

    "combined-print-fiction",
    "combined-print-nonfiction",

    "hardcover-advice",
    "hardcover-business-books",
    "hardcover-fiction",
    "hardcover-graphic-books",
    "hardcover-nonfiction",
    "hardcover-political-books",

    "paperback-advice",
    "paperback-books",
    "paperback-business-books",
    "paperback-graphic-books",
    "paperback-nonfiction",

    "trade-fiction-paperback",
    "mass-market-paperback",

    "advice-how-to-and-miscellaneous",
    "animals",
    "business-books",
    "celebrities",
    "chapter-books",
    "childrens-middle-grade",
    "crime-and-punishment",
    "culture",
    "education",
    "family",
    "fashion-manners-and-customs",
    "food-and-fitness",
    "games-and-activities",
    "health",
    "humor",
    "manga",
    "picture-books",
    "relationships",
    "religion-spirituality-and-faith",
    "science",
    "series-books",
    "sports",
    "travel",
    "young-adult"
]


/* GET home page. */
router.get('/', function(req, res) {
    getLists(res, categories.slice(0, 3), 0);
});

router.get('/list/:slug', function(req, res) {
    var slug = req.params.slug;
    var lists = [slug]
    getLists(res, lists, 0);
});

router.get('/search/term=:query', function(req, res) {
    var query = req.params.query;

    // GoodReads books search
    findBooksFromGoodReads(query,res);

});

function getLists(res, lists, index) {
    base = "http://api.nytimes.com/svc/books/v3/lists/";
    end = ".json?callback=books&api-key=59a865c91407e86de482eb167653783a%3A8%3A70173232";

    url = base + lists[index] + end;

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            jbody = JSON.parse(body);
            var books = jbody.results.books;
            var title = jbody.results.display_name;

            lists[index] = {
                'books': books,
                'title': title
            }

            if (index >= lists.length-1) {
                res.render('index', {
                    lists: lists
                });
            } else {
                getLists(res, lists, index+1);
            }
        };
    });
}

function findBooksFromGoodReads(query,res) {

    // query = encodeURI(query);
    // goodreads = "https://www.goodreads.com/search/index.xml?key=ouR8rzRRu8T2kt6UrrD9w&q="+query;
    goodreads = "https://www.goodreads.com/search.xml?key=ouR8rzRRu8T2kt6UrrD9w&q=Ender%27s+Game"
    request(goodreads, function (error, response, body) {
      if (!error && response.statusCode == 200) {

           // var xmlDoc = libxmljs.parseXml(body);
           // var gchild = xmlDoc.get('//title');

           //  // jbody = JSON.parse(body);
           //  // var books = jbody.results.books;
           //  // book_title = books[0].title;

           //  console.log(gchild.text());

            // res.render('index', {
            //     title: "Hardcover Fiction",
            //     books: books
            // });
        };
    });
}



module.exports = router;
