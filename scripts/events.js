var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);   //global
        console.log(currentUser);

    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});

function favourite_this_card(eventID){
    console.log("successful call" + eventID)
    
}

function write_event_info(){
    var events = [{ // json array of events
        "event_title": "Masters of Illusions",
        "type": "family",
        "genre": "magic/illusion",
        "info": "Watch closely as you experience things that just can't be done……or can they? ! Join the Masters of Illusions as they blow your mind's eye with sleight of hand, escape arts, illusions, comedy, and more.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "600 Block Hamilton St., Vancouver, BC V6B 2P1",
            "location": "Queen Elizabeth Theatre"
        },
        "date": "April 16, 2022",
        "time": "8:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 48.00,
        "highest_price": 110.00,
        "currency": "CAD"
    },
    {
        "event_title": "Stars on Ice",
        "type": "family",
        "genre": "ice shows",
        "info": "Watch world champion and olympic medalist skaters and be ready to be blown away by incredible tricks and performances.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "800 Griffiths Way, Vancouver, BC V6B 6G1",
            "location": "Rogers Arena"
        },
        "date": "May 19, 2022",
        "time": "7:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 22.00,
        "highest_price": 116.00,
        "currency": "CAD"
    },
    {
        "event_title": "Fred Penner",
        "type": "family",
        "genre": "children's theater",
        "info": "Listen to famous composer Fred Penner as he brings back to his first records.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "nanaimo",
            "address": "125 Front Street, Nanaimo, BC V9R 6Z4",
            "location": "Port Theatre"
        },
        "date": "May 22, 2022",
        "time": "2:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 32.00,
        "highest_price": 32.00,
        "currency": "CAD"
    },
    {
        "event_title": "Squid, Deliluh",
        "type": "concert",
        "genre": "rock",
        "info": "Get ready to listen to some banging kraut rock and post-punk!",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "254 E Hastings Street Vancouver, BC V6A 1P21",
            "location": "Rickshaw Theatre"
        },
        "date": "March 9, 2022",
        "time": "8:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 22.50,
        "highest_price": 22.50,
        "currency": "CAD"
    },
    {
        "event_title": "Matroda",
        "type": "concert",
        "genre": "dance/electronic",
        "info": "You ready to listen to some electronic music with explosive bass?",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "1022 Davie Street Vancouver, BC V6E 1M3",
            "location": "Celebrities Nightclub"
        },
        "date": "March 11, 2022",
        "time": "10:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 29.54,
        "highest_price": 29.54,
        "currency": "CAD"
    },
    {
        "event_title": "Sawyer Brown",
        "type": "concert",
        "genre": "country",
        "info": "Listen to some amazing country music from Sawyer Brown.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "10200 Quil Ceda Blvd, Tulalip, WA 98271",
            "location": "Tulalip Resort Casino - Tulalip, WA"
        },
        "date": "May 12, 2022",
        "time": "8:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 83.00,
        "highest_price": 101.00,
        "currency": "CAD"
    },
    {
        "event_title": "Geographer, Chong The Nomad",
        "type": "concert",
        "genre": "rock",
        "info": "Get ready to hear some mystifying electronic pop scores.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "1882 Adanac Street Vancouver, BC V5L 2E5",
            "location": "The WISE Hall"
        },
        "date": "March 12, 2022",
        "time": "9:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 23.55,
        "highest_price": 23.55,
        "currency": "CAD"
    },
    {
        "event_title": "DROELOE",
        "type": "concert",
        "genre": "dance/electronic",
        "info": "Join DROELOE to hear bewildering electronica music.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "1022 Davie Street Vancouver, BC V6E 1M3",
            "location": "Celebrities Nighclub"
        },
        "date": "March 12, 2022",
        "time": "10:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 37.11,
        "highest_price": 37.11,
        "currency": "CAD"
    },
    {
        "event_title": "Dragonforce",
        "type": "concert",
        "genre": "metal",
        "info": "Ready to be blown away by some shocking power metal music.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "868 Granville St., Vancouver, BC V6Z 1K3",
            "location": "Commodore Ballroom"
        },
        "date": "March 13, 2022",
        "time": "7:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 45.25,
        "highest_price": 45.25,
        "currency": "CAD"
    },
    {
        "event_title": "The Backseat Lovers",
        "type": "concerts",
        "genre": "rock",
        "info": "Ready to listen to someo banging rock music?!",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "868 Granville St., Vancouver, BC V6Z 1K3",
            "location": "Commodore Ballroom"
        },
        "date": "March 14, 2022",
        "time": "7:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 36.50,
        "highest_price": 47.60,
        "currency": "CAD"
    },
    {
        "event_title": "Fruits Bats",
        "type": "concert",
        "genre": "rock",
        "info": "The Pet Parade,” the title track to Fruit Bats’ newest album, might be a surprising opening track for longtime fans of Eric D. Johnson’s beloved indie folk-rock project.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "3123 W Broadway, Vancouver, BC V6K 2H2",
            "location": "Hollywood Theatre"
        },
        "date": "March 18, 2022",
        "time": "8:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 47.43,
        "highest_price": 47.43,
        "currency": "CAD"
    },
    {
        "event_title": "Vancouver Canucks vs. Montreal Canadiens",
        "type": "sports",
        "genre": "hockey",
        "info": "Watch the Vancouver Canucks face off against the Montreal Canadiens.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "800 Griffiths Way, Vancouver, BC V6B 6G1",
            "location": "Rogers Arena"
        },
        "date": "March 9, 2022",
        "time": "7:30pm",
        "time_zone": "GMT-8",
        "lowest_price": 80.00,
        "highest_price": 455.00,
        "currency": "CAD"
    },
    {
        "event_title": "Vancouver Canucks vs. Washington Capitals",
        "type": "sports",
        "genre": "hockey",
        "info": "Watch the Vancouver Canucks face off against the Washington Capitals.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "800 Griffiths Way, Vancouver, BC V6B 6G1",
            "location": "Rogers Arena"
        },
        "date": "March 11, 2022",
        "time": "7:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 82.00,
        "highest_price": 361.00,
        "currency": "CAD"
    },
    {
        "event_title": "Vancouver Warriors vs. Toronto Rock",
        "type": "sports",
        "genre": "hockey",
        "info": "Watch the Vancouver Warriors face off against the Toronto Rock.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "800 Griffiths Way, Vancouver, BC V6B 6G1",
            "location": "Rogers Arena"
        },
        "date": "March 12, 2022",
        "time": "7:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 20.00,
        "highest_price": 41.00,
        "currency": "CAD"
    },
    {
        "event_title": "Vancouver Canucks vs. Tampa Bay Lightning",
        "type": "sports",
        "genre": "hockey",
        "info": "Watch the Vancouver Canucks face off against the Tampa Bay Lightning.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "800 Griffiths Way, Vancouver, BC V6B 6G1",
            "location": "Rogers Arena"
        },
        "date": "March 11]3, 2022",
        "time": "7:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 53.00,
        "highest_price": 273.00,
        "currency": "CAD"
    },
    {
        "event_title": "Vancouver Canucks vs. New Jersey Devils",
        "type": "sports",
        "genre": "hockey",
        "info": "Watch the Vancouver Canucks face off against the New Jersey Devils.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "800 Griffiths Way, Vancouver, BC V6B 6G1",
            "location": "Rogers Arena"
        },
        "date": "March 15, 2022",
        "time": "7:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 51.00,
        "highest_price": 255.00,
        "currency": "CAD"
    },
    {
        "event_title": "Vancouver Canucks vs. Detriot Red Wings",
        "type": "sports",
        "genre": "hockey",
        "info": "Watch the Vancouver Canucks face off against the Detriot Red Wings.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "800 Griffiths Way, Vancouver, BC V6B 6G1",
            "location": "Rogers Arena"
        },
        "date": "March 17, 2022",
        "time": "7:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 49.00,
        "highest_price": 249.00,
        "currency": "CAD"
    },
    {
        "event_title": "Vancouver Canucks vs. Calgary Flames",
        "type": "sports",
        "genre": "hockey",
        "info": "Watch the Vancouver Canucks face off against the Calgary Flames.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "800 Griffiths Way, Vancouver, BC V6B 6G1",
            "location": "Rogers Arena"
        },
        "date": "March 19, 2022",
        "time": "7:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 82.00,
        "highest_price": 361.00,
        "currency": "CAD"
    },
    {
        "event_title": "Vancouver Warriors vs. Albany FireWolves",
        "type": "sports",
        "genre": "hockey",
        "info": "Watch the Vancouver Warriors face off against the Albany FireWolves.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "800 Griffiths Way, Vancouver, BC V6B 6G1",
            "location": "Rogers Arena"
        },
        "date": "April 2, 2022",
        "time": "7:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 20.00,
        "highest_price": 47.00,
        "currency": "CAD"
    },
    {
        "event_title": "Vancouver Canucks vs. Vegas Golden Knights",
        "type": "sports",
        "genre": "hockey",
        "info": "Watch the Vancouver Canucks face off against the Vegas Golden Knights.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "800 Griffiths Way, Vancouver, BC V6B 6G1",
            "location": "Rogers Arena"
        },
        "date": "April 3, 2022",
        "time": "4:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 69.00,
        "highest_price": 631.00,
        "currency": "CAD"
    },
    {
        "event_title": "Bianca Del Rio: Unsanitized",
        "type": "art&theatre",
        "genre": "comedy",
        "info": "Get your vaccinations and cocktails because everyone's favorite 'clown in a gown', Bianca Del Rio, is returning to the stage.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "600 Block Hamilton St., Vancouver, BC V6B 2P1",
            "location": "Queen Elizabeth Theatre"
        },
        "date": "March 8, 2022",
        "time": "8:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 63.75,
        "highest_price": 63.75,
        "currency": "CAD"
    },
    {
        "event_title": "Everything Is Terrible",
        "type": "art&theatre",
        "genre": "theatre",
        "info": "an artist collective based in Los Angelesthat finds and manipulates unusual, dated, and Campy clips of VHS tapes from the late 20th century and early 21st centuryd.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "3123 W Broadway, Vancouver, BC V6K 2H2",
            "location": "Hollywod Theatre"
        },
        "date": "March 20, 2022",
        "time": "7:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 26.05,
        "highest_price":26.05,
        "currency": "CAD"
    },
    {
        "event_title": "Celtic Illusion",
        "type": "art&theatre",
        "genre": "dance",
        "info": "A breathtaking array of variety, fusing Irish Dance, Magic and influential flavours of Fosse, Michael Jackson, with a Broadway style, Celtic Illusion is a show like no other in the world.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "800 Griffiths Way, Vancouver, BC V6B 6G1",
            "location": "Rogers Arena"
        },
        "date": "April 6, 2022",
        "time": "7:30pm",
        "time_zone": "GMT-8",
        "lowest_price": 61.00,
        "highest_price": 85.00,
        "currency": "CAD"
    },
    {
        "event_title": "Donnell Rawlings",
        "type": "art&theatre",
        "genre": "comedy",
        "info": "Ready to get in some good laughs from American comedian, actor, and radio host, Donnell Rawlings.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "abbotsford",
            "address": "3123 W Broadway, Vancouver, BC V6K 2H2",
            "location": "Hollywood Theatre"
        },
        "date": "April 11, 2022",
        "time": "8:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 52.74,
        "highest_price": 52.74,
        "currency": "CAD"
    },
    {
        "event_title": "War On The Catwalk Tour - 2022",
        "type": "art&theatre",
        "genre": "performance art",
        "info": "Get ready for your favorite queens from Canada and America as they perform live on stage for drag fans from Halifax to Vancouver.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "600 Block Hamilton St., Vancouver, BC V6B 2P1",
            "location": "Queen Elizabeth Theatre"
        },
        "date": "April 13, 2022",
        "time": "8:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 54.00,
        "highest_price": 184.35,
        "currency": "CAD"
    },
    {
        "event_title": "Debra DiGiovanni",
        "type": "art&theatre",
        "genre": "comedy",
        "info": "Get ready to laugh like never before listening to multiple award-winning comedian, Debra DiGiovanni.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "3123 W Broadway, Vancouver, BC V6K 2H2",
            "location": "Hollywood Theatre"
        },
        "date": "May 2, 2022",
        "time": "8:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 47.10,
        "highest_price": 47.10,
        "currency": "CAD"
    },
    {
        "event_title": "Sebastian Maniscalco: Nobody Does This Tour",
        "type": "art&theatre",
        "genre": "comedy",
        "info": "Are you ready to have some good laughs from some standup comedy with animated delivery?.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "600 Block Hamilton St., Vancouver, BC V6B 2P1",
            "location": "Queen Elizabeth Theatre"
        },
        "date": "May 19, 2022",
        "time": "7:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 116.65,
        "highest_price": 509.71,
        "currency": "CAD"
    },
    {
        "event_title": "Hamilton",
        "type": "art&theatre",
        "genre": "theatre",
        "info": "Featuring a score that blends hip-hop, jazz, blues, rap, R&B, and Broadway, HAMILTON is the story of America then, as told by America now.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "600 Block Hamilton St., Vancouver, BC V6B 2P1",
            "location": "Queen Elizabeth Theatre"
        },
        "date": "May 24, 2022",
        "time": "8:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 263.52,
        "highest_price": 3490.42,
        "currency": "CAD"
    },
    {
        "event_title": "Across the Pond - Tour",
        "type": "art&theatre",
        "genre": "theatre",
        "info": "Ft. Stars of RuPaul Drag Race UK Season 2…A’WHORA + LAWRENCE CHANEY + BIMINI BON BOULASH + TAYCE.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "3123 W Broadway, Vancouver, BC V6K 2H2",
            "location": "Hollywood Theatre"
        },
        "date": "June 1, 2022",
        "time": "7:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 68.15,
        "highest_price": 152.10,
        "currency": "CAD"
    },
    {
        "event_title": "Gus Johnson - Here I Come",
        "type": "art&theatre",
        "genre": "comedy",
        "info": "Gus is boy who make comedy.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "600 Block Hamilton St., Vancouver, BC V6B 2P1",
            "location": "Vancouver Playhouse"
        },
        "date": "June 6, 2022",
        "time": "8:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 56.50,
        "highest_price": 73.47,
        "currency": "CAD"
    },
    {
        "event_title": "Ludavico Einaudi: Underwater Tour",
        "type": "art&theatre",
        "genre": "classical",
        "info": "Groundbreaking composer and pianist Ludovico Einaudi hosts new tour featuring new solo piano album, 'Underwater'.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "777 Homer St., Vancouver, BC V6B 2W1",
            "location": "The Centre in Vancouver"
        },
        "date": "June 14, 2022",
        "time": "8:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 120.00,
        "highest_price": 890.12,
        "currency": "CAD"
    },
    {
        "event_title": "Whose Live Anyway",
        "type": "art&theatre",
        "genre": "comedy",
        "info": "Hilarious improvised comedy and song all based on audience suggestions. Cast members Ryan Stiles, Greg Proops, Jeff B. Davis, and Joel Murray will leave you gasping with the very witty scenes they invent before your eyes.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "victoria",
            "address": "806 Broughton Street, Victoria, BC V8W 1E5",
            "location": "Royal Theatre"
        },
        "date": "July 12, 2022",
        "time": "8:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 79.00,
        "highest_price": 79.00,
        "currency": "CAD"
    },
    {
        "event_title": "Pam Ann",
        "type": "art&theatre",
        "genre": "comedy",
        "info": "Performances focus on the nuances of air travel, identifying the individual quirks of some of the biggest international airlines and their media stereotypes.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "3123 W Broadway Vancouver, BC V6K 2H2",
            "location": "Holywood Theatre"
        },
        "date": "Oct 27, 2022",
        "time": "8:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 56.33,
        "highest_price": 167.51,
        "currency": "CAD"
    },
    {
        "event_title": "Josh Ramsay",
        "type": "concert",
        "genre": "rock",
        "info": "The album is a sweeping exploration of musical styles featuring collaborations with a wide range of Canadian singers from across the musical spectrum.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "victoria",
            "address": "#3 Centennial Square Pandora at Government, Victoria, BC V8W1E5",
            "location": "MCPHERSON PLAYHOUSE"
        },
        "date": "March 11, 2022",
        "time": "8:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 57.50,
        "highest_price": 57.50,
        "currency": "CAD"
    },
    {
        "event_title": "Lala Lala. Elton Aura",
        "type": "concert",
        "genre": "other",
        "info": "I want total freedom, total possibility, total acceptance. I want to fall in love with the rock.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "2321 Main Street Vancouver, BC V5T 3C9",
            "location": "The Fox Cabaret"
        },
        "date": "March 19, 2022",
        "time": "8:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 27.15,
        "highest_price": 27.15,
        "currency": "CAD"
    },
    {
        "event_title": "Andrew Bayer",
        "type": "concert",
        "genre": "dance/electronic",
        "info": "Be ready to be hypnotized by his melodic trances that flow through all his music.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "1022 Davie Street, Vancouver, BC V6E 1M3",
            "location": "Celebrities Nightclub"
        },
        "date": "March 19, 2022",
        "time": "10:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 39.35,
        "highest_price": 39.35,
        "currency": "CAD"
    },
    {
        "event_title": "Anna Meredith",
        "type": "concert",
        "genre": "dance/electronic",
        "info": "Composer, producer and performer of both acoustic and electronic music. Her sound is frequently described as 'uncategorisable' and 'genre-defying'.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "2321 Main Street Vancouver, BC V5T 3C9",
            "location": "The Fox Cabaret"
        },
        "date": "March 23, 2022",
        "time": "8:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 20.50,
        "highest_price": 20.50,
        "currency": "CAD"
    },
    {
        "event_title": "Ducks Ltd., Tough Age",
        "type": "concert",
        "genre": "pop",
        "info": "the bright jangle-pop duo of Tom McGreevy (lead vocal, guitar, bass, keyboards) and Evan Lewis (guitar, bass, drum programming), accomplish the impossible.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "1882 Adanac Street Vancouver, BC V5L 2E5",
            "location": "The WISE Hall"
        },
        "date": "March 23, 2022",
        "time": "8:30pm",
        "time_zone": "GMT-8",
        "lowest_price": 19.98,
        "highest_price": 19.98,
        "currency": "CAD"
    },
    {
        "event_title": "Clutch",
        "type": "concert",
        "genre": "metal",
        "info": "Get ready for Clutch's new tour featuring a new album!",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "868 Granville St., Vancouver, BC V6Z 1K3",
            "location": "Commodore Ballroom"
        },
        "date": "March 28, 2022",
        "time": "7:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 65.00,
        "highest_price": 65.00,
        "currency": "CAD"
    },
    {
        "event_title": "Pillow Queens",
        "type": "concert",
        "genre": "rock",
        "info": "Listen live to Pillow Queens' new album 'Leave the Light On'.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "1882 Adanac Street Vancouver, BC V5L 2E5",
            "location": "The WISE Hall"
        },
        "date": "March 29, 2022",
        "time": "8:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 23.55,
        "highest_price": 23.55,
        "currency": "CAD"
    },
    {
        "event_title": "Killy",
        "type": "concert",
        "genre": "hiphop/rap",
        "info": "Killy happening at Fortune Sound Club.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "147 East Pender Street, Vancouver, BC V6A 1T6",
            "location": "Fortune Sound Club"
        },
        "date": "April 1, 2022",
        "time": "6:30pm",
        "time_zone": "GMT-8",
        "lowest_price": 39.35,
        "highest_price": 155.00,
        "currency": "CAD"
    },
    {
        "event_title": "Armnhmr",
        "type": "concert",
        "genre": "dance/electronic",
        "info": "Be amazed at the electrifying beats of Armnhmr's new tour!",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "1022 Davie Street, Vancouver, BC V6E 1M3",
            "location": "Celebrities Nightclub"
        },
        "date": "April 1, 2022",
        "time": "10:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 44.63,
        "highest_price": 44.63,
        "currency": "CAD"
    },
    {
        "event_title": "Del Amitri",
        "type": "concert",
        "genre": "rock",
        "info": "Get hyped to listen to astonishing rock songs from Del Amitri",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "319 Main St, Vancouver, BC V6A 2S9",
            "location": "Imperial"
        },
        "date": "April 2, 2022",
        "time": "7:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 32.75,
        "highest_price": 32.75,
        "currency": "CAD"
    },
    {
        "event_title": "Antibalas",
        "type": "concert",
        "genre": "world",
        "info": "This Brooklyn-based afrobeat band will astound you with at this tour!",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "868 Granville St., Vancouver, BC V6Z 1K3",
            "location": "Commodore Ballroom"
        },
        "date": "April 2, 2022",
        "time": "8:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 47.75,
        "highest_price": 47.75,
        "currency": "CAD"
    },
    {
        "event_title": "Tom Grennan",
        "type": "concert",
        "genre": "rock",
        "info": "Get blown away by astounding rock songs!",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "319 Main St, Vancouver, BC V6A 2S9",
            "location": "Imperial"
        },
        "date": "April 4, 2022",
        "time": "7:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 38.23,
        "highest_price": 38.23,
        "currency": "CAD"
    },
    {
        "event_title": "MEUTE",
        "type": "concert",
        "genre": "dance/electronic",
        "info": "This techno marching band combines hypnotic driving techno and expressive brass band music.",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "254 E Hastings Street Vancouver, BC V6A 1P2",
            "location": "Rickshaw Theatre"
        },
        "date": "April 5, 2022",
        "time": "8:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 42.14,
        "highest_price": 42.14,
        "currency": "CAD"
    },
    {
        "event_title": "Omar Apollo",
        "type": "concert",
        "genre": "r&b",
        "info": "Get ready to hear some breathtaking R&B music. ",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "vancouver",
            "address": "868 Granville St., Vancouver, BC V6Z 1K3",
            "location": "Commodore Ballroom"
        },
        "date": "April 6, 2022",
        "time": "7:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 40.00,
        "highest_price": 138.95,
        "currency": "CAD"
    },
    {
        "event_title": "Imagine Dragons: Mercury World Tour",
        "type": "concert",
        "genre": "rock",
        "info": "Join Imagine Dragons in Save On Foods Memorial Centre on their world tour!",
        "image": "",
        "venue": {
            "country": "canada",
            "state": "null",
            "city": "victoria",
            "address": "1925 Blanshard Street, Victoria, BC V8T 4J2",
            "location": "Queen Elizabeth Theatre"
        },
        "date": "April 7, 2022",
        "time": "7:00pm",
        "time_zone": "GMT-8",
        "lowest_price": 60.37,
        "highest_price": 60.37,
        "currency": "CAD"
    }];
    var event_db = db.collection("events");
    events.forEach(function (event) { //cycle thru json object in array
        console.log(event); // check if it wrote the correct info
        event_db.doc(event.event_title).set(event) // add this new doc, id is event title 
            .then(function (doc) { //success 
                console.log("wrote to events collection " + doc); // checking to see if it worked
            })
    })
}

let select = 'event_title' // defining a default value for select, can change this to something that makes more sense
let current_page = 1
let page_size = 6

function get_sort_option(){ // select variable will be updated when user selects a different filter/sort option
    select = $("#dropdown option:selected").val() // gets the value of the selected choice in dropdown menu
    displayCards('events') // call function becuase you want the new sorted order of events to be immediately displayed
    console.log(select) // checking if user selected choice matches with the code
    
}

function display_page_buttons(total_pages){
    console.log("called")
    var pagination = 1
    $('#page_buttons button').remove() // clear the buttons to make sure they do not keep stacking if you call this more than once
    for (pagination; pagination<total_pages + 1; pagination++){
        page_button = "<button type='button' class='btn navy text-white page_button' value='" + pagination + "'>" + pagination + "</button>"
        old = $('#page_buttons').html()
        $('#page_buttons').html(old + page_button)
    }
}

// read events collection and display onto events.html
function displayCards(collection) {
    let cardTemplate = document.getElementById("eventCardTemplate")   
    // let select = document.getElementById('dropdown').value;/// not automatic need to refres to see result -AN
    let events_array = []
    db.collection(collection)
    .orderBy(select) //sorting by options from drop down
    .limit(8)
    .get()
        .then(snap => {
            var i = 1;
            $('#events-go-here div').remove()
            snap.forEach(doc => { //iterate thru each doc
                events_array.push(doc.data()) // adding each event to an array
                // var title = doc.data().event_title; // get event title
                // var type = doc.data().type; // get event type
                // var genre = doc.data().genre; // get event genre    
                // var details = doc.data().info; // get event info
                // var date = doc.data().date; // get event date
                // var time = doc.data().time; // get event time
                // var venue = doc.data().venue.location; // get event location 
                let newcard = cardTemplate.content.cloneNode(true);

                //update card info
                var eventID = doc.id
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-type').innerHTML = type;
                newcard.querySelector('.card-genre').innerHTML = genre;
                newcard.querySelector('.card-location').innerHTML = venue;
                newcard.querySelector('.card-desc').innerHTML = details;
                newcard.querySelector('.card-date').innerHTML = date;
                newcard.querySelector('.card-time').innerHTML = time;
                // newcard.querySelector('.card-image').src = "./images/" + collection + ".jpg"; //hikes.jpg

                //give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                newcard.querySelector('i').id = 'save' + eventID; // saves the hikeID to user's document -AN
                newcard.querySelector('i').onclick = () =>saveFavourites(eventID); //the hikeId as input -AN

                //attach to gallery
                // document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;
            })
            total_events = events_array.length
            total_pages = Math.ceil(total_events / page_size)
            console.log(total_pages)
            display_page_buttons(total_pages)
            start_index = page_size * (current_page - 1)
            stop_index = page_size * (current_page - 1) + page_size
            for (start_index; start_index<stop_index; start_index++) { // adds the events to the dom
                let newcard = cardTemplate.content.cloneNode(true);
    
                var title = events_array[start_index].event_title; // get event title
                var type = events_array[start_index].type; // get event type
                var genre = events_array[start_index].genre; // get event genre    
                var details = events_array[start_index].info; // get event info
                var date = events_array[start_index].date; // get event date
                var time = events_array[start_index].time; // get event time
                var venue = events_array[start_index].venue.location; // get event location
                
                // update the card information
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-type').innerHTML = type;
                newcard.querySelector('.card-genre').innerHTML = genre;
                newcard.querySelector('.card-location').innerHTML = venue;
                newcard.querySelector('.card-desc').innerHTML = details;
                newcard.querySelector('.card-date').innerHTML = date;
                newcard.querySelector('.card-time').innerHTML = time;
    
                document.getElementById(collection + "-go-here").appendChild(newcard);
            }

        }) 
}

function get_current_page(){
    current_page = $(this).val() // grabs the value which the apge number is stored in
    console.log(current_page)
    displayCards('events') // checking if it is the right page
}

function get_first_prev_next_last_button(){
    if ($(this).attr('id') == 'first') { // if id of button clicked is 'first', set current page to first page
        current_page = 1
        displayCards('events')
    }
    else if ($(this).attr('id') == 'prev')  { // if id of button clicked is 'prev', minus 1 
        current_page -= 1
        if (current_page < 1) { // to make sure the current page doesn't go a page that doesn't exist
            current_page = 1
        }
        displayCards('events')
    }
    else if ($(this).attr('id') == 'next') {
        current_page += 1
        if (current_page > total_pages) { // to make sure the current page doesn't go to page that doesn't exist
            current_page = total_pages
        }
        displayCards('events')
    }
    else if ($(this).attr('id') == 'last') {
        current_page = total_pages
        displayCards('events')
    }
    console.log(current_page) // checking if it is the right page
}

//this function is called when the 'favourite' icon has been clicked.
// // It will add the event to an events array
// // // fill in the 'favourite icon to indicate user has liked the event
function saveFavourites(eventID) {
    currentUser.set({ //CURRENT USER VARIABLE HERE -AN
            favourites: firebase.firestore.FieldValue.arrayUnion(eventID)
        }, {
            merge: true
        })
        .then(function () {
            console.log("this event has been saved for user: " + currentUser); // + current user variable, change later-AN
            var iconID = 'save-' + eventID;
            console.log('this iconID:'+iconID);
            //document.getElementById(iconID).class ="fa-solid fa-heart"; //SOLID RED HEART HERE -AN
        });
} // // // ----------- -AN

function setup(){
    displayCards("events");   
    $('#dropdown').change(get_sort_option) // determines if there was a change in the dropdown, i.e, there was a selection
    $('body').on('click', '.page_button', get_current_page)
    $('body').on('click', 'button', get_first_prev_next_last_button)
}

$(document).ready(setup)
