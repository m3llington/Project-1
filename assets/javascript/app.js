
function displayBreweries(){
    console.log("test");
    
  $("#Event").on("submit", function(event){
    event.preventDefault();
    console.log("test2");
    var city = $("#event").val().trim();
    //searches for breweries by city, and limit it to showing 5
    var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + city +"&per_page=5";
    // var city = $("#event").val();
    //must create on click event to take in value from form when submit is clicked

    $.ajax({
        url: queryURL,
        method : "GET"
     }).then(function(response) {
         console.log(response);

        var breweries = response;
         for (var i = 0; i < breweries.length; i++){
            //  Creating variables to hold brewery information
            var brewery = {
                 name : breweries[i].name,
                 postalCode : breweries[i].postal_code,
                 type : breweries[i].brewery_type,
                 city : breweries[i].city,
                 phone : breweries[i].phone,
                 state : breweries[i].state,
                 street : breweries[i].street,
                 url : breweries[i].website_url
            };

         
           
            console.log(brewery);

            var tr = $("<tr>");

            var tdName = $("<td>").text(brewery.name);
            var tdPostalCode = $("<td>").text(brewery.postalCode);
            var tdType = $("<td>").text(brewery.type);
            var tdCity = $("<td>").text(brewery.city);
            var tdPhone = $("<td>").text(brewery.phone);
            var tdState = $("<td>").text(brewery.state);
            var tdStreet = $("<td>").text(brewery.street);
            var tdUrl = $("<td>").text(brewery.url);
            // would like to find out how to turn this text into a url once displayed
            // maybe add an attribute to the variable that turns the value into a link?
            

            tr.append(tdName).append(tdType).append(tdPhone).append(tdStreet).append(tdCity).append(tdState).append(tdPostalCode).append(tdUrl);

            $(".breweries").append(tr);
            // $(".breweries").append(brewery.name);
            

            // $(".breweries").append(breweries[i].name + " ");
            // $(".breweries").append(breweries[i].postal_code);
         }

     });
  });
  
  
  
  
   
    

}
displayBreweries();


function displayEvents(){
    var city = "orlando";
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=TSEGa9L3UMUnkG8jrVBHViun6NdHepmA&city=" + city + "";
    console.log("displayevents");
    $.ajax({
        url : queryURL,
        method : "GET"
    }).then(function(response) {
        var eventsArray = response._embedded.events
       
       
        

        for (var i = 0; i < eventsArray.length ; i++){
            
           console.log(eventsArray[i].name);
        }    
    });
}

displayEvents();

// console.log("works");

