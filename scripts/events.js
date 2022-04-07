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

function displayCardsOnScreen(start_index, stop_index, events_array) {
    let cardTemplate = document.getElementById("eventTemplate")
    for (start_index; start_index<stop_index; start_index++) { // adds the events to the dom
        let newcard = cardTemplate.content.cloneNode(true);
        var title = events_array[start_index].name; // get event title
        var details = events_array[start_index].details; // get event info
        newcard.querySelector('.event-title').innerHTML = title; // set titile of card
        newcard.querySelector('.card-text').innerHTML = details; // set info of card
        // newcard.querySelector('.not-favourited').class = "" // cyrrent exp
        document.getElementById("eventsList").appendChild(newcard);
    }
}

// read events collection and display onto events.html
function displayCards() {
    let events_array = []
    db.collection("events").orderBy(select, order).limit(4).get().then(snap => {                                                      //sorting by options from drop down
            var i = 1;
            $('#eventsList div').remove()
            snap.forEach(doc => { //iterate thru each doc
                events_array.push(doc.data()); // adding each event to an array
                i++;
            })
            total_events = events_array.length;
            total_pages = Math.ceil(total_events / page_size);
            display_page_buttons(total_pages);
            start_index = page_size * (current_page - 1);
            stop_index = page_size * (current_page - 1) + page_size;
            displayCardsOnScreen(start_index, stop_index, events_array)
        })
}

function get_current_page(){
    current_page = $(this).val() // grabs the value which the apge number is stored in
    console.log(current_page)
    displayCards() // checking if it is the right page
}

function first_page_button() {
    current_page = 1;
    displayCards()
}

function prev_page_button() {
    current_page -= 1;
    if (current_page < 1) {
        current_page = 1
    }
    displayCards()
}

function next_page_button() {
    current_page += 1;
    if (current_page > total_pages) {
        current_page = total_pages
    }
    displayCards()
}

function last_page_button() {
    current_page = total_pages;
    displayCards()
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
    var name = $(this).parent().find('h3').text() // traversing to the h3 that holds the name of event tht will be used to construct the URL
    var testweb = "moreInfo.html?eventName=" + name //create link with variable name
    window.location.href= testweb // bringing user to new URL
}
function get_eventID(){
    eventID = $(this).next().next().text()
    console.log(eventID)
    $(this).attr('class', 'fa-solid fa-heart')
    saveFavourites(eventID)
}

function setup(){
    displayCards();
    $('#dropdown').change(get_sort_option) // determines if there was a change in the dropdown, i.e, there was a selection
    $('body').on('click', '.page_button', get_current_page)
    // $('body').on('click', 'button', get_first_prev_next_last_button)

    $('body').on('click', '#first', first_page_button)
    $('body').on('click', '#prev', prev_page_button)
    $('body').on('click', '#next', next_page_button)
    $('body').on('click', '#last', last_page_button)


    $('body').on('click', '.not-favourited', get_eventID)
    $('body').on('click', '.read-more', get_details)
}

$(document).ready(setup)