// firebase.auth().onAuthStateChanged(user => {
//     if (user){
//         getFavourites(user)
//     } else {
//         console.log("NO user on account");
//     }
// });


let size_of_page = 4; // how many will appear on each page
let this_page = 1; // current page number, starts at 1
let select = 'name';
let order;

// pagination
function favourite_first_page() {
    this_page = 1;
    getFavourites()
}
function favourite_prev_page() {
    this_page -= 1;
    if (this_page < 1) {
        this_page = 1;
    }
    getFavourites()
}
function favourite_next_page() {
    this_page += 1;
    if (this_page > total_pages) {
        this_page = total_pages;
    }
    getFavourites()
}
function favourite_last_page() {
    this_page = total_pages;
    getFavourites()
}
function grab_current_page() {
    this_page = $(this).val();
    getFavourites()
    // call the function to dislpay the liked events
}

// display page buttons
function display_favourites_page_buttons(page_amount) {
    pagination = 1;
    $('#favourite_page_buttons button').remove()
    for (pagination; pagination < page_amount + 1; pagination++) {
        page_button = "<button type='button' class='btn navy text-white favourite_page_button' value='" + pagination + "'>" + pagination + "</button>"
        old = $('#favourite_page_buttons').html()
        $('#favourite_page_buttons').html(old + page_button)
    }
}

// remove favourite events from db
function remove_favourite() {
    firebase.auth().onAuthStateChanged(user => {
        if (user){
            event_name = $(this).next().next().text()
            current_user = db.collection("users").doc(user.uid)
            current_user.update({
                favourites: firebase.firestore.FieldValue.arrayRemove(event_name) // remove from array
            });
            getFavourites() // call to show update favourites
            console.log("removed succesfully from favourites")

            }
        }
    );
}

// displays the favourited events according to the current page
function displayFavourites(favourited_events) {
    $('#favouritesList div').remove() // prevents the events from stacking on future calls
    let CardTemplate = document.getElementById("eventTemplate");
    total_events = favourited_events.length;
    console.log('array size', total_events)
    total_pages = Math.ceil(total_events / size_of_page);
    display_favourites_page_buttons(total_pages)
    start_value = size_of_page * (this_page - 1);
    console.log('start index', start_value)
    stop_value = size_of_page * (this_page - 1) + size_of_page;
    console.log('stop index', stop_value)
    for (start_value; start_value < stop_value; start_value++) {
        console.log(favourited_events[start_value])
        db.collection("events").where("name", "==", favourited_events[start_value]).get().then(snap => {
            queryData = snap.docs;
            var doc = queryData[0].data();
            var event_title = doc.name;
            var event_info = doc.details;
            var image = doc.image;
            let newcard = CardTemplate.content.cloneNode(true);
            newcard.querySelector('.card-title').innerHTML = event_title;
            newcard.querySelector('.card-text').innerHTML = event_info;
            newcard.querySelector('.card-img').src = image;
            favouritesList.appendChild(newcard);
        })
    }
}

function getFavourites() { // get the favourites array from the user
    let favourited_events = []
    // $('#eventsList *').remove() // not rermoving elements change selector to something else
     // not removing elements change selector to something else
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("users").doc(user.uid).get()
            .then(userDoc => {
                var favourites = userDoc.data().favourites;
                // let CardTemplate = document.getElementById("eventTemplate");
                favourites.forEach(thisEventTitle => {
                    favourited_events.push(thisEventTitle) // puttting each item in a new array
                });
                displayFavourites(favourites)
            })
            }
        })
}

function show_favourites(favourites, start, stop) {
    for (start; start<stop; start++) { // to display the current page of cards, chages depending on current page
        db.collection("events").where("name", "==", favourites[start]).get().then(snap => {
            favourited_data = snap.docs;
            var doc = favourited_data[0].data;
            var name = doc.name;
            var details = doc.details;
            let favouriteCard = CardTemplate.content.cloneNode(true)
            favouriteCard.querySelector('card-title').innerHTML = name;
            favouriteCard.querySelector('card-text').innerHTML = details;
            favouritesList.appendChild(favouriteCard)
        })
    }
}

function get_details(){
    var name = $(this).parent().find('h3').text() // traversing to the h3 that holds the name of event tht will be used to construct the URL
    var testweb = "more-info.html?eventName=" + name //create link with variable name
    window.location.href= testweb // bringing user to new URL
}

function setup(){
    getFavourites()
    $('body').on('click', '.read-more', get_details)
    $('body').on('click', '.favourite_page_button', grab_current_page)
    $('body').on('click', '.favourited', remove_favourite)
    $('body').on('click', '#favourite_first', favourite_first_page)
    $('body').on('click', '#favourite_prev', favourite_prev_page)
    $('body').on('click', '#favourite_next', favourite_next_page)
    $('body').on('click', '#favourite_last', favourite_last_page)
}

$(document).ready(setup)
