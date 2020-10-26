// Create the map object with options
var map = L.map("mapid", {
    center: [61.2181, -149.9003],
    zoom: 20
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 5,
    id: "light-v10",
    accessToken: API_KEY
}).addTo(map);

// Use this URL to get the geojson data
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform GET request to query URL
d3.json(url, buildPlot);


// Create legend on map

var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);


// Create function to build circles onto the map

function buildPlot(response) {
    console.log(response);

    var earthquakeMarkers = [];
    console.log(response.features);

    for (var i = 0; i < (response.features).length; i++) {
        var lat = response.features[i].geometry.coordinates[1];
        var long = response.features[i].geometry.coordinates[0];

        // Set circle markers
        var earthquakeMarker = L.circle([lat, long], {
            fillOpacity: 0.75,
            color: getColor(response.features[i].geometry.coordinates[2]),
            fillcolor: "green",
            radius: response.features[i].properties.mag * 1500
        }).bindPopup("<h1>" + response.features[i].properties.place + "</h1>").addTo(map);
        earthquakeMarkers.push(earthquakeMarker);

    }

}

function getColor(density) {
    switch (true) {

        case density > 90:
            return "red"
        case density > 80:
            return "red"
        case density > 70:
            return "orange"
        case density > 60:
            return "orange"
        case density > 50:
            return "yellow";
        case density > 40:
            return "yellow";
        case density > 30:
            return "green";
        case density > 20:
            return "green";
        case density > 10:
            return "magenta";
        default:
            return "purple";
    }
}
