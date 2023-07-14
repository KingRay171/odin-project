let myLibrary = [];

const addButton = document.querySelector(".add");
const dialog = document.querySelector("dialog");
const closeDialog = document.querySelector(".close-dialog");
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const bookRead = document.querySelector("#read");
const library = document.querySelector(".library");
const submitButton = document.querySelector("#submit");

let operation = "";
let rowToEdit = null;

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.setRead = (state) => (this.read = state);
}

function addBookToLibrary() {
  myLibrary.push(
    new Book(
      bookTitle.value,
      bookAuthor.value,
      bookPages.value,
      bookRead.checked
    )
  );
  let row = document.createElement("tr");

  let title = document.createElement("td");
  title.textContent = bookTitle.value;

  let author = document.createElement("td");
  author.textContent = bookAuthor.value;

  let pages = document.createElement("td");
  pages.textContent = bookPages.value;

  let read = document.createElement("td");
  read.textContent = bookRead.checked ? "Yes" : "No";

  let changeRead = document.createElement("button");
  changeRead.textContent = "Change Read Status";
  changeRead.addEventListener("click", () => {
    read.textContent = read.textContent === "Yes" ? "No" : "Yes";
  });
  let changeReadTD = document.createElement("td");
  changeReadTD.appendChild(changeRead);

  let edit = document.createElement("button");
  edit.textContent = "Edit";
  edit.addEventListener("click", () => {
    operation = "edit";
    rowToEdit = edit.parentElement;

    dialog.showModal();
  });
  let editTD = document.createElement("td");
  editTD.appendChild(edit);

  let remove = document.createElement("button");
  remove.textContent = "Delete";
  remove.addEventListener("click", () => {
    library.removeChild(row);
  });
  let removeTD = document.createElement("td");
  removeTD.appendChild(remove);

  row.appendChild(title);
  row.appendChild(author);
  row.appendChild(pages);
  row.appendChild(read);
  row.appendChild(changeReadTD);
  row.appendChild(editTD);
  row.appendChild(removeTD);
  library.appendChild(row);
}

addButton.addEventListener("click", () => {
  operation = "add";
  rowToEdit = null;
  dialog.showModal();
});

closeDialog.addEventListener("click", () => dialog.close());

const showError = () => {
  let alertString = "Invalid";
  if (!bookTitle.validity.valid) {
    alertString += " title,";
  }

  if (!bookAuthor.validity.valid) {
    alertString += " author,";
  }

  if (!bookPages.validity.valid) {
    alertString += " pages,";
  }

  if (!bookRead.validity.valid) {
    alertString += " read state";
  }

  alert(alertString);
};

bookTitle.addEventListener("input", (e) => {});

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    bookTitle.validity.valid &&
    bookAuthor.validity.valid &&
    bookPages.validity.valid &&
    bookRead.validity.valid
  ) {
    if (operation === "add") {
      addBookToLibrary();
    } else if (operation === "edit") {
      rowToEdit.children[0].textContent = bookTitle.value;
      rowToEdit.children[1].textContent = bookAuthor.value;
      rowToEdit.children[2].textContent = bookPages.value;
      rowToEdit.children[3].textContent = bookRead.checked ? "Yes" : "No";
      dialog.close();
    }
  } else {
    showError();
  }
});
