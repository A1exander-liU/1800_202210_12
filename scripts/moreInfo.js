/// this a function that creates a URL of the selected object then display the remaining details left out from the cards thats in the database///

function showDetails() {
    var details = ''
    let params = new URL(window.location.href); ///creates a URL object
    var name = params.searchParams.get("eventName")
    console.log("MY name:" + name + "myparams: " + params)

    db.collection("events").where('name', '==', name)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log(doc.id, " => ", doc.data());
                var data = doc.data();
                details = data.details

                console.log("these are inside: " + details);

                document.querySelector(".details").innerHTML = details;



            });

        });






    document.querySelector(".name").innerHTML = name;
    console.log("these are outside: " + name + details)




}

showDetails();
