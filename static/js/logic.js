
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(url, function (data) {
    console.log(data.features);
});

function createMap(earthquakes) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
    });

    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
        "Light Map": lightmap
    };

    // Create an overlaymap object to hold the earthquake
    var overlayMaps = {
        "Earthquakes": earthquakes
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

}

function createMarkers(response) {
    var earthquakeMarkers = [];

    for (var i = 0; i < (response.features).length; i++) {
        var lat = response.features[i].geometry.coordinates[1];
        var long = response.features[i].geometry.coordinates[0];
        //console.log(lat);
        //console.log(long);
        var earthquakeMarker = L.marker([lat, long]);
        earthquakeMarkers.push(earthquakeMarker);
    }

    createMap(L.layerGroup(earthquakeMarkers));
};

// use if statements to determine the color based on earthquakes magnitude


function
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


