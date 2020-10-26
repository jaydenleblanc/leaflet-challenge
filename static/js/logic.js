
// var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// // Perform a GET request to the query URL
// d3.json(url, function (data) {
//     console.log(data.features);
// });

function createMap(earthquakes) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 5,
        id: "light-v10",
        accessToken: API_KEY
    });

    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
        "Light Map": lightmap
    };

    // Create an overlaymap object to hold the earthquakes
    var overlayMaps = {
        "Earthquake Locations": earthquakes

    };

    // Create the map object with options
    var map = L.map("mapid", {
        center: [61.2181, -149.9003],
        zoom: 12,
        layers: [lightmap, earthquakes]
    });

    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);

    // Create a legend to display information about our map
    var info = L.control({
        position: "bottomright"
    });

    // When the layer control is added, insert a div with the class of "legend"
    info.onAdd = function () {
        var div = L.DomUtil.create("div", "legend");
        return div;
    };
    // Add the info legend to the map
    info.addTo(map);



}

function createMarkers(response) {
    var earthquakeMarkers = [];
    // var earthquakeMagnitudes = [];
    console.log(response.features);

    for (var i = 0; i < (response.features).length; i++) {
        var lat = response.features[i].geometry.coordinates[1];
        var long = response.features[i].geometry.coordinates[0];
        // var magnitude = response.features[i].properties.mag;
        //console.log(lat);
        //console.log(long);
        var earthquakeMarker = L.circle([lat, long], {
            fillOpacity: 0.75,
            color: getColor(response.features[i].geometry.coordinates[2]),
            fillcolor: "green",
            radius: response.features[i].properties.mag * 1500
        });
        // var earthquakeMagnitude = L.marker([magnitude]);
        earthquakeMarkers.push(earthquakeMarker);
        // earthquakeMagnitudes.push(earthquakeMagnitude);
    }

    createMap(L.layerGroup(earthquakeMarkers));
    // createMap(L.layerGroup(earthquakeMagnitudes));


    // use if statements to determine the color based on earthquakes magnitude




};



// function getRadius(magnitude) {
//     return magnitude * 2;
// }



function getColor(density) {
    switch (true) {

        case density > 70:
            return "red"
        case density > 60:
            return "red"
        case density > 50:
            return "green";
        case density > 40:
            return "green";
        case density > 30:
            return "yellow";
        case density > 20:
            return "yellow";
        case density > 10:
            return "pink";
        default:
            return "purple";
    }
}



// use if statements to determine the color based on earthquakes magnitude



// // Initialize array for earthquake coordinates
// var earthquakeCoordinates = [];

// Create marker for each place of earthquake


//     // Add the marker to the array
//     earthquakeMarker.push(earthquakeCoordinates);
// }
// // Create a layer group make of earthquake coordinates array
// createMap(L.layerGroup(earthquakeCoordinates));



// Store our API endpoint as queryUrl
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// Perform a GET request to the query URL
d3.json(url, createMarkers);


