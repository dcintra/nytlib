$(document).ready(function() {
    function addBook(book) {
        store.set(book.primary_isbn13, book);
        getBooks();
    }

    function getBooks() {
        var list = {
            title: "Bookshelf",
            books: []
        }
        store.forEach(function(key, val) {
            list['books'].push(val);
        });
        renderShelf(list);
        return list;
    }

    function renderShelf(list) {
        t_book = [
            '<li class="book" data-json="%json%">',
                '<div class="col-md-4">',
                    '<div class="thumbnail">',
                        '<img src="%book_img%" />',
                        '<div class="caption">',
                            '<h4>%title%</h4>',
                            '<h5>%author%</h5>',
                            '<p>%description%</p>',
                            '<p><a class="btn btn-primary" href="#">Action</a> <a class="btn" href="#">Action</a></p>',
                        '</div>',
                    '</div>',
                '</div>',
            '</li>'
        ].join("\n");

        jQuery.each(list['books'], function(i, book) {
            r_book = t_book;
            $.each({
                'json': JSON.stringify(book).replace(/"/g, '&quot;'),
                'title': book.title,
                'author': book.author,
                'description': book.description,
                'book_img': book.book_img
            }, function(key, value) {
                r_book = r_book.replace('%'+key+'%', value);
            });
        });
    }

    $('a.btn-primary').click(function(event) {
        event.preventDefault();
        addBook(jQuery.parseJSON($(this).closest('.book').attr("data-json")));
    });
});
