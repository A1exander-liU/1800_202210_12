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


let select = 'name' // defining a default value to orderby
let current_page = 1 // current page starts at one
let page_size = 4 // amount of cards to display one each page
let order // ascending or desc

function get_sort_option() { // select variable will be updated when user selects a different filter/sort option
    select = $("#dropdown option:selected").val() // gets the value of the selected choice in dropdown menu
    order = $('#dropdown option:selected').attr('id')
    displayCards('events') // call function becuase you want the new sorted order of events to be immediately displayed
}

// dyanmicallly creates pagination buttons depending on how many events and amount displayed page per page
function display_page_buttons(total_pages) {
    console.log("called")
    var pagination = 1
    $('#page_buttons button').remove() // clear the buttons to make sure they do not keep stacking if you call this more than once
    for (pagination; pagination < total_pages + 1; pagination++) {
        page_button = "<button type='button' class='btn navy text-white page_button' value='" + pagination + "'>" + pagination + "</button>"
        old = $('#page_buttons').html()
        $('#page_buttons').html(old + page_button)
    }
}

function displayCardsOnScreen(start_index, stop_index, events_array) {
    let favourites;
    let cardTemplate = document.getElementById("eventTemplate")
    for (start_index; start_index < stop_index; start_index++) { // adds the events to the dom
        let newcard = cardTemplate.content.cloneNode(true);
        let title = events_array[start_index].name; // get event title
        let details = events_array[start_index].details; // get event info
        let image = events_array[start_index].image;

        //these append the imagelink into a variable that is populated img='' 

       
        // populates details of the event 
        newcard.querySelector("#photo").src = image;


        newcard.querySelector('.event-title').innerHTML = title; // set titile of card
        newcard.querySelector('.card-text').innerHTML = details; // set info of card
        let favourite_button = newcard.querySelector('.not-favourited').classList; // getting an array of the selected of not-favourited
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                db.collection("users").doc(user.uid).get().then(userDoc => {
                    favourites = userDoc.data().favourites;
                    if (favourites.includes(title)) { // checking if the event is one of the user's favourite
                        favourite_button.add('fa-solid'); // add a class to the array that will make the heart solid before card is displayed
                    }
                })
            }
        })
        document.getElementById("eventsList").appendChild(newcard);
    }
}

// read events collection and call function to display onto events.html
function displayCards() {
    let events_array = []
    db.collection("events").orderBy(select, order).limit(6).get().then(snap => {                                                      //sorting by options from drop down
        var i = 1;
        $('#eventsList div').remove() // making sure the previous page of cards are removed so they do not stack
        snap.forEach(doc => { //iterate thru each doc
            events_array.push(doc.data()); // adding each event to an array
            i++;
        })
        total_events = events_array.length;
        total_pages = Math.ceil(total_events / page_size);
        display_page_buttons(total_pages);
        start_index = page_size * (current_page - 1); // to decide which index of the array of events to start from
        stop_index = page_size * (current_page - 1) + page_size; // to decide which index of the array of events to end at
        displayCardsOnScreen(start_index, stop_index, events_array)
    })
}

function get_current_page() {
    current_page = $(this).val() // grabs the value which the apge number is stored in
    console.log(current_page)
    displayCards() // checking if it is the right page
}

function first_page_button() {
    current_page = 1; // change curreent page to first page
    displayCards() // call function to display right new page right away
}

function prev_page_button() {
    current_page -= 1;
    if (current_page < 1) { // to  make sure you do not go beloew the first page
        current_page = 1
    }
    displayCards()
}

function next_page_button() {
    current_page += 1;
    if (current_page > total_pages) { // to make sure you do not go above the last page
        current_page = total_pages
    }
    displayCards()
}

function last_page_button() {
    current_page = total_pages; // set to last page
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
                    console.log('this iconID:' + iconID);
                    //document.getElementById(iconID).class ="fa-solid fa-heart"; //SOLID RED HEART HERE -AN
                });
        }
    });
}

function favourite_this_card(eventID) {
    console.log("successful call" + eventID)
}

// rediredct to more-info.html when more-info is clicked
function get_details() {
    var name = $(this).parent().find('h3').text() // traversing to the h3 that holds the name of event tht will be used to construct the URL
    var testweb = "more-info.html?eventName=" + name //create link with variable name
    window.location.href = testweb // bringing user to new URL
}

// getting the name of the event that will serve as the eventID used to build the url
function get_eventID() {
    eventID = $(this).next().next().text() // grabbing name of event which will be used get rest of card info
    console.log(eventID)
    $(this).attr('class', 'fa-solid fa-heart not-favourited')
    saveFavourites(eventID)
}

function setup() {
    displayCards();
    $('#dropdown').change(get_sort_option) // determines if there was a change in the dropdown, i.e, there was a selection
    $('body').on('click', '.page_button', get_current_page)
    $('body').on('click', '#first', first_page_button)
    $('body').on('click', '#prev', prev_page_button)
    $('body').on('click', '#next', next_page_button)
    $('body').on('click', '#last', last_page_button)
    $('body').on('click', '.not-favourited', get_eventID)
    $('body').on('click', '.read-more', get_details)
}

$(document).ready(setup)
