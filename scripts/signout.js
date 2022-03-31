firebase.auth().onAuthStateChanged(user => {
    // Check if user is signed in:
    if (user) {
        $('#login').attr('href', '../index.html')
        $('#login').text('Sign Out')
    }
    else {
        $('#login').attr('href', '../login.html')
        $('#login').text('Login')
    }
})

function signout(){
    firebase.auth().signOut().then(() => {
        console.log("Successful signup")
      }).catch((error) => {
        console.log(error)
      });
      
}

function setup(){
    $('body').on('click', '#login', signout)
}

$(document).ready(setup)