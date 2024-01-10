const referenceContainer = document.querySelector('.reference');
const myLibrary = [];
const root = document.documentElement;
const btnTheme = document.querySelector('.theme-control');
let themeControl = false;

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary() {
    const title = document.getElementById('name').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const status = document.getElementById('status').textContent;

    const book = new Book(title, author, pages, status);

    myLibrary.push(book);
}

function getAddBtn() {
    const addBtn = document.createElement('button');
    addBtn.className = 'add-book center-div';
    const imgElement = document.createElement('img');
    imgElement.src = 'add-book-icon.svg';
    imgElement.onclick = getFields;
    addBtn.appendChild(imgElement);
    referenceContainer.appendChild(addBtn);
}

function getFields() {
    document.querySelector('.add-book').remove();

    getFormContainer();
    getField('text', 'name');
    getField('text', 'author');
    getField('number', 'pages');
    getFieldStatus();
    saveField();
}

getAddBtn();

function getFormContainer() {
    const addForm = document.createElement('form');
    addForm.className = 'form-container';
    addForm.id = 'form';
    referenceContainer.appendChild(addForm);
    getEventForm();
}

function getField(type, id) {
    const referenceForm = document.querySelector('.form-container');
    const addNameField = document.createElement('div');
    addNameField.className = 'book';
    const input = document.createElement('input');
    input.id = id;
    input.setAttribute('required', 'true');
    input.className = 'new-book';
    input.type = type;
    addNameField.appendChild(input);
    referenceForm.appendChild(addNameField);
}

function getFieldStatus() {
    const referenceForm = document.querySelector('.form-container');
    const addStatusField = document.createElement('div');
    addStatusField.className = 'book center-div';
    const text = document.createElement('div');
    text.id = 'status';
    text.className = 'read-status';
    text.textContent = 'Not Read' ;
    text.addEventListener('click', function() {
        if(text.textContent == 'Not Read') {
            text.textContent = 'Read';
        }
        else {
            text.textContent = 'Not Read';
        }
    })
    addStatusField.appendChild(text);
    referenceForm.appendChild(addStatusField);
}

function saveField() {
    const referenceForm = document.querySelector('.form-container');
    const addDiv = document.createElement('div');
    addDiv.className = 'book center-div';
    const addBtn = document.createElement('button');
    addBtn.type = 'submit';
    addBtn.setAttribute('form', 'form');
    addDiv.appendChild(addBtn);
    const imgElement = document.createElement('img');
    imgElement.src = 'save-icon.svg';
    addBtn.appendChild(imgElement);
    referenceForm.appendChild(addDiv);
}

function getEventForm() {
    const formEvent = document.getElementById('form');

    formEvent.addEventListener('submit', function(event) {
        event.preventDefault();
        
        addBookToLibrary();
        console.log(myLibrary[0]);
    
        document.querySelectorAll('.book').forEach(deleteAllFields => deleteAllFields.remove());
        document.getElementById('form').remove();
    
        for (let i = 0; i < myLibrary.length; i++) {
            reloadingBooks(i);
          }
        getAddBtn();
      });
}

function reloadingBooks(book) {
    getProperties('title', book);
    getProperties('author', book);
    getProperties('pages', book);
    getStatusPropiety('status', book)
    getDeleteField(book);
  }

function getProperties(property, book) {
    const addNameField = document.createElement('div');
    addNameField.className = 'book';
    addNameField.textContent = myLibrary[book][property];
    referenceContainer.appendChild(addNameField);
}

function getStatusPropiety(property, book) {
    const addStatusField = document.createElement('div');
    addStatusField.className = 'book center-div';
    const text = document.createElement('div');
    text.className = 'read-status';
    text.setAttribute('index', book);
    text.textContent = myLibrary[book][property];
    text.addEventListener('click', function() {
        if(this.textContent == 'Not Read') {
            this.textContent = 'Read';
        }
        else {
            this.textContent = 'Not Read';
        }
        myLibrary[this.getAttribute('index')].status = this.textContent;
    })
    addStatusField.appendChild(text);
    referenceContainer.appendChild(addStatusField);
}

function getDeleteField(book) {
    const addDiv = document.createElement('div');
    addDiv.className = 'book center-div';
    const addBtn = document.createElement('button');
    addBtn.type = 'submit';
    addBtn.setAttribute('index', book);
    addBtn.addEventListener('click', function() {
        document.querySelectorAll('.book').forEach(deleteAllFields => deleteAllFields.remove());
        document.querySelector('.add-book').remove();
        myLibrary.splice(this.getAttribute('index'), 1);
        for (let i = 0; i < myLibrary.length; i++) {
            reloadingBooks(i);
          }
        getAddBtn();
    })
    addDiv.appendChild(addBtn);
    const imgElement = document.createElement('img');
    imgElement.src = 'delete-icon.svg';
    addBtn.appendChild(imgElement);
    referenceContainer.appendChild(addDiv);
}



btnTheme.addEventListener('click', function() {
    if (themeControl == false) {
        root.className = 'dark';
        themeControl = true;
    }
    else {
        root.className = 'light';
        themeControl = false;
    }

});




