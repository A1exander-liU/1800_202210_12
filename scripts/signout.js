// this piece of code will basically change the button functionality depending if user is signed in or not
firebase.auth().onAuthStateChanged(user => {
    // Check if user is signed in:
    if (user) { // if they are
        $('#login').attr('href', '../index.html') // change the linked html page to index.html
        $('#login').text('Sign Out') // change the button text to signout 
    }
    else { // if they are not
        $('#login').attr('href', '../login.html') // change the linked html page to login.html
        $('#login').text('Login') // change the button text to login

        $('#profile').attr('href', '#') // changing the link to blank so they don't get redirected
        $('#favourites').attr('href', '#') // changed the link to blank so they don't get redirected
    }
})

function signout(){
    firebase.auth().signOut().then(() => { // signing out the user
        console.log("Successful signup")
      }).catch((error) => {
        console.log(error)
      });
      
}

function show_login_prompt(){
    if ($(this).attr('id') == 'profile') {
        $("#restricted").text("You cannot view your history of scans if you have not signed in.")
        $("#profile_prompt").modal('show')
    }
    if ($(this).attr('id') == 'favourites') {
        $("#restricted").text("You cannot view your favourited events if you have not signed in.")
        $("#profile_prompt").modal('show')
    }
}

function setup(){
    $('body').on('click', '#login', signout) // when you click on the sign in/sign out button call signout function
    $('body').on('click', 'a', show_login_prompt)
}

$(document).ready(setup)