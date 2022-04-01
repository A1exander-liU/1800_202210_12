/// this a function that creates a URL of the selected object then display the remaining details left out from the cards thats in the database///
function showDetails() {

    let params = new URL(window.location.href); ///creates a URL object
    var name = params.searchParams.get("eventName")
    console.log("MY name:" + name + "myparams: " + params)

    db.collection("events").where('name', '==', name)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                var details = doc.data(details)
                console.log("MY name:" + name + " details" + details)
            });
        });

    document.getElementsByClassName("name").innerHTML=name;
}

showDetails();