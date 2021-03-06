"use strict";
// console.log("book-interaction");

let $ = require('jquery'),
firebase = require("./config");



function getBook() {
    return $.ajax({
       url: `${firebase.getFBsettings().databaseURL}/book.json`
            }).done((bookData) => {
                // console.log("book-int line-11",bookData);
                return bookData;
    }).fail((error)=>{
        return error;
    });
}

function addBook(bookObj) {
    console.log("addBook", bookObj);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/book.json`,
        type: 'POST',
        data: JSON.stringify(bookObj),
        dataType: 'json'
    }).done((bookID) => {
        
        return bookID;
    });
}

function deleteBook(bookId) {
    // console.log("deletebook line-30",bookId);
        return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/book/${bookId}.json`,
        method: "DELETE"
    }).done((bookData) => {
        // console.log("book-interaction line-35",bookData);
        return bookData;

    });
}
deleteBook();


function editBook(bookObj, bookId) {
    console.log("edit button clicked", bookObj);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/book/${bookId}.json`,
        type: 'PUT',
        data: JSON.stringify(bookObj),
        dataType: 'json'
    }).done((data) => {
        return data;
    });
}

// due books
function getDueBook() {
     return getBook().then((ove) => {
            const dueDa = [];
            for (let key in ove) {
                if (ove[key].due !== null || 'undefined') {
                    dueDa.push(ove[key]);
                    // console.log("getdueda", dueDa);
                }

         } return dueDa;

        });
    }

         //book with userId

// function getUserBook(user) {
//     return $.ajax({
//         url: `${firebase.getFBsettings().databaseURL}/book.json?orderBy="uid"&equalTo="${user}"`
//             }).done((bookData) => {
//                 return bookData;
//             }).fail((error) => {
//                 return error;
//             });
// }

//read books

         //Library books

function getLibBook(){
    return getBook().then((lib) => {
        const library = [];
            for (let key in lib) {
            if (lib[key].type === "library") {
                library.push(lib[key]);

        }
        } return library;

    });
}

         //bought

function getBuyBook() {
    console.log("why get buy books",getBook());
    return getBook().then((bou) => {
        const bought = [];
        for (let key in bou) {
            if (bou[key].type === "bought") {
                bought.push(bou[key]);

            }
        } return bought;

    });
}

          //borrow

function getBrBook() {
    return getBook().then((bro) => {
        const borrow = [];
        for (let key in bro) {
            if (bro[key].type === "borrow") {
                borrow.push(bro[key]);

             }

        } return borrow;

    });
}


// function addUserBook(bookObj) {
//     // console.log("addBook", bookObj);
//     return $.ajax({
//         url: `${firebase.getFBsettings().databaseURL}/user.json`,
//         type: 'POST',
//         data: JSON.stringify(bookObj),
//         dataType: 'json'
//     }).done((bookObj) => {
//         // console.log("use book obj", bookObj);
//         return bookObj;
//     });
// }

    //ajaxCall

// function ajaxCalls(book) {
//     console.log("myBooks", book);
//      let myBookArr = [];
//     return $.ajax({
//         url: `${firebase.getFBsettings().databaseURL}/book/${book.fbId}.json?`
//     }).done((bookData) => {
//         // console.log("calling + ajax + users book",bookData);
//         myBookArr.push(myBookArr);
//         return myBookArr;
//     });
// }

// This module makes a call to the Open Library API

module.exports = {
    getBook,
    addBook,
    deleteBook,
    editBook,
    // getReadBook,
    // getDueBook,
    // getLibBook,
    // getUserBook,
    // ajaxCalls,
    // addUserBook,
    // getBrBook,
    // getBuyBook,
    // booksGetter,
    // getebook
};


// https://developer.mozilla.org/en-US/Apps/Fundamentals/User_notifications/Check
// ing_when_a_deadline_is_due