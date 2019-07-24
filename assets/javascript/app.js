
function displayBreweries(){
    // var brewery = [];
    var queryURL = "https://api.openbrewerydb.org/breweries?by_city=orlando";

    $.ajax({
        url: queryURL,
        method : "GET"
     }).then(function(response) {
         console.log(response);

     });
}
displayBreweries();

// function displayRestaurants (){
//     var restaurant = [];
//     var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=orlando?api_key=34d46252ce0812f6608d380b60411f53";

//     $.ajax({
//         url: queryURL,
//         method : "GET"
//     })
// }

function displayEvents(){
    // var event = [];
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=TSEGa9L3UMUnkG8jrVBHViun6NdHepmA&postalCode=32803";

    $.ajax({
        url : queryURL,
        method : "GET"
    }).then(function(response) {
        console.log(response);
        for (var i = 0; i < response._embedded.events.length ; i++){
            var event = response._embedded.events;
        console.log (event[0].dates.start.dateTime); 
        }
       

    
    });
}

displayEvents();