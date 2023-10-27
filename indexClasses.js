// Define constructor functions
// define methods on the constructor function's prototype property
// Define inheriting constructor functions (use call() to call parent)
// Set Object.setPrototypeOf(child.prototype, parent.prototype) to link prototypes
// Define methods on the child's prototype property
// Use the new keyword to instantiate objects


class Library {
    
    constructor() {
    // book object stores key, value of id and book object
    this.books = {};
    // array of book ids
    this.bookIds = [];
    };
    
    // function add book to library
    addBook = function(book) {
        
        // increment new book id
        const id = book.book_id;
        // add book object to books object
        this.books[id] = book;
        // add book id to bookIds array
        this.bookIds.push(id);
        
    }
    // function remove book from library
    removeBook = function(id) {
        // remove book object from books object
        delete this.books[id];
        // remove book id from bookIds array
        const index = this.bookIds.indexOf(id);
        this.bookIds.splice(index, 1);
        return true;
    }
    
    // function change read status of book
    changeReadStatus = function(id) {
        // change read status of book object
        this.books[id].read = !this.books[id].read;
    }
    
    // function render library to html
    renderLibrary = function() {
        // clear html
        const cardContainer = document.querySelector('.card-container');
        cardContainer.innerHTML = "";
        // loop through books object
        for (const book in this.books) {
            // render book to html
            this.renderBook(this.books[book]);
        }
        
        
        addEventListeners();
    }
    
    renderBook = function(book) {
        // Populate html with books from myLibrary
        const cardTemplate = document.getElementById('book-card-template');
        const cardContainer = document.querySelector('.card-container');
        const card = cardTemplate.cloneNode(true);
        card.dataset.bookId = book.book_id;
        card.querySelector('.book-title').textContent = book.title;
        card.querySelector('.author').textContent = book.author;
        card.querySelector('.pages').textContent = book.pages + " pages";
        if(book.read) {
            card.querySelector('.btn-read').textContent = "Read";
            card.querySelector('.btn-read').classList.add('btn-light-green');
        } else {
            card.querySelector('.btn-read').textContent = "Unread";
            card.querySelector('.btn-read').classList.add('btn-light-red');
        }
        
        // card.querySelector('.read').textContent = book.read;
        card.removeAttribute('id');
        card.removeAttribute('hidden');
        card.classList.add('book-card');
        cardContainer.appendChild(card);
        
        }
    };


    class Book {
        constructor(title, author, pages, read) {
          this.book_id = Book.nextId(); // Get the next ID
          this.title = title;
          this.author = author;
          this.pages = pages;
          this.read = Boolean(read);
        }
      
        // A method to generate the next book ID
        static nextId() {
          if (!this.latestId) {
            this.latestId = 0;
          }
          this.latestId += 1;
          return this.latestId;
        }
      }


// create myLibrary object
const myLibrary = new Library();

// Dummy data
myLibrary.addBook(new Book('The Hobbit', 'J.R.R. Tolkien', 295, true));
myLibrary.addBook(new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', 423, true));
myLibrary.addBook(new Book('The Two Towers', 'J.R.R. Tolkien', 352, false));

myLibrary.renderLibrary();

// submit new book form, add book details to myLibrary and render to html
const form = document.querySelector('#addBookForm');
const submitButton = document.querySelector('#addBookFormSubmit');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const title = formData.get('title');
    const author = formData.get('author');
    const pages = formData.get('pages');
    const read = formData.get('read');

    myLibrary.addBook(new Book(title, author, pages, read));
    myLibrary.renderLibrary();
})



// when user clicks add book button, display form and overlay
const addBookButton = document.querySelector('#add-book-button');
const formContainer = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

addBookButton.addEventListener('click', () => {
    formContainer.classList.add('active');
    overlay.classList.add('active');
})

// when user clicks outside of form, close form
overlay.addEventListener('click', () => {
    formContainer.classList.remove('active');
    overlay.classList.remove('active');
})


// add event listeners to all butttons:
function addEventListeners() {
//  when user clicks "Remove" on card, remove card from library and html
const removeButtons = document.querySelectorAll('.btn-remove');

removeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const card = button.parentElement;
        const id = card.dataset.bookId;
        myLibrary.removeBook(id);
        card.remove();
    })
})

// when user clicks "Read" on card, change read status of book
const readButtons = document.querySelectorAll('.btn-read');
readButtons.forEach((button) => { 
    button.addEventListener('click', () => {
        const card = button.parentElement;
        const id = card.dataset.bookId;
        myLibrary.changeReadStatus(id);
        if(myLibrary.books[id].read) {
            card.querySelector('.btn-read').textContent = "Read";
            card.querySelector('.btn-read').classList.remove('btn-light-red');
            card.querySelector('.btn-read').classList.add('btn-light-green');
        } else {
            card.querySelector('.btn-read').textContent = "Unread";
            card.querySelector('.btn-read').classList.remove('btn-light-green');
            card.querySelector('.btn-read').classList.add('btn-light-red');
        }
    })
});

}
