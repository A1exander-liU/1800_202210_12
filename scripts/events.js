
// authentication
// var currentUser;
// firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//         currentUser = db.collection("users").doc(user.uid);   //global
//         console.log(currentUser);
    

// var currentUser;
// firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//         currentUser = db.collection("users").doc(user.uid);   //global
//         console.log(currentUser);
//     } else {
//         // No user is signed in.
//         console.log("No user is signed in");
//         window.location.href = "login.html";
//     }
// });

function favourite_this_card(eventID){
    console.log("successful call" + eventID)
}

// populate database with sports events
async function readJSON() {
  i = 0
  const response = await fetch(
    'https://sports.api.decathlon.com/sports'
  )
  const data = await response.text(); //get text file, string
  const sportsEvents = JSON.parse(data); //convert to JSON
  // console.log(sportsEvents);
  for (x of sportsEvents["data"]) { //iterate thru each hero
    let name = x.attributes.name;
    let details = x.attributes.description;
    let image = x.relationships.images.data[0];
    // console.log(image);
    i++
    if (i <= 50) {
      db.collection("events").add({
        name: name,
        details: details,
        image: image["url"]
      })
    }
  }
}


let select = 'name' // defining a default value for select, can change this to something that makes more sense
let current_page = 1
let page_size = 6
let order

function get_sort_option(){ // select variable will be updated when user selects a different filter/sort option
    select = $("#dropdown option:selected").val() // gets the value of the selected choice in dropdown menu
    order = $('#dropdown option:selected').attr('id')
    console.log(order)
    displayCards('events') // call function becuase you want the new sorted order of events to be immediately displayed
    console.log(select) // checking if user selected choice matches with the code

}

function display_page_buttons(total_pages){
    console.log("called")
    var pagination = 1
    $('#page_buttons button').remove() // clear the buttons to make sure they do not keep stacking if you call this more than once
    for (pagination; pagination<total_pages + 1; pagination++){
        page_button = "<button type='button' class='btn navy text-white page_button' value='" + pagination + "'>" + pagination + "</button>"
        old = $('#page_buttons').html()
        $('#page_buttons').html(old + page_button)
    }
}

// read events collection and display onto events.html
function displayCards(collection) {
    // let cardTemplate = document.getElementById("eventCardTemplate")
    // let select = document.getElementById('dropdown').value;/// not automatic need to refresh to see result -AN
    let cardTemplate = document.getElementById("eventTemplate")
    // let select = document.getElementById('dropdown').value;/// not automatic need to refres to see result -AN
    let events_array = []
    db.collection(collection)
    .orderBy(select, order) //sorting by options from drop down
    .limit(4)
    .get()
        .then(snap => {
            var i = 1;
            $('#eventsList div').remove()
            snap.forEach(doc => { //iterate thru each doc
                events_array.push(doc.data()) // adding each event to an array
                // var title = doc.data().event_title; // get event title
                // var type = doc.data().type; // get event type
                // var genre = doc.data().genre; // get event genre
                // var details = doc.data().info; // get event info
                // var date = doc.data().date; // get event date
                // var time = doc.data().time; // get event time
                // var venue = doc.data().venue.location; // get event location
                let newcard = cardTemplate.content.cloneNode(true);
                //update card info
                var eventID = doc.id
                newcard.querySelector('.event-title').innerHTML = title;
                // newcard.querySelector('.card-type').innerHTML = type;
                // newcard.querySelector('.card-genre').innerHTML = genre;
                // newcard.querySelector('.card-location').innerHTML = venue;
                // newcard.querySelector('.event-info').innerHTML = details;
                // newcard.querySelector('.card-date').innerHTML = date;
                // newcard.querySelector('.card-time').innerHTML = time;
                // newcard.querySelector('.card-image').src = "./images/" + collection + ".jpg"; //hikes.jpg

                //give unique ids to all elemrd-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.ents for future use
                // newcard.querySelector('.cacard-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);
                // newcard.querySelector('i').id = 'save' + eventID; // saves the hikeID to user's document -AN
                // newcard.querySelector('i').onclick = () =>saveFavourites(eventID); //the hikeId as input -AN
                //attach to gallery
                // document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;
            })
            total_events = events_array.length
            console.log(total_events)
            total_pages = Math.ceil(total_events / page_size)
            console.log(total_pages)
            display_page_buttons(total_pages)
            start_index = page_size * (current_page - 1)
            stop_index = page_size * (current_page - 1) + page_size
            for (start_index; start_index<stop_index; start_index++) { // adds the events to the dom
                let newcard = cardTemplate.content.cloneNode(true);

                var title = events_array[start_index].name; // get event title
                // var type = events_array[start_index].type; // get event type
                // var genre = events_array[start_index].genre; // get event genre
                var details = events_array[start_index].details; // get event info
                // var date = events_array[start_index].date; // get event date
                // var time = events_array[start_index].time; // get event time
                // var venue = events_array[start_index].venue.location; // get event location

                // update the card information
                newcard.querySelector('.event-title').innerHTML = title;
                // newcard.querySelector('.card-type').innerHTML = type;
                // newcard.querySelector('.card-genre').innerHTML = genre;
                // newcard.querySelector('.card-location').innerHTML = venue;
                // newcard.querySelector('.card-date').innerHTML = date;
                // newcard.querySelector('.card-time').innerHTML = time;
                // newcard.querySelector('.read-more').href = "moreInfo.html?eventName="+title;

                document.getElementById(collection + "List").appendChild(newcard);
            }
        })
}

function get_current_page(){
    current_page = $(this).val() // grabs the value which the apge number is stored in
    console.log(current_page)
    displayCards('events') // checking if it is the right page
}

function get_first_prev_next_last_button(){
    if ($(this).attr('id') == 'first') { // if id of button clicked is 'first', set current page to first page
        current_page = 1
        displayCards('events')
    }
    else if ($(this).attr('id') == 'prev')  { // if id of button clicked is 'prev', minus 1
        current_page -= 1
        if (current_page < 1) { // to make sure the current page doesn't go a page that doesn't exist
            current_page = 1
        }
        displayCards('events')
    }
    else if ($(this).attr('id') == 'next') {
        current_page += 1
        if (current_page > total_pages) { // to make sure the current page doesn't go to page that doesn't exist
            current_page = total_pages
        }
        displayCards('events')
    }
    else if ($(this).attr('id') == 'last') {
        current_page = total_pages
        displayCards('events')
    }
    console.log(current_page) // checking if it is the right page
}

//this function is called when the 'favourite' icon has been clicked.
// // It will add the event to an events array
// // // fill in the 'favourite icon to indicate user has liked the event
function saveFavourites(eventID) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.set({ //CURRENT USER VARIABLE HERE -AN
                    favourites: firebase.firestore.FieldValue.arrayUnion(eventID)
                }, {
                    merge: true
                })
                .then(function () {
                    console.log("this event has been saved for user: " + currentUser); // + current user variable, change later-AN
                    var iconID = 'save-' + eventID;
                    console.log('this iconID:'+iconID);
                    //document.getElementById(iconID).class ="fa-solid fa-heart"; //SOLID RED HEART HERE -AN
                });
        }
    });
}

function get_details(){
    eventID = $(this).prev().prev().prev().text()
    var name = eventID //get the event is and place in a variable 
    var testweb = "moreInfo.html?eventName=" + name //create link with variable name
    window.location.href= testweb
}
function get_eventID(){
    eventID = $(this).next().next().text()
    console.log(eventID)
    saveFavourites(eventID)
}

function setup(){
    displayCards("events");
    $('#dropdown').change(get_sort_option) // determines if there was a change in the dropdown, i.e, there was a selection
    $('body').on('click', '.page_button', get_current_page)
    $('body').on('click', 'button', get_first_prev_next_last_button)
    $('body').on('click', 'i', get_eventID)
    $('body').on('click', 'a', get_details)
}
    
$(document).ready(setup)