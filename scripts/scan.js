let userlat;
let userlong;
let usercoords;
let useraddress;

function get_user_location() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(show_current_position) // getting their current coords
  }
}
get_user_location()

function show_current_position(position) {
  userlat = position.coords.latitude; // getting the lat from the coords
  userlong = position.coords.longitude; // getting the long from te coords
  console.log(userlat, userlong)
  // reverse geocode the coordinates to get the address


}

function format_address(address){ // storing the recieved object in this variable
  console.log("format address called")
  // console.log(address.results[0])
  city = address.results[0].locations[0].adminArea5 // just doing some traversal inside object to extract the city
  street = address.results[0].locations[0].street // just doing some traversal inside the object to extract the address
  // can change later what we want to extract out
  useraddress = city + ", " +  street // formatting and concatenating the city with the address
  // console.log(useraddress)
}

function get_user_address(){ // just to for api calling to reverse geocode/get address from coordinates
  console.log("ajax called")
  $.ajax(
    { 
        "url": `http://www.mapquestapi.com/geocoding/v1/reverse?key=lvENxHiUsPQEZcKhtDyWCNSFPtb18Cl6&location=${userlat},${userlong}`,
        "type": "GET",
        "success": format_address
    }
)
}

// timestamp
$(".pocket").click(function() {
  const timestamp = firebase.firestore.Timestamp.now();
  console.log(timestamp);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      get_user_address()
      var currentUser = db.collection("users").doc(user.uid);
      currentUser.get().then(userDoc => {
        var userName = userDoc.data().name;
        console.log(userName);
      })

      db.collection("history").add({
        name: currentUser,
        timeStamp: timestamp,
        coordinates: [userlat, userlong],
        address: useraddress,
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
