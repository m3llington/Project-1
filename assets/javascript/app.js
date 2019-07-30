function displayBreweries() {
    console.log("test");

    $(".Info").on("submit", function (event) {
        event.preventDefault();
        console.log("test2");
        var city = $("#city").val().trim();
        //searches for breweries by city, and limit it to showing 5
        var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + city + "&per_page=5";

        //must create on click event to take in value from form when submit is clicked

        // Clears the page each time the user types a new city in
        $(".breweries").text("");

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var breweries = response;
            for (var i = 0; i < breweries.length; i++) {
                //  Creating variables to hold brewery information
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



                console.log(brewery);

                var tr = $("<tr>");

                var tdName = $("<td>").text(brewery.name);
                var tdPostalCode = $("<td>").text(brewery.postalCode);
                // create code to get 'type' capitalized
                var tdType = $("<td>").text(brewery.type.toUpperCase());
                var tdCity = $("<td>").text(brewery.city);
                var tdPhone = $("<td>").text(brewery.phone);
                var tdState = $("<td>").text(brewery.state);
                var tdStreet = $("<td>").text(brewery.street);
                var tdUrl = $("<td>").text(brewery.url);
                // would like to find out how to turn this text into a url once displayed
                // maybe add an attribute to the variable that turns the value into a link?


                tr.append(tdName).append(tdType).append(tdPhone).append(tdStreet).append(tdCity).append(tdState).append(tdPostalCode).append(tdUrl);

                $(".breweries").append(tr);

                // Clears the text field 
                $("#event").val("");


            }

        });
    });







}
// Easier Project Solution 
// 1. Either combine the displayEvents function with other function (call it displayInfo) so that both API calls happen at the same time and display in different tables (Events Table first, Breweries Table Second). This will elminate the need for two different pages altogether but will not be able to list the brewiers in order by proximity to the event,  or
// 2. Create an on-click function for the events to display, then create a second on-click function for the zip-code of each displayed event that populates a second table below that lists the breweries in order of closest proximity.

function displayEvents() {

    $(".Info").on("submit", function (event) {
        event.preventDefault();

        var city = $("#city").val().trim();
        var state = $("#state").val().trim();
        var type = $("#type").val().trim();
        var zip = $("#zip").val().trim();
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=TSEGa9L3UMUnkG8jrVBHViun6NdHepmA&city=" + city + "&stateCode=" + state + "&postalCode=" + zip + "&size=5";
        console.log("displayevents");

        $(".events").text("");

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var eventsArray = response._embedded.events




            for (var i = 0; i < eventsArray.length; i++) {
                var event = {
                    name: eventsArray[i].name,
                    type: eventsArray[i].classifications[0].segment.name,
                    street: eventsArray[i]._embedded.venues[0].address.line1,
                    city: eventsArray[i]._embedded.venues[0].city.name,
                    state: eventsArray[i]._embedded.venues[0].state.name,
                    zip: eventsArray[i]._embedded.venues[0].postalCode,
                    url: eventsArray[i]._embedded.venues[0].url
                }

                console.log(eventsArray[i]);
                // console.log(eventsArray[i].classifications[0].segment.name);

                var tr = $("<tr>");

                var tdName = $("<td>").text(event.name);
                var tdPostalCode = $("<td>").text(event.zip);
                // create code to get 'type' capitalized
                var tdType = $("<td>").text(event.type.toUpperCase());
                var tdCity = $("<td>").text(event.city);
                var tdState = $("<td>").text(event.state);
                var tdStreet = $("<td>").text(event.street);
                var tdUrl = $("<td>").text(event.url);

                tr.append(tdName).append(tdType).append(tdStreet).append(tdCity).append(tdState).append(tdPostalCode).append(tdUrl);

                $(".events").append(tr);

                // Clears the text field 
                $("#city").val("");
                $("#state").val("");
                $("#zip").val("");
                $("#type").val("");
                $("#start").val("");
                $("#end").val("");
            }
        });
    });
}
displayBreweries();
displayEvents();




$("#state").on("click", function () {

    console.log($("#state option:selected").text());
    console.log($("#state option:selected").val())
})


