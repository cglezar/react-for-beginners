import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDj4LF7tdJa7RZK8bVdgjkoiFds1L09BVo",
    authDomain: "catch-of-the-day-cesar-glez.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-cesar-glez.firebaseio.com"
});


const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;