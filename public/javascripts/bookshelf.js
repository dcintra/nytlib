$(document).ready(function() {
    function page_bookshelf() {
        bookshelf = renderShelf(getBooks());
        $('#content_block').html(bookshelf);
    }

    $('#nav_bookshelf').click(function(event) {
        event.preventDefault();
        page_bookshelf();
    });

    function img(book) {
        console.log(book);
        placeholder = "http://placehold.it/85x128";
        book_t = '<img src="%src%" />';
        if(book.book_image != null ) {
            return book_t.replace('%src%', book.book_image);
        } else {
            return book_t.replace('%src%', placeholder);
        }
    }

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
        return list;
    }

    function renderShelf(list) {
        t_book = [
            '<li class="book" data-json="%json%">',
                '<div class="col-md-4">',
                    '<div class="thumbnail">',
                        '%book_img%',
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

        t_shelf = [
            '<div class="row clearfix" id="shelf_%listslug%">',
                '<div class="col-md-12 column">',
                    '<h3>%title%</h3>',
                '</div>',
            '</div>',
            '<div class="row clearfix">',
                '<div class="col-md-12 column">',
                    '%books%',
                '</div>',
            '</div>'
        ].join("\n");

        books = ""
        jQuery.each(list['books'], function(i, book) {
            r_book = t_book;
            $.each({
                'json': JSON.stringify(book).replace(/"/g, '&quot;'),
                'title': book.title,
                'author': book.author,
                'description': book.description,
                'book_img': img(book)
            }, function(key, value) {
                r_book = r_book.replace('%'+key+'%', value);
            });
            books += r_book;
        });

        r_shelf = t_shelf;
        $.each({
            'title': "Bookshelf",
            'listslug': 'bookshelf',
            'books': books,
        }, function(key, value) {
            r_shelf = r_shelf.replace('%'+key+'%', value);
        });
        return r_shelf;
    }

    $('a.add-to-shelf').click(function(event) {
        event.preventDefault();
        book = jQuery.parseJSON($(this).closest('.book').attr("data-json"));
        addBook(book);
        console.log('Adding book to shelf:');
        console.log(book);
    });
});
