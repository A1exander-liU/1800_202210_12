// timestamp
$(".pocket").click(function() {
  const timestamp = firebase.firestore.Timestamp.now();
  console.log(timestamp);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      var currentUser = db.collection("users").doc(user.uid);
      currentUser.get().then(userDoc => {
        var userName = userDoc.data().name;
        console.log(userName);
      })

      db.collection("history").add({
        name: currentUser,
        timeStamp: timestamp,
      })
    }
  })
})


// Populate history cards
function displayHistoryCards(collection) {
  let eventTemplate = document.getElementById("historyTemplate");

  db.collection(collection).get()
    .then(snap => {
      var i = 1;
      snap.forEach(doc => { //iterate thru each doc
        var timestamp = doc.data().timeStamp;
        var date = timestamp.toDate();
        console.log(date);
        let newcard = historyTemplate.content.cloneNode(true);

        newcard.querySelector('strong').innerHTML = i + " :"
        newcard.querySelector('.time-stamp').innerHTML = date;

        document.getElementById("historyList").appendChild(newcard);
        i++;
      })
    })
}

if($("body").is("#historyPage")){
  displayHistoryCards("history");
}
