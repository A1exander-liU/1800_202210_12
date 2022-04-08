let usercoords;


function get_user_location() {
  console.log('called get user location')
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(show_current_position) // getting their current coords
  }
}

function show_current_position(position) { 
  userlat = position.coords.latitude; // getting the lat from the coords
  userlong = position.coords.longitude; // getting the long from te coords
  get_user_address(userlat, userlong)
  console.log(userlat, userlong)
  // reverse geocode the coordinates to get the address
}

function go_to_map() {
  $(this)
  window.location = "maps.html"
}

function add_scan_to_db(useraddress) { // add the scan to the db
  const timeStamp = firebase.firestore.Timestamp.now() // getting current timestamp
  console.log(timeStamp)
  firebase.auth().onAuthStateChanged(user => { // check if they are logged in
  if (user) { // if they are logged in
    var currentUser = db.collection("users").doc(user.uid);
    currentUser.get().then(userDoc => {
    var userName = userDoc.data().name;
    console.log(userName);
    })
    currentUser.collection("history").add({ // creating a history subcollection in the current user doc
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
  add_scan_to_db(useraddress)
}

function get_user_address(userlat, userlong) { // just for api calling to reverse geocode/get address from coordinates
  console.log("ajax called")
  $.ajax(
    {
        "url": `https://www.mapquestapi.com/geocoding/v1/reverse?key=lvENxHiUsPQEZcKhtDyWCNSFPtb18Cl6&location=${userlat},${userlong}`,
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
  }
});

// Populate history cards
function displayHistoryCards(collection) {
  let historyTemplate = document.getElementById("historyTemplate");
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
          newcard.querySelector('.time-stamp').innerHTML = date + ", " + '<p>' + location + '</p>';
          document.getElementById("historyList").appendChild(newcard);
          i++;
        })
      })
    }
  })
}

function show_confirmation() {

}

// checks if it's the right page before calling the function
if($("body").is("#historyPage")){
  displayHistoryCards("history");
}

function setup(){
  $('.modal-body').click(get_user_location) // not being called but coords are beiing displayed
  $('.trigger').click(show_confirmation)
}

$(document).ready(setup)
