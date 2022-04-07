function show_login_prompt(){
    if ($(this).attr('id') == 'favourites') { // checking if the id of the link you click is id of link to favourites.html
        $(".restricted").text("You cannot view your favourited events if you have not signed in.") // customizing the message
        $(".profile_prompt").modal('show')
    }
    if ($(this).attr('id') == 'events-to-favourites') {
        $(".restricted").text("You cannot view your favourited events if you have not signed in.")
        $(".profile_prompt").modal('show')
    }
    // grabbing the children inside clicked button, using button instead or else you have to cick center of button to redirect since that is where the a tag, but you want click anywhere on the button
    if ($(this).parent().attr('id') == 'wallet') { // checking if the id of the link you click is id of link to wallet.html
        $(".restricted").text("You cannot view your wallet if you have not signed in.") // customizing the message
        $(".profile_prompt").modal('show')
    }
    if ($(this).attr('id') == 'history') { // checking if the id of the link you click is id of link to wallet.html
        $(".restricted").text("You cannot view your history of scans if you have not signed in.") // customizing the message
        $(".profile_prompt").modal('show')
    }
}

// this piece of code will basically change the button functionality depending if user is signed in or not
firebase.auth().onAuthStateChanged(user => {
    // Check if user is signed in:
    if (user) { // if they are
        console.log("User signed in.")
        $('#login').attr('href', '../index.html') // change the linked html page to index.html
        $('#login').text('Sign Out') // change the button text to signout
    }
    else { // if they are not
        console.log("User not signed in.")
        $('#login').attr('href', '../login.html') // change the linked html page to login.html
        $('#login').text('Login') // change the button text to login

        // $('#profile').attr('href', '#') // changing the link to blank so they don't get redirected
        $('#events-to-favourites').attr('href', '#')
        $('#favourites').attr('href', '#') // changed the link to blank so they don't get redirected
        $('#wallet').attr('href', '#')
        $('#history').attr('href', '#')
        $('body').on('click', 'a', show_login_prompt) // when you click on an <a> tag call this
        $('body').on('click', 'button', show_login_prompt) // wallet.html is a button
    }
})

// let users to sign out
function signout(){
    firebase.auth().signOut().then(() => {
        console.log("Successful signout")
      }).catch((error) => {
        console.log(error)
      });

}

function setup(){
    $('body').on('click', '#login', signout) // when you click on the sign in/sign out button call signout function
}

$(document).ready(setup)
