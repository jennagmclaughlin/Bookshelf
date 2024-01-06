const bookshelf = document.body.querySelector('#bookshelf .books');

// form
const bookTitleInput = document.body.querySelector('#bookTitle');
const bookAuthorInput = document.body.querySelector('#bookAuthor');
const bookTotalPagesInput = document.body.querySelector('#totalPages');
const noFinishedInput = document.body.querySelector('#noFinished');
const yesFinishedInput = document.body.querySelector('#yesFinished');
const bookPagesReadInput = document.body.querySelector('#pagesRead');
// div inside form
const formDiv = document.body.querySelector('form div');
const addBook = document.body.querySelector('#addBook');

// sets it so this is checked when loading page
yesFinishedInput.checked = true;

yesFinishedInput.addEventListener('click', function() {
    formDiv.style.display = 'none';
});

noFinishedInput.addEventListener('click', function() {
    formDiv.style.display = 'block';
});

// sets up array for books
const myBooks = [];
var bookCounter = 0;

// the constructor
function Book(id, title, author, pagesRead, totalPages, status) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pagesRead = pagesRead;
    this.totalPages = totalPages;
    this.status = status;

    if (this.totalPages == this.pagesRead) {
        this.status = 'Finished';
    } else {
        this.status = `${this.pagesRead}/${this.totalPages} pages read`;
    }

    // create html for each book
    var buttonID = 'finishedBtn' + this.id;
    var removeButtonID = 'removeBtn' + this.id;

    this.htmlMarkup = `
        <div id="book${this.id}" class="book">
            <h3 class="bookTitle">${this.title}</h3>
            <h4 class="bookAuthor">${this.author}</h4>
            <p class="status">${this.status} &nbsp;&nbsp;&nbsp; <button id="${buttonID}" type="button" class="finishedBtn">(Mark as finished)</button></p>
            <button id="${removeButtonID}" type="button" class="removeBtn">X</button>
        </div>
    `

    // give html context to book, then append it inside the bookshelf
    this.book = document.createRange().createContextualFragment(this.htmlMarkup);
    bookshelf.appendChild(this.book);
    // if status is finished, do not show "mark as finished"
    if(this.status === 'Finished') {
        document.body.querySelector('#' + buttonID).style.display = 'none';
    }
    // mark book as finished
    document.body.querySelector('#' + buttonID).addEventListener('click', function() {
        this.status = 'Finished';
        document.body.querySelector('#book' + id).querySelector('.status').innerHTML = 'Finished';
        document.body.querySelector('#' + buttonID).style.display = 'none';
    });
    // removes from dom when click on x button
    document.body.querySelector('#' + removeButtonID).addEventListener('click', function() {
        document.body.querySelector('#book' + id).remove();
    });
}

function addBookToBookshelf() {
    var newBookTitle = bookTitleInput.value;
    var newBookAuthor = bookAuthorInput.value;
    var newBookTotalPages = bookTotalPagesInput.value;
    var newBookPagesRead = bookPagesReadInput.value;
    var newBookStatus = '';

    // if the book is finished, set pages read to equal total pages
    if(yesFinishedInput.checked) {
        newBookPagesRead = newBookTotalPages;
    } 

    if(newBookTotalPages < newBookPagesRead) {
        window.alert('Pages read is greater than total pages.');
    } else {
        bookCounter++;
        myBooks.push(new Book(bookCounter, newBookTitle, newBookAuthor, newBookPagesRead, newBookTotalPages, newBookStatus));
    }
}

addBook.addEventListener('click', function() {
    addBookToBookshelf();
});