function createCardData() {
    max = 21;
    //define a variable for the collection you want to create in Firestore to populate data
    var hikesRef = db.collection("My-Tickets");
    for (i = 1; i <= max; i++) {
        hikesRef.add({ //add to database, autogen ID
            code: "id" + i,
            name: "user" + i,
            email: "email" + i,
            quantity: "quantity" + i,
            qr-generated: "qr-image"+ i,
            
        })

        writeHikeData();
   }
}


function displayCards(collection) {
    let cardTemplate = document.getElementById("eventcardtemplate");

    db.collection(collection).get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;   // get value of the "name" key
                var details = doc.data().details;   // get value of the "details" key
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.event-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = "./images/" + collection + ".jpg"; //hikes.jpg

                
                document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;
            })
        })
}

displayCards("hikes");