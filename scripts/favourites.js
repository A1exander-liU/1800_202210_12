// firebase.auth().onAuthStateChanged(user => {
//     if (user){
//         getFavourites(user)
//     } else {
//         console.log("NO user on account");
//     }
// });


let size_of_page = 4; // how many will appear on each page
let this_page = 1; // current page number, starts at 1

function get_first_prev_next_last_button(){
    if ($(this).attr('id') == 'favourite_first') { // if id of button clicked is 'first', set current page to first page
        current_page = 1
        // call function to display
    }
    else if ($(this).attr('id') == 'favourite_prev')  { // if id of button clicked is 'prev', minus 1
        current_page -= 1
        if (current_page < 1) { // to make sure the current page doesn't go a page that doesn't exist
            current_page = 1
        }
        // call function to display
    }
    else if ($(this).attr('id') == 'favourite_next') {
        current_page += 1
        if (current_page > total_pages) { // to make sure the current page doesn't go to page that doesn't exist
            current_page = total_pages
        }
        // call function to display
    }
    else if ($(this).attr('id') == 'favourite_last') {
        current_page = total_pages
        // call functino to display
    }
    console.log(current_page) // checking if it is the right page
}

function grab_current_page() {
    this_page = $(this).val()
    // call the function to dislpay the liked events
}

function display_favourites_page_buttons(page_amount) {
    pagination = 1;
    $('#favourite_page_buttons button').remove()
    for (pagination; pagination < page_amount + 1; pagination++) {
        page_button = "<button type='button' class='btn navy text-white page_button' value='" + pagination + "'>" + pagination + "</button>"
        old = $('#favourite_page_buttons').html()
        $('#favourite_page_buttons').html(old + page_button)
    }
}

function remove_favourite() {
    firebase.auth().onAuthStateChanged(user => {
        if (user){
            event_name = $(this).next().next().text()
            current_user = db.collection("users").doc(user.uid)
            current_user.update({
                favourites: firebase.firestore.FieldValue.arrayRemove(event_name)
            });
            $(this).parent().parent().parent().remove()
            getFavourites()
            console.log("removed succesfully from favourites")
 
            }
        }
    );
}

function getFavourites() { // need to split this boi up, it is way too big lol
    // $('#eventsList *').remove() // not rermoving elements change selector to something else
    $('#favouritesList *').remove() // not removing elements change selector to something else
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("users").doc(user.uid).get()
            .then(userDoc => {
                var favourites = userDoc.data().favourites;
                console.log(favourites);

                let CardTemplate = document.getElementById("eventTemplate");
                favourited_events = []
                favourites.forEach(thisEventTitle => {
                    favourited_events.push(thisEventTitle)
                    console.log(thisEventTitle);
                    db.collection("events").where("name", "==", thisEventTitle).get().then(snap => {
                        size = snap.size;
                        console.log(size)
                        queryData = snap.docs;
                        console.log(queryData)
                        
                        if (size == 1) {
                            var doc = queryData[0].data();
                            var eventTitle = doc.name; //gets the name field 
                            var eventInfo = doc.details;
                            // var eventID = doc.name //gets the unique ID field
                            let newCard = CardTemplate.content.cloneNode(true);
                            newCard.querySelector('.card-title').innerHTML = eventTitle;
                            newCard.querySelector('.card-text').innerHTML = eventInfo;
                            // newCard.querySelector('a').onclick = () => setEventData(eventID); //NO EVENT ID?!?
                            favouritesList.appendChild(newCard);
                        } else {
                            console.log("lots of query data")
                        }

                    })

                });
            })
            }
        })
}

function show_favourites(favourites, start, stop) {
    for (start; start<stop; start++) {
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
    var testweb = "moreInfo.html?eventName=" + name //create link with variable name
    window.location.href= testweb // bringing user to new URL
}

function setup(){
    getFavourites()
    $('body').on('click', '.read-more', get_details)
    $('body').on('click', '.favourite_page_button', grab_current_page)
    $('body').on('click', '.favourited', remove_favourite)
}



$(document).ready(setup)