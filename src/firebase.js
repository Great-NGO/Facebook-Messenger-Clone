import firebase from 'firebase';

// 
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD_ID3OiQjoR9syuBhNMNxR-TvXyJqZDUE",
    authDomain: "facebook-messenger-clone-5edfb.firebaseapp.com",
    projectId: "facebook-messenger-clone-5edfb",
    storageBucket: "facebook-messenger-clone-5edfb.appspot.com",
    messagingSenderId: "908686924627",
    appId: "1:908686924627:web:0a56afc647601191bf5fa6",
    measurementId: "G-GT5V9SBJE3"
})


const db = firebaseApp.firestore(); //Initialize the app with firestore

export { db };