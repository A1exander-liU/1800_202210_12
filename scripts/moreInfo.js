/// this a function that creates a URL of the selected object then display the remaining details left out from the cards thats in the database///
function showDetails(){
    let params = new URL(window.location.href); ///ceates a URL object
    let id = params.searchParams.get("event-title");  //parses the event infos from collection 
    let type = params.searchParams.get("card-type"); 
    let genre = params.searchParams.get("card-genre");
    let location = params.searchParams.get("card-location");  
    let details = params.searchParams.get("event-info");
    let date = params.searchParams.get("card-date");  
    let time = params.searchParams.get("card-time"); 
} 

showDetails()