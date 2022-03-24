

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
                    var userAddress = userDoc.data().address;
                    var userPhone = userDoc.data().phone;
                    
                    // set button type back to submit so you can save the data
                    $('#save_info').attr('type', 'submit')

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
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
            $("#save_info").click(function(){
                $("#prompt_user").modal('show');
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
editUserInfo();

function saveUserInfo() {
    userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
    userAddress = document.getElementById('addressInput').value;     //get the value of the field with id="adressInput"
    userPhone = document.getElementById('phoneInput').value;       //get the value of the field with id="phoneInput"

    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)

            //write/update the database
            currentUser.update({
                name: userName,
                address: userAddress,
                phone: userPhone
            })
                .then(() => {
                    console.log("Document successfully updated!");
                    document.getElementById('personalInfoFields').disabled = true;
                })
        }
    })
}
