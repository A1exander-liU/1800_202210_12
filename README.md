## pocketBook

* [General info](#general-info)
* [Creators](#creators)
* [Technologies](#technologies)
* [Contents](#content)

## General Info
'pocketBook' is the browser based web application to solve the inconvenience of physical IDs.  
This event platform application serves as your ID/ vaccine passport.

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
* MapQuest
* MapBox
* FontAwesome
* Data for populating our event cards: https://sports.api.decathlon.com/sports

## Content
Content of the project folder:

```
 Top level of project folder:
├── .gitignore               # Git ignore file
├── index.html
├── main.html                # landing HTML file, this is what users see when you come to url
├── login.html               # HTML page for users to sign up or sign in   
├── events.html              # HTML page for displaying the events
├── favourites.html          # HTML page for displaying user's favourited events
├── maps.html                # HTML page to display map with user's most recent scans on it
├── moreInfo.html            # HTML page to display full info of the event  
├── pastscans.html           # HTML page to display your most your most recent scans as cards
├── profile.html             # HTML page to display and update user info
├── wallet.html              # HTML page to display vaccine passport, ID, tickets
└── README.md

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── .vscode                  # Folder for vscode settings
├── images                   # Folder for images
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
├── scripts                  # Folder for scripts
    /authentication.js
    /events.js
    /favourites.js
    /firebaseAPI_TEAM12.js
    /global.js
    /index.js
    /maps.js
    /moreInfo.js
    /profile.js
    /scan.js
    /script.js
    /signout.js
    /wallet.js
├── partials                 # Folder for skeltons
    /carousel.html
    /floatbutton.html
    /footer.html
    /header.html
    /menubar.html
    /prompt.html
├── css                      # Folder for styles
    /styles.css              # CSS file for general styling
    /profile.css             # CSS file specifically for profile.html
Firebase hosting files:
├── .firebaserc...


```

<!-- Tips for file naming files and folders:
* use lowercase with no spaces
* use dashes (not underscore) for word separation -->
