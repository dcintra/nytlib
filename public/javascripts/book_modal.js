var rup_book_key = '27cc5af7cf0aa5d2e6a70c0faa3e53f4:9:70200663'
var rup_article_key = 'f35847edafe1a3a532321c12451ca02c:8:70200663'

function callAPI(url,method,param){
	$.ajax({
	    url: url,
	    dataType: "jsonp",
	    success: function(response){
	    	method(response,param);
	    },
	    
	});
}

function callBookReview(title,author){
	var url = 'http://api.nytimes.com/svc/books/v3/reviews.jsonp?api-key=' + rup_book_key + '&title=' + title;
	url = encodeURI(url);
	callAPI(url,getReview,author);
}

function callArticleSearch(review_url){
	var url = 'http://api.nytimes.com/svc/search/v2/articlesearch.jsonp?' + 'fq=web_url:(\"' + review_url + '\")&api_key=' + rup_article_key 
	;
	url = encodeURI(url);
	callAPI(url,showReview,'')
}

function getReview(response,param){
	var reviews = response.results;
	var review_url = '';

	for(var i=0; i<reviews.length; i++){
		var author = reviews[i].book_author;
		if(author == param){
			review_url = encodeURI(reviews[i].url);
			break;
		}
	}

	if(review_url != ''){
		callArticleSearch(review_url);
	}
}

function showReview(response){
	var doc = response.docs[0];
	var headline = doc.headline.main;
	var img_url = 'www.nytimes.com' + doc.multimedia.url;
	var byline = doc.byline.original;
	var lead_para = doc.lead_paragraph;
	var pubdate = doc.pub_date;

	var img_thumbnail = '<div class="thumbnail" style="background-img:url(' + img_url +')"></div>'
	var html_byline = '<p>by ' + byline + '</p>';
	var html_published = '<p>published:' + pubdate + '</p>';

	var html = img_thumbnail + html_byline + '</br>' + html_published;
	$('#my_modal_contents').html(html);
	$('#my_modal_contents').show();

}