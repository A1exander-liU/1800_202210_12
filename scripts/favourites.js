firebase.auth().onAuthStateChanged(user => {
    if (user){
        getFavourites(user)
    } else {
        console.log("NO user on account");
    }
});


function getFavourites(user) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {
            var favourites = userDoc.data().favourites;
            console.log(favourites);

            let CardTemplate = document.getElementById("eventTemplate");
            favourites.forEach(thisEventTitle => {
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
                        var eventID = doc.name //gets the unique ID field
                        let newCard = CardTemplate.content.cloneNode(true);
                        newCard.querySelector('.card-title').innerHTML = eventTitle;
                        newCard.querySelector('.card-text').innerHTML = eventInfo;
                        newCard.querySelector('a').onclick = () => setEventData(eventID); //NO EVENT ID?!?
                        eventCardGroup.appendChild(newCard);
                    } else {
                        console.log("lots of query data")
                    }

                })

            });
        })
}