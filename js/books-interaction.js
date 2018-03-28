 "use strict";
           console.log("book-interaction");
let $ = require('jquery'),
            firebase = require("./config"),
            aBook={},
            myBookArr=[];
         let librar = [];
        // cuseronsole.log("firebase", firebase.getFBsettings().dataBaseURL);

function getBook() {
              return $.ajax({
            url: `${firebase.getFBsettings().databaseURL}/book.json`
            }).done((bookData) => {
            console.log("i can able to get all books without user", bookData);
               return bookData;
            });
}

// function heyLibrary() {
//     getBook().then((lib) => {
//       for (var i = 0; i < lib.length; i++) {
//             var libType = lib[i].type;
//              if (lib[i]==="library") {
//              librar.push(libType);
//        } else {
//               alert("Sorry! there is no library books there");
//       }
//           return libType;
//         }
//     });
// } 
// heyLibrary();

function ajaxCalls(myBooks) {
            console.log("myBooks", myBooks);
            return $.ajax({
            url: `${firebase.getFBsettings().databaseURL}/book/${myBooks.fbID}.json?`
         }).done((aooks) => {
            console.log("calling + ajax + users book", aBook);
            myBookArr.push(aBook);
        return aBook;
            });
}

function getSameBook(array) {
            console.log("getSameBook", array);
            let promiseArr = [];
        for (var i = 0; i < array.length; i++) {
            console.log("array[i]", array[i]);
            promiseArr.push(ajaxCalls(array[i]));
            }
        return Promise.all(promiseArr);
}

// POST - Submits data to be processed to a specified resource.
// addBook();

function deleteBook(bookId) {
            $.ajax({
                url: `${firebase.getFBsettings().databaseURL}/book/${bookId}.json`,
                method: "DELETE"
            }).done((data) => {
                return data;
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
function addUserBook(bookObj) {
            console.log("addBook", bookObj);
            return $.ajax({
                url: `${firebase.getFBsettings().databaseURL}/user.json`,
                type: 'POST',
                data: JSON.stringify(bookObj),
                dataType: 'json'
            }).done((bookObj) => {
                console.log("use book obj", bookObj);
                return bookObj;
            });
}


function editBook(bookObj, bookId) {
            return $.ajax({
                url: `${firebase.getFBsettings().databaseURL}/book/${bookId}.json`,
                type: 'PUT',
                data: JSON.stringify(bookObj)
             }).done((data) => {
                return data;
            });
        }

module.exports = { getBook,
                        // heyLibrary,
                        // getUserBook,
                        ajaxCalls,
                        addBook,
                        addUserBook,
                        getSameBook,
                        deleteBook,
                        editBook 
                };












