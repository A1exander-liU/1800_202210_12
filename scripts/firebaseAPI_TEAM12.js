//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
// const firebaseConfig = {

//     apiKey: "AIzaSyCb__58824LVtXt1PaBcnGa8HhUxYHWuH4",
//     authDomain: "comp1800-dtc12-project.firebaseapp.com",
//     projectId: "comp1800-dtc12-project",
//     storageBucket: "comp1800-dtc12-project.appspot.com",
//     messagingSenderId: "411197309803",
//     appId: "1:411197309803:web:cbe1dbf0f9711c6b99822e",
//     measurementId: "G-8R33N9D6ZZ"

//   };

  const firebaseConfig = {
    apiKey: "AIzaSyDfG_EnZlYF8Z9fUWNWIpIJy4p1WBIx2H4",
    authDomain: "dtc-12.firebaseapp.com",
    projectId: "dtc-12",
    storageBucket: "dtc-12.appspot.com",
    messagingSenderId: "68678619104",
    appId: "1:68678619104:web:bf2c2fd10da35a19bda585"
  };

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
