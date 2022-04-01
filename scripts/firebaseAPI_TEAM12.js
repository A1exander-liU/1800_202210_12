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


// Populate event cards
function displayEventCards(collection) {
  let eventTemplate = document.getElementById("eventTemplate");

  db.collection(collection).get()
    .then(snap => {
      var i = 1;
      snap.forEach(doc => { //iterate thru each doc
        var title = doc.data().name;
        var details = doc.data().details;
        var image = doc.data().image;
        let newcard = eventTemplate.content.cloneNode(true);

        //update title and text and image
        newcard.querySelector('.card-title').innerHTML = title;
        newcard.querySelector('.card-text').innerHTML = details;
        // newcard.querySelector('.card-img').src = image;

        //give unique ids to all elements for future use
        //newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
        //newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
        //newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

        document.getElementById("eventsList").appendChild(newcard);
        i++;
      })
    })
}

if($("body").is("#eventsPage")){
  displayEventCards("events");
}
