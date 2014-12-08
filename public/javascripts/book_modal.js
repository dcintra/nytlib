var rup_book_key = '27cc5af7cf0aa5d2e6a70c0faa3e53f4:9:70200663'
var rup_article_key = 'ceb4f5d703ac4669f3d6ca43aaefb62c:15:70290246'

function callAPI(url,method,param){
	$.ajax({
	    url: url,
	    dataType: "jsonp",
	    cache: true,
	    jsonpCallback: "svc_search_v2_articlesearch",
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
	var url = 'http://api.nytimes.com/svc/search/v2/articlesearch.jsonp?api-key=' + rup_article_key
	+ '&fq=web_url:(\"' + review_url + '\")';
	url = encodeURI(url);
	callAPI(url,showReview,'')
}

function getReview(response,param){
	var reviews = response.results;
	var review_url = '';

	for(var i=0; i<reviews.length; i++){
		var author = reviews[i].book_author;
		if(author == param){
			review_url = reviews[i].url;
			break;
		}
	}
	if(review_url != ''){
		callArticleSearch(review_url);
	}
	else{
		showErrorMsg();
	}
}

function showErrorMsg(){
	var msg = '<center style="color:red">No review available</center>';
	$('#my_modal_contents').html(msg);
}

function showReview(response){
	if(response == null || response.response.docs[0] == null){
		showErrorMsg();
		return;
	}
	var doc = response.response.docs[0];
	var headline = doc.headline.main;
	console.log(doc.multimedia);
	var img_url = 'http://www.nytimes.com/' + doc.multimedia[0].url;
	var byline = doc.byline.original;
	var lead_para = doc.lead_paragraph;
	var pubdate = doc.pub_date.split('T')[0];


	var html_headline = '<h3>' + headline + '</h3>';
	var img_thumbnail = '<div style=\"text-align: center;border: 2px solid black;width: 150px;height: 150px;margin: 10px auto;overflow: hidden;border-radius: 75px;\"><img src=\"' + img_url
	+ '\" style=\"min-height: 150px;min-width: 150px;\"/></div>'
	var html_published = 'published:' + pubdate
	var full_review = 'Read the full review <a href=\"' + doc.web_url +'\">here</a>.'

	var html = '<div style="margin:5px;">' + html_headline + img_thumbnail + '</br>' + byline + '</br>' + html_published + '</br>' + '</br>' + lead_para + '..' + full_review +'</div>';
	console.log(html);
	clearModalContent();
	$('#my_modal_contents').html(html);
	$('#my_modal_contents').show();

}

function clearModalContent(){
	// $("#myModalLabel").empty();
	$("#my_modal_contents").empty();
}
