<h1 align="center"> pocketBook </h1>

## Table of Contents

* [General info](#general-info)
* [Creators](#creators)
* [Technologies](#technologies)
* [Contents](#content)

## General Info
'pocketBook' is the browser based web application to solve the inconvenience of physical IDs.  
This event platform application serves as your ID/ vaccine passport.  

[pocketBook](https://comp1800pocketbook.netlify.app/)

## Creators
*Toco Tachibana* (https://github.com/toco-t)  
*Alexie Narciso* (https://github.com/Nalexie)  
*Alexander Liu* (https://github.com/A1exander-liU)


## Technologies
Technologies used for this project:
* HTML, CSS
* JavaScript, jQuery, AJAX
* Bootstrap
* Firebase, Firestore
* [MapQuest](https://developer.mapquest.com/documentation/geocoding-api/reverse/get/)
* [MapBox](https://docs.mapbox.com/mapbox-gl-js/api/)
* [FontAwesome](https://fontawesome.com/icons)
* [Data for populating our event cards](https://sports.api.decathlon.com/sports)

## Image Sources
Images used for our project:
* [Green Checkmark](https://www.kindpng.com/free/green-check-mark/)


## Content
Content of the project folder:

```
 Top level of project folder:
├── .gitignore               # Git ignore file
├── index.html               # HTML page for the langing page
├── login.html               # HTML page for users to sign up or sign in   
├── events.html              # HTML page for displaying the events
├── favourites.html          # HTML page for displaying user's favorite events
├── maps.html                # HTML page to display map with user's most recent scans on it
├── more-info.html           # HTML page to display full info of the event  
├── pastscans.html           # HTML page to display your most your most recent scans as cards
├── profile.html             # HTML page to display and update user info
├── wallet.html              # HTML page to display vaccine passport, ID, tickets
└── README.md

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── .vscode                  # Folder for vscode settings
├── images                   # Folder for images (images were from the internet untracked sources except logos)
    /barcode.png
    /confirmation.png
    /id-card.jpg
    /ID.jpg
    /logo.png
    /logo.svg
    /olympic_logo.jpg
    /olympics01.jpg
    /olympics02.jpg
    /olympics03.jpg
    /passport.jpg
    /QRcode.png
    /tickets.jpg          
├── scripts                  # Folder for JaveScript files
    /authentication.js
    /events.js
    /favourites.js
    /firebaseAPI_TEAM12.js
    /global.js
    /index.js
    /maps.js
    /more-info.js
    /profile.js
    /scan.js
    /script.js
    /signout.js
    /wallet.js
├── partials                 # Folder for skeltons html files
    /carousel.html
    /floatbutton.html
    /footer.html
    /header.html
    /menubar.html
    /prompt.html
└── css                      # Folder for CSS files for styling
    /styles.css              
    /profile.css             
```
