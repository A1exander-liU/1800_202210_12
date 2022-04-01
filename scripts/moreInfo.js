/// this a function that creates a URL of the selected object then display the remaining details left out from the cards thats in the database///
function showDetails(eventID) {
   
    console.log( eventID + "is inside the show details")
    let params = new URL(window.location.href); ///ceates a URL object
    let name = params.searchParams.get("name")
    console.log("MY name:" + name)
    let image = params.searchParams.get("image")
    let details = params.searchParams.get("details")
    
    // newCard.querySelector('name').innerHTML = id ;
    // newCard.querySelector('image') = image ;
    // newCard.querySelector('details') = details ;
    document.getElementsByClassName("name").innerHTML = name;  
    document.getElementsByClassName("details").innerHTML = details; 
    // $(".name").innerHTML(id);
    
   
}

showDetails();