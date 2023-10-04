const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = Boolean(read);
    }

    function addBookToLibrary(){

    }


myLibrary.push(new Book('The Hobbit', 'J.R.R. Tolkien', 295, true));
myLibrary.push(new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', 423, true));
myLibrary.push(new Book('The Two Towers', 'J.R.R. Tolkien', 352, false));



// Populate html with books from myLibrary
const cardTemplate = document.getElementById('book-card-template');
const cardContainer = document.querySelector('.card-container');

function renderBook(book){

    const card = cardTemplate.cloneNode(true);
    card.querySelector('.book-title').textContent = book.title;
    card.querySelector('.author').textContent = book.author;
    card.querySelector('.pages').textContent = book.pages;
    card.querySelector('.read').textContent = book.read;
    card.removeAttribute('id');
    card.removeAttribute('hidden');
    card.classList.add('book-card');
    cardContainer.appendChild(card);
   
}

myLibrary.forEach(book => {renderBook(book)});
