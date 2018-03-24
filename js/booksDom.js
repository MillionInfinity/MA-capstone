"use strict";
console.log("print on to dom");
let $ = require('jquery'),
    user=require("./user");



function makeBookList(bookList) {
    console.log(bookList);
    let booksDisplay =
        $(`<div class="uiContainer__book-list box col s12">
    <ul class="book-list">
    </ul>
  </div>`);
    $(".uiContainer--wrapper").html(booksDisplay);
    for (let book in bookList) {
        let currentBook = bookList[book],
            bookListItem = $("<li>", { class: "book-list__item" }),
            title = $("<span/>", { class: "book-title" }).text(currentBook.title),
            bookListData = $("<ul/>", { class: "book-list__item--data" }),
            bookListEdit = $("<a>", { "data-edit-id": book, class: "edit-btn waves-effect waves-light btn", text: "edit" }),
            bookListDelete = $("<a>", { "data-delete-id": book, class: "delete-btn waves-effect waves-light btn", text: "delete" });
        // Same as `<a id="${song}" class="delete-btn waves-effect waves-light btn">delete</a>`

        bookListData.append(
            `<li>${currentBook.title}</li>
                    <li>${currentBook.author}</li>
                    <li>${currentBook.dueDate}</li>`);

        $(".book-list").append(bookListItem.append(title));
        $(".book-list").append(bookListItem.append(bookListData).append(bookListDelete).append(bookListEdit));
    }
}



function bookForm(book, bookId) {
    return new Promise((resolve, reject) => {
        let bookItem = {
            title: book ? book.title : "",
            author: book ? book.author : "",
            dueDate: book ? book.dueDate : "",
            place: book ? book.place : "",
            type: book ? book.type : "",
            description: book ? book.description : "",
            formTitle: book ? `Edit "${book.title}"` : "Add a new book",
            btnText: book ? "save changes" : "save book",
            btnId: book ? "save_edit_btn" : "save_new_btn"
        },
            form =
                `<h3>${bookItem.formTitle}</h3>
                <input type="text" id="form--title" placeholder="Title" value="${bookItem.title}"></input>
                <input type="text" id="form--artist" placeholder="Author" value="${bookItem.author}"></input>
                <input type="text" id="form--album" placeholder="Due Date" value="${bookItem.dueDate}"></input>
                <input type="text" id="form--title" placeholder="Place" value="${bookItem.place}"></input>
                <input type="text" id="form--album" placeholder="Type" value="${bookItem.type}"></input>
                <input type="text" id="form--year" placeholder="Description" value="${bookItem.description}"></input>
                <button id="${bookId}" class=${bookItem.btnId}>${bookItem.btnText}</button>`;
        resolve(form);
    });
}
function buildBookObj() {
    let bookObj = {
        title: $("#form-title").val(),
        author: $("#form-author").val(),
        dueDate: $("#form-dueDate").val(),
        image: $("#form-image").val(),
        place: $("#form-place").val(),
        type: $("form-type").val(),
        description: $("form-description").val(),
        read: false,
        uid: user.getUser()
    };
    return bookObj;
}
// Load the new book form
$("#add-book").click(function (builObj) {
    console.log(" print mymy book");
    var booktoForm =bookForm()
        .then((booktoForm) => {
            $(".uiContainer--wrapper").html(booktoForm);
        });
});

module.exports = { makeBookList, bookForm, buildBookObj};