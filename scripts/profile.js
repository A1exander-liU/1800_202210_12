var currentUser // copy the demo to see if it works, don't work right now, have no idea why, no errors

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userEmail = userDoc.data().email;
                    var userAddress = userDoc.data().address;
                    var userPhone = userDoc.data().phone;
                    console.log(userName, userEmail, userAddress, userPhone)


                    console.log("User is signed in")

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userEmail != null) {
                        document.getElementById("emailInput").value = userEmail
                    }
                    if (userAddress != null) {
                        document.getElementById("addressInput").value = userAddress;
                    }
                    if (userPhone != null) {
                        document.getElementById("phoneInput").value = userPhone;
                    }
                })
        } 
        else {
            $("#save_info").click(function(){ // if they click save but they arent signed in, call this callback function
                $("#prompt_user").modal('show'); // display modal to user telling them to sign in/up
            })
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
 }
editUserInfo(); // form always enabled, we dont use edit button

function saveUserInfo() {
    userName = document.getElementById('nameInput').value;
    userPhone = document.getElementById('phoneInput').value;
    userAddress = document.getElementById('addressInput').value;

    currentUser.update({
            name: userName,
            phone: userPhone,
            address: userAddress
        })
        .then(() => {
            console.log("Document successfully updated!");
            document.getElementById('personalInfoFields').disabled = false;
        })

    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = true;
}

