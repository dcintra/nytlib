$(document).ready(function() {
    function page_bookshelf() {
        bookshelf = renderShelf(getBooks());
        $('#content_block').html(bookshelf);
        $('a.remove-from-shelf').click(function(event) {
            event.preventDefault();
            book = jQuery.parseJSON($(this).closest('.book').attr("data-json"));
            store.remove(book.primary_isbn13);
            $(this).closest('.book').fadeOut();
            console.log('Removing book from shelf:');
            console.log(book);
        });
    }

    $.page_bookshelf = page_bookshelf;

    function img(book) {
        console.log(book);
        placeholder = "http://placehold.it/470x680&text=Missing%20Cover";
        book_t = '%src%';

        if(book.book_image != null ) {
            return book_t.replace('%src%', book.book_image);
        } else {
            return book_t.replace('%src%', placeholder);
        }
    }

    $('a.add-to-shelf').click(function(event) {
        event.preventDefault();
        book = jQuery.parseJSON($(this).closest('.book').attr("data-json"));
        store.set(book.primary_isbn13, book);
        $(this).removeClass('btn-primary');
        $(this).addClass('btn-success');
        $(this).html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Added');
        $('#nav_bookshelf').fadeOut('fast', function() {
            $(this).addClass('alert-success').fadeIn('fast', function() {
                $(this).fadeOut('fast', function() {
                    $(this).removeClass('alert-success').fadeIn();
                });
            });
        });
        console.log('Adding book to shelf:');
        console.log(book);
    });

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
            '<li class="book book-two" data-json="%json%">',
                '<div class="col-md-4">',
                    '<div class="thumbnail" style="background-image: url(%book_img%)">',
                        '<div class="caption">',
                            '<h4>%title%</h4>',
                            '<h5>%author%</h5>',
                            '<p>%description%</p>',
                            '<p><a class="btn btn-default remove-from-shelf" href="#"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Remove</a>',
                            '<a class="btn" href="#modal-container" onclick="javascript:callBookReview(&quot;%title%&quot;,&quot;%author%&quot;);" data-toggle="modal">Reviews</a>',
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

        if (list['books'].length == 0) {
            books = '<div class="alert alert-info" role="alert"><strong>No books yet!</strong> Add books from bestseller lists or search.</div>';
            books += '<div style="font-size: 300px; color: #eee; text-align: center; margin-top: 100px"><span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></div>';
        }

        jQuery.each(list['books'], function(i, book) {
            r_book = t_book;
            $.each({
                'json': JSON.stringify(book).replace(/"/g, '&quot;'),
                'title': book.title,
                'author': book.author,
                'description': book.description,
                'book_img': img(book)
            }, function(key, value) {
                var find = '%'+key+'%';
                var re = new RegExp(find, 'g');
                r_book = r_book.replace(re, value);
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
});
