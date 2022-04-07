let userlat;
let userlong;
let usercoords;
let useraddress;

function get_user_location() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(show_current_position) // getting their current coords
  }
}

function show_current_position(position) {
  userlat = position.coords.latitude; // getting the lat from the coords
  userlong = position.coords.longitude; // getting the long from te coords
  get_user_address()
  console.log(userlat, userlong)
  // reverse geocode the coordinates to get the address


}

function go_to_map() {
  window.location = "maps.html"
}

function add_scan_to_db() { // add the scan to the db
  const timeStamp = firebase.firestore.Timestamp.now() // getting current timestamp
  console.log(timeStamp)
  firebase.auth().onAuthStateChanged(user => { // check if they are logged in
  if (user) { // if they are logged in
    var currentUser = db.collection("users").doc(user.uid);
    currentUser.get().then(userDoc => {
    var userName = userDoc.data().name;
    console.log(userName);
    })
    currentUser.collection("history").add({ // craeting a history subcollection in the current user doc
      timeStamp: timeStamp, 
      coordinates: [userlong, userlat],
      address: useraddress,
    })
    }
  })
}

function format_address(address){ // storing the recieved object in this variable
  console.log("request processing...")
  // console.log(address.results[0])
  city = address.results[0].locations[0].adminArea5 // just doing some traversal inside object to extract the city
  street = address.results[0].locations[0].street // just doing some traversal inside the object to extract the address
  // can change later what we want to extract out
  useraddress = city + ", " +  street // formatting and concatenating the city with the address
  console.log(useraddress)
  add_scan_to_db()
}

function get_user_address() { // just to for api calling to reverse geocode/get address from coordinates
  console.log("ajax called")
  $.ajax(
    { 
        "url": `http://www.mapquestapi.com/geocoding/v1/reverse?key=lvENxHiUsPQEZcKhtDyWCNSFPtb18Cl6&location=${userlat},${userlong}`,
        "type": "GET",
        "success": format_address
    }
)}

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
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid)
      currentUser.collection(collection).orderBy('timeStamp', "desc").limit(5).get().then(snap => {
        var i = 1;
        snap.forEach(doc => { //iterate thru each doc
          var timestamp = doc.data().timeStamp;
          var date = timestamp.toDate();
          var location = doc.data().address
          console.log(date.toLocaleString());
          console.log(location)
          let newcard = historyTemplate.content.cloneNode(true);
          newcard.querySelector('strong').innerHTML = i + " :"
          newcard.querySelector('.time-stamp').innerHTML = date + ", " + location;
          document.getElementById("historyList").appendChild(newcard);
          i++;
        })
      })
    }
  })
}

function show_confirmation() {
  
}

if($("body").is("#historyPage")){
  displayHistoryCards("history");
}

function setup(){
  $('.scan').click(get_user_location)
  $('.scan').click(show_confirmation)
}

$(document).ready(setup)