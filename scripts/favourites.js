firebase.auth().onAuthStateChanged(user => {
    if (user){
        getfavourites(user)
    } else {
        console.log("NO user on account")
    }
})


function getFavourites(user) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {
            var favourites = userDoc.data().favourites;
            console.log(favourites);

            let CardTemplate = document.getElementById("eventCardTemplate");
            favourites.forEach(thiseventTitle => {
                console.log(thiseventTitle);
                db.collection("events").where("event_title", "==", thiseventID).get().then(snap => {
                    size = snap.size;
                    queryData = snap.docs;
                    
                    if (size == 1) {
                        var doc = queryData[0].data();
                        var eventTitle = doc.envent_title; //gets the name field 
                        var eventInfo = doc.info;
                        var eventID = doc.id //gets the unique ID field
                        let newCard = CardTemplate.content.cloneNode(true);
                        newCard.querySelector('.card-title').innerHTML = eventTitle;
                        newCard.querySelector('.card-info').innerHTML = eventInfo;
                        newCard.querySelector('a').onclick = () => setEventData(eventID); //NO EVENT ID?!?
                        eventCardGroup.appendChild(newCard);
                    } else {
                        console.log("lots of query data")
                    }

                })

            });
        })
}

