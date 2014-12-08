var express = require('express');
var router = express.Router();
var request = require('request');
var parseString = require('xml2js').parseString;

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
   var books =[];
    // goodreads = "https://www.goodreads.com/search/index.xml?key=ouR8rzRRu8T2kt6UrrD9w&q="+query;
    goodreads = "https://www.goodreads.com/search.xml?key=ouR8rzRRu8T2kt6UrrD9w&q="+query

    request(goodreads, function (error, response, body) {
      if (!error && response.statusCode == 200) {

           parseString(body, function (err, result) {
                // console.log(result.GoodreadsResponse.search[0].results);
                
                    results = result.GoodreadsResponse.search[0].results[0].work;
                    for (var i = 0; i < results.length; i++) {
                        id = results[i].best_book[0].id[0]._;
                        title = results[i].best_book[0].title[0];
                        author = results[i].best_book[0].author[0].name[0];
                        imgurl = results[i].best_book[0].image_url[0];

                        books[i] = {
                                        'id': id,
                                        'title': title,
                                        'author': author,
                                        'book_image': imgurl,
                                    }

                    };

                        res.render('search', {
                            books: books
                      
                        })


             });
        };
    });
}

// function getSnippetFromGoodReads(results, res, getDescription) {
//     var bks =[];
//     var descriptions = [];
//     for (var i = 0; i < results.length; i++) {

                                    
//                             id = results[i].best_book[0].id[0]._;
//                             title = results[i].best_book[0].title[0];
//                             author = results[i].best_book[0].author[0].name[0];
//                             imgurl = results[i].best_book[0].image_url[0];


//                             bookurl = "https://www.goodreads.com/book/show/"+id+"?format=xml&key=ouR8rzRRu8T2kt6UrrD9w";

//                            description = getDescription(bookurl);

//                            descriptions[i] =description;

//                            console.log(description);
//                             // bks[i] = {
//                             //     'id': id,
//                             //     'description': description,
//                             //     'title': title,
//                             //     'author': author,
//                             //     'book_image': imgurl,
//                             // }

//     };
//     console.log(bks);
//     console.log("bottom");
//     // /renderBookResults(books, res);
       
        
// }







module.exports = router;
