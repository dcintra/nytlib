exports.getBooks = function() {
    url = "http://api.nytimes.com/svc/books/{version}/lists.json";
    api_key = 'api-key=af3a02b727a9e4231ab4af07cf49970f%3A15%3A70173232';
    url = url + '?' + api_key;
    $.ajax({
        'url': url,
        'type': 'GET',
        'dataType': "jsonp",
        success: function(data, textStats, XMLHttpRequest) {
            return "success";
        },
        error: function(data, textStatus, errorThrown) {
            return "error";
        }
    });
}
