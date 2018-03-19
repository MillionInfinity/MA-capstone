"use strict";
let $=require("jquery"),
    user=require("./user-add"),
    firebase=require("./config"),
    provider =firebase.auth.GoogleAuthProvider();
//DO YOU HAVE AN ID?
    function getFBDetails(user){
        return $.ajax({
            url: `${firebase.getFBsettings().databaseURL}//user.json?orderBy="uid"&equalTo="${user}"`
    }).done((resolve) => {
        return resolve;
    }).fail((error) => {
        return error;
    });
}

//FIREBASE KNOCK KNOCK //
function addUser(userObj) {
    console.log("add user to firebase", userObj);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/userInfo.json`,
        type: 'POST',
        data: JSON.stringify(userObj),
        dataType: 'json'
    }).done((userID) => {
        return userID;
    });
}

function updateUserFB(userObj) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/user/${userObj.userID}.json`,
        type: 'PUT',
        data: JSON.stringify(userObj),
        dataType: 'json'
    }).done((userID) => {
        return userID;
    });
}
function createUser(userObj) {
    return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
        .catch(function (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("error:", errorCode, errorMessage);
        });
}
function loginUser(userObj) {
    return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
        .catch(function (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("error:", errorCode, errorMessage);
        });
}

function logInGoogle() {
    //all firebase functions return a promise!! Add a then when called
    return firebase.auth().signInWithPopup(provider);
}

function logOut() {
    return firebase.auth().signOut();
}

module.exports = { addUser, getFBDetails, updateUserFB, createUser,loginUser};