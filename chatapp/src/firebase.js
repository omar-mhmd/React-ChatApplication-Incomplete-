import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyCU37IKmhCm6EoadpBBCmbzOaDSa89dums",
    authDomain: "react-chat-app-f36c7.firebaseapp.com",
    databaseURL: "https://react-chat-app-f36c7.firebaseio.com",
    projectId: "react-chat-app-f36c7",
    storageBucket: "react-chat-app-f36c7.appspot.com",
    messagingSenderId: "1085540471867",
    appId: "1:1085540471867:web:6ed43ad9162318d1e6f81e",
    measurementId: "G-0YEGFWCV2P"
  };
  firebase.initializeApp(firebaseConfig);
  

  export default firebase;