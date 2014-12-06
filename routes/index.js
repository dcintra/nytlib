var express = require('express');
var router = express.Router();

var nytEngine = require('../nyt');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: nytEngine.getBooks() });
});

module.exports = router;
