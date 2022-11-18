// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore' 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiW6RxdXH9muGh-wnRRJ8D3VUAQQm9Lz8",
  authDomain: "crud-91fa9.firebaseapp.com",
  projectId: "crud-91fa9",
  storageBucket: "crud-91fa9.appspot.com",
  messagingSenderId: "885269606395",
  appId: "1:885269606395:web:e75b5007d398d2d403255e",
  measurementId: "G-5JJL0WMWX5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export {firebase}