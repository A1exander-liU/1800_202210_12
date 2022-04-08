var currentUser

// populate the user profile page dynamically 
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
                    $('#save_info').attr('type', 'submit')
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
                $(".profile_prompt").modal('show'); // display modal to user telling them to sign in/up
            })
            console.log("No user is signed in");
        }
    });
}

//call the function to run it
populateInfo();

// update users' informatinon in users collection in db
function saveUserInfo() {
    // grabbing the value from the input
    userName = document.getElementById('nameInput').value;
    userPhone = document.getElementById('phoneInput').value;
    userAddress = document.getElementById('addressInput').value;
    // update the name, phone, and address with new value from the input field
    currentUser.update({
            name: userName,
            phone: userPhone,
            address: userAddress
        }).then(() => {
            console.log("Document successfully updated!");
            // disable then renable to show that a change has been made
            document.getElementById('personalInfoFields').disabled = false;
        })
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = true;
}
