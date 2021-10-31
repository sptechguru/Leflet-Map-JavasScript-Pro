
//map is Working two coordiantes for latitude and Longitude & working tileLayer

const map = L.map('map').setView([22.9074872, 79.07306671],5); //  .fitWorld()  5 is zoom 

const  tittleurl =  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; //that is {s} is sub Domain x-axis, Y-axis,Z-axis

const attribution = '<button type="button"><a href="https://www.google.com/">Google Search</a> </button>';

const tiles = L.tileLayer(tittleurl,{attribution});
tiles.addTo(map);

//that is marker 
const marker2 = L.marker([22.9074872, 79.07306671]).addTo(map);


// custom icon add 

const icon = L.icon({

    iconUrl : "../img/1.png",
    iconSize:     [80, 65], // size of the icon

    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76]

})


const marker = L.marker([18.920675417289807,72.82952788802635],{
    icon
});


marker.bindTooltip('<h2> My First Custom icon for bindTooltip</h2>');

marker2.bindPopup('<h2>  Default  icon ... </h2>');

marker.addTo(map)
marker2.addTo(map);


//that is cicle
const CLayer = L.circle([32.9074870, 79.07306661], {
color: 'coral',
fillColor: 'blue',
fillOpacity: 0.5,
radius:20000,
}).addTo(map);

CLayer.bindPopup("I am a circle.").openPopup();

//that is square for Box

const bounds  = [[54.559322,-5.767822],[56.1210604,-3.021240]];
const  customcolor = {color: "black", weight: 1,fillColor: 'green',
fillOpacity: 0.5,};

const rectangle = L.rectangle(bounds,customcolor);
rectangle.addTo(map);


//that is traingle

const traingle = [
    [25.774,-80.19],
    [18.466,-66.118],
    [32.321,-64.757]
];
const color = {color: "red", weight: 1,fillColor: 'powderblue',
fillOpacity: 0.5,};

const polyline = L.polygon(traingle,color);
polyline.addTo(map);



// polygon from an array of LatLng points Mutiple array of multiples sides


// const latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]]; //that is simple box

const latlngs = [
    [ // first polygon
      [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]], // outer ring
      [[37.29, -108.58],[40.71, -108.58],[40.71, -102.50],[37.29, -102.50]] // hole   4 MultiDimesional array
    ],
    
    [ // second polygon
      [[41, -111.03],[45, -111.04],[45, -104.05],[41, -104.05]]
    ],
  ];

// const polygon2 = L.polygon(latlngs, {color: 'red',fillColor: 'blue',}).addTo(map);

// // zoom the map to the polygon
// map.fitBounds(polygon2.getCenter());  //getCenter() getCenter



//function click

const popup = L.popup();

function MapClick(e) {

  const radius = e.accuracy / 2;

  L.marker(e.latlng).addTo(map)
    .bindPopup("You are within " + radius + " meters from this point").openPopup();

    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString()+'That is radius'+radius)
        .openOn(map);
console.log("hi that is function Click event.....");

}
map.on('click', MapClick);


var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
    denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
    aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
    golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');


    var cities = L.layerGroup([littleton, denver, aurora, golden]);


    
    var grayscale = L.tileLayer(map, {id: 'MapID', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution}),
    streets   = L.tileLayer(map, {id: 'MapID', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution});


var map2 = L.map('map', {
    center: [39.73, -104.99],
    zoom: 10,
    layers: [grayscale, cities]
});


var baseMaps = {
  "Grayscale": grayscale,
  "Streets": streets
};

var overlayMaps = {
  "Cities": cities
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

var baseMaps = {
  "<span style='color: gray'>Grayscale</span>": grayscale,
  "Streets": streets
};

// custom controls

// function getColor(d) {
//   return d > 1000 ? '#800026' :
//          d > 500  ? '#BD0026' :
//          d > 200  ? '#E31A1C' :
//          d > 100  ? '#FC4E2A' :
//          d > 50   ? '#FD8D3C' :
//          d > 20   ? '#FEB24C' :
//          d > 10   ? '#FED976' :
//                     '#FFEDA0';
// }

// var legend = L.control({position: 'bottomright'});

// legend.onAdd = function (map) {

//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = [0, 10, 20, 50, 100, 200, 500, 1000],
//         labels = [];

//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
//             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//     }

//     return div;
// };

// legend.addTo(map);



const geojsonFeature = {
  "type": "Feature",
  "properties": {
      "name": "Coors Field",
      "amenity": "Baseball Stadium",
      "popupContent": "This is where the Rockies play!"
  },
  "geometry": {
      "type": "Point",
      "coordinates": [18.920675417289807,72.82952788802635]
  }
};

const geo = L.geoJSON(geojsonFeature);
geo.addTo(map);


// const imagurl = '../img/23.png';

// const imageBounds = [

//   [18.920675417289807,72.82952788802635],

//   [19.920675417289807,82.82952788802635],

// ];

// const imageLayer = L.imageOverlay(imagurl,imageBounds).addTo(map);
// map.fitBounds(imageBounds);

// const googleLayer =  new L.Google();
// map.addLayer(googleLayer);

// const googleRoadmapLayer =  new L.Google('ROADMAP');
// map.addLayer(googleRoadmapLayer);

// const baseMaps = 
// {
//   'Google RoadMap':googleRoadmapLayer,
//   'Google':googleLayer
// };

// const overlayMaps = 
// {
//   'Countries':geo ,
//   'image':imageLayer
// };

// const control = L.control.layers(baseMaps, overlayMaps);
// control.addTo(map);




