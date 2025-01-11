const myLibrary = [];
let booksCount = 0;
let readCount = 0;
let unreadCount = 0;
document.querySelector('.read-count').textContent = `BOOKS READ: ${readCount}`;
document.querySelector('.unread-count').textContent = `BOOKS UNREAD: ${unreadCount}`;
document.querySelector('.total-count').textContent = `TOTAL BOOKS: ${booksCount}`;

function Book (name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read; 
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

// Validating Inputs 
function validateInputs(title, author, pages, read) {
    if (isNaN(pages) || pages < 0) {
        alert("Please enter a valid number of pages!");
        return false;
    }
    
    if (read.toLowerCase() !== "yes" && read.toLowerCase() !== "no") {
        alert("Please enter 'Yes' or 'No' for the 'Have you read this book?' field.");
        return false;
    }

    return true;
}

function displayLibrary() {
    const displayDiv = document.querySelector('.display');
    displayDiv.innerHTML = " ";

    myLibrary.forEach((book, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        
        const bookName = document.createElement('p');
        bookName.textContent = `Title: ${book.name}`;
        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = `Author: ${book.author}`;
        const bookPages = document.createElement('p');
        bookPages.textContent = `Pages: ${book.pages}`;
        const bookRead = document.createElement('p');
        if (book.read.toLowerCase() === "yes" ) {
            bookRead.textContent = "Status: Read"
        } else {
            bookRead.textContent = "Status: Unread"
        }

        const deleteIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        deleteIcon.setAttribute('viewBox', '0 0 24 24');
        deleteIcon.innerHTML = '<title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />';
        console.log(index);
        deleteIcon.setAttribute('data-index', index);
        deleteIcon.addEventListener('click', deleteBook);

        cardDiv.appendChild(bookName);
        cardDiv.appendChild(bookAuthor);
        cardDiv.appendChild(bookPages);
        cardDiv.appendChild(bookRead);
        cardDiv.appendChild(deleteIcon);

        displayDiv.appendChild(cardDiv);
    })

}

// handling form submission
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const pages = document.getElementById('pages').value.trim();
    const read = document.getElementById('read').value.trim();

    if (validateInputs(title, author, pages, read)) {
        form.reset();
        addBookToLibrary(title, author, pages, read);
        displayLibrary();
        if (read.toLowerCase() == 'yes') {
            readCount ++;
        } else {
            unreadCount ++;
        }
        booksCount ++;

        document.querySelector('.read-count').textContent = `BOOKS READ: ${readCount}`;
        document.querySelector('.unread-count').textContent = `BOOKS UNREAD: ${unreadCount}`;
        document.querySelector('.total-count').textContent = `TOTAL BOOKS: ${booksCount}`;
    }
})

document.querySelector('.del-btn').addEventListener('click', () => {
    myLibrary.splice(0, myLibrary.length);
    booksCount = 0;
    readCount = 0;
    unreadCount = 0;
    document.querySelector('.read-count').textContent = `BOOKS READ: ${readCount}`;
    document.querySelector('.unread-count').textContent = `BOOKS UNREAD: ${unreadCount}`;
    document.querySelector('.total-count').textContent = `TOTAL BOOKS: ${booksCount}`;

    displayLibrary();
})

function deleteBook(event) {
    const index = parseInt(event.currentTarget.getAttribute('data-index'));
    console.log(index);
    if (myLibrary[index].read.toLowerCase() === 'yes') {
        readCount --;
    } else {
        unreadCount --;
    }
    booksCount --;
    document.querySelector('.read-count').textContent = `BOOKS READ: ${readCount}`;
    document.querySelector('.unread-count').textContent = `BOOKS UNREAD: ${unreadCount}`;
    document.querySelector('.total-count').textContent = `TOTAL BOOKS: ${booksCount}`;
    
    myLibrary.splice(index, 1);
    displayLibrary();
}