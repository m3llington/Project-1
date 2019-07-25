
function displayBreweries(){
    
    var queryURL = "https://api.openbrewerydb.org/breweries?by_city=orlando";

    $.ajax({
        url: queryURL,
        method : "GET"
     }).then(function(response) {
        //  console.log(response);
         console.log(response[0].name);

        var breweries = response;
         for (var i = 0; i < breweries.length; i++){
            console.log(breweries[i].name);
            
            $(".breweries").text(breweries[i].name);
         }

     });
}
displayBreweries();


function displayEvents(){
    
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=TSEGa9L3UMUnkG8jrVBHViun6NdHepmA&postalCode=32803";

    $.ajax({
        url : queryURL,
        method : "GET"
    }).then(function(response) {
        // console.log(response);
        for (var i = 0; i < response._embedded.events.length ; i++){
            var event = response._embedded.events;
        // console.log (event[0].dates.start.dateTime); 
        }    
    });
}

displayEvents();

// console.log("works");
console.log("works");

