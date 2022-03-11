//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {

    apiKey: "AIzaSyCb__58824LVtXt1PaBcnGa8HhUxYHWuH4",
    authDomain: "comp1800-dtc12-project.firebaseapp.com",
    projectId: "comp1800-dtc12-project",
    storageBucket: "comp1800-dtc12-project.appspot.com",
    messagingSenderId: "411197309803",
    appId: "1:411197309803:web:cbe1dbf0f9711c6b99822e",
    measurementId: "G-8R33N9D6ZZ"
  
  };
  

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();