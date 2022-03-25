function getFavourites(currentUser) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {
            var favourites = userDoc.data().favourites;
            console.log(favourites);

            let CardTemplate = document.getElementById("eventCardTemplate");
            favourites.forEach(thiseventID => {
                console.log(thiseventID);
                db.collection("events").where("id", "==", thiseventID).get().then(snap => {
                    size = snap.size;
                    queryData = snap.docs;
                    
                    if (size == 1) {
                        var doc = queryData[0].data();
                        var EventTitle = doc.title; //gets the name field
                        var eventID = doc.id; //gets the unique ID field
                        let newCard = CardTemplate.content.cloneNode(true);
                        newCard.querySelector('.card-title').innerHTML = eventName;
                        newCard.querySelector('a').onclick = () => setEventData(eventID);
                        hikeCardGroup.appendChild(newCard);
                    } else {
                        console.log("thes a number of query data")
                    }

                })

            });
        })
}

