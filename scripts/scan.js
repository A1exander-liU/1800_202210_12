function get_user_location() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(show_current_position)
  }
}
get_user_location()

var userlat;
var userlong;

function show_current_position(position) {
  userlat = position.coords.latitude;
  userlong = position.coords.longitude;
  nextStep();
}

function nextStep() {
  console.log(userlat)
  console.log(userlong)
}

// timestamp
$(".pocket").click(function() {
  const timestamp = firebase.firestore.Timestamp.now();
  console.log(timestamp);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      var currentUser = db.collection("users").doc(user.uid);
      currentUser.get().then(userDoc => {
        var userName = userDoc.data().name;
        console.log(userName);
      })

      db.collection("history").add({
        name: currentUser,
        timeStamp: timestamp,
      })
    }
  })
})

// display name (can change where we want to display their name)
firebase.auth().onAuthStateChanged(user => {
  // Check if user is signed in:
  if (user) {                                                                
      currentUser = db.collection("users").doc(user.uid);
      //get the document for current user.
      currentUser.get()
      .then(userDoc => {
         var username = userDoc.data().name; // getting user name
         console.log(username); // checkin if it is right
         $("#username").text(username);            
      })
  } else {
      // No user is signed in.
  }
});


// Populate history cards
function displayHistoryCards(collection) {
  let eventTemplate = document.getElementById("historyTemplate");

  db.collection(collection).get()
    .then(snap => {
      var i = 1;
      snap.forEach(doc => { //iterate thru each doc
        var timestamp = doc.data().timeStamp;
        var date = timestamp.toDate();
        console.log(date);
        let newcard = historyTemplate.content.cloneNode(true);

        newcard.querySelector('strong').innerHTML = i + " :"
        newcard.querySelector('.time-stamp').innerHTML = date;

        document.getElementById("historyList").appendChild(newcard);
        i++;
      })
    })
}

if($("body").is("#historyPage")){
  displayHistoryCards("history");
}
