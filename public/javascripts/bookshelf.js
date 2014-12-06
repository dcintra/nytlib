function addBook(book) {
    store.set(book.primary_isbn13, book);
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
