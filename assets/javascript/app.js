function displayEvents(){

    $(".Info").on("submit", function(event){
        event.preventDefault();
    //clears the no result div after the search bar is clicked
    $("#no-result").text("");
        // Variables to grab the users input and feed it into the API
        var city = $("#city").val().trim();
        var state = $("#state").val().trim();
        var type = $("#type").val().trim();
        var zip = $("#zip").val().trim();
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=TSEGa9L3UMUnkG8jrVBHViun6NdHepmA&city=" + city + "&stateCode=" + state + "&postalCode=" + zip+ "&size=5";

    // Clears the events table each time a new search occurs
    $(".events").text("");

    // Ajax call to grab the event info
    $.ajax({
        url : queryURL,
        method : "GET"
    }).then(function(response) {
        //if nothing is return from zipcode search it shows "no results found"
        if (!(response.page.totalElements)){
            $("#no-result").text("No results found");
            return false;
        };
        
        var eventsArray = response._embedded.events
       
        for (var i = 0; i < eventsArray.length ; i++){

            // Creating an object to hold the new event
            var event = {
                name : eventsArray[i].name,
                type : eventsArray[i].classifications[0].segment.name,
                street : eventsArray[i]._embedded.venues[0].address.line1,
                city: eventsArray[i]._embedded.venues[0].city.name,
                state: eventsArray[i]._embedded.venues[0].state.name,
                zip: eventsArray[i]._embedded.venues[0].postalCode,
                url : eventsArray[i]._embedded.venues[0].url
            }
        //    console.log(eventsArray[i]);
       
        // Creating a new table row
            var tr = $("<tr>");
            
            // Creating variables to hold the new event info
            var tdName = $("<td>").addClass("event-button").attr("data-city", event.city).text(event.name);
            var tdPostalCode = $("<td>").text(event.zip);
            var tdType = $("<td>").text(event.type.toUpperCase());
            var tdCity = $("<td>").text(event.city);
            var tdState = $("<td>").text(event.state);
            var tdStreet = $("<td>").text(event.street);

            // Making the URLs functioning links
            var tdUrl = $("<td>");
            var tdUrl_a = $("<a>");
            tdUrl_a.attr("href" , event.url);
            tdUrl_a.attr("target" , "_blank");
            tdUrl_a.text("Website");
            tdUrl.append(tdUrl_a);

            // Appending the new data to the new table row
            tr.append(tdName).append(tdType).append(tdStreet).append(tdCity).append(tdState).append(tdPostalCode).append(tdUrl);

            //  Appending the new table row to the 'events' table body
            $(".events").append(tr);

            // Clears the text field 
            $("#city").val("");
            $("#state").val("");
            $("#zip").val("");
            $("#type").val("");
            $("#start").val("");
            $("#end").val("");
        }
        
        $(".event-button").on("click", function(event){
            event.preventDefault();
            //stores the data attribute previously created into the variable city and feeds it into the api
            var city = $(this).attr("data-city");
           
            //searches for breweries by city, and limit it to showing 5
            var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + city +"&per_page=5";
        
            // Clears the page each time the user types a new city in
            $(".breweries").text("");

            // Ajax call to get the brewery info
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
        
                var breweries = response;
                 for (var i = 0; i < breweries.length; i++){

                    //  Creating an object to hold brewery information
                    var brewery = {
                        name: breweries[i].name,
                        postalCode: breweries[i].postal_code,
                        type: breweries[i].brewery_type,
                        city: breweries[i].city,
                        phone: breweries[i].phone,
                        state: breweries[i].state,
                        street: breweries[i].street,
                        url: breweries[i].website_url
                    };
                    // console.log(brewery);

                    // Creating a new table row 
                    var tr = $("<tr>");
                    
                    // Creating variables to 
                    var tdName = $("<td>").text(brewery.name);
                    var tdPostalCode = $("<td>").text(brewery.postalCode);
                    var tdType = $("<td>").text(brewery.type.toUpperCase());
                    var tdCity = $("<td>").text(brewery.city);
                    var tdPhone = $("<td>").text(brewery.phone);
                    var tdState = $("<td>").text(brewery.state);
                    var tdStreet = $("<td>").text(brewery.street);
                    var tdUrl = $("<td>");
                    var tdUrl_a = $("<a>");
                    tdUrl_a.attr("href" , brewery.url);
                    tdUrl_a.attr("target" , "_blank");
                    tdUrl_a.text("Website");
                    tdUrl.append(tdUrl_a);
                
                 
                    // Appending all the data to the new table row
                    tr.append(tdName).append(tdType).append(tdPhone).append(tdStreet).append(tdCity).append(tdState).append(tdPostalCode).append(tdUrl);

                    // Appending the new table row to the breweries table
                    $(".breweries").append(tr);
        
                    // Clears the text field 
                    $("#event").val("");
                 }
        
             });
          }); 
    });
    });
}

displayEvents();



