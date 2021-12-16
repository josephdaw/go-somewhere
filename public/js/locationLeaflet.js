var startlat = -34.92537;
var startlon = 138.59973;

var options = {
  center: [startlat, startlon],
  zoom: 12
}

var map = L.map('map', options);

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    maxZoom: 20,
    minZoom: 1
  }).addTo(map);


var myMarker = L.marker([startlat, startlon], { title: "Coordinates", alt: "Coordinates", draggable: true }).addTo(map).on('dragend', function () {
  var lat = myMarker.getLatLng().lat.toFixed(8);
  var lon = myMarker.getLatLng().lng.toFixed(8);
  document.getElementById('lat').value = lat;
  document.getElementById('lon').value = lon;
  myMarker.bindPopup("Lat " + lat + "<br />Lon " + lon).openPopup();
});

function chooseAddr(lat1, lng1, placeName) {
  // update the model location based on user selection
  document.querySelector('#search-title').value = placeName

  myMarker.closePopup();
  map.setView([lat1, lng1], 18);
  myMarker.setLatLng([lat1, lng1]);
  lat = lat1.toFixed(8);
  lon = lng1.toFixed(8);
  myMarker.bindPopup(placeName).openPopup();
}

function renderResults(arr) {
  var out = "<br />";
  var i;

  if (arr.length > 0) {
    for (i = 0; i < arr.length; i++) {
      // separate the name of the location from the address
      const labelArray = arr[i].display_name.split(",");
      const placeName = labelArray.shift();

      // console.log(placeName);
      out += `<div class='address' title='Show Location and Coordinates' onclick='chooseAddr(${arr[i].lat}, ${arr[i].lon}, "${placeName}");return false;'>${arr[i].display_name}</div>`;
    }
    document.getElementById('results').innerHTML = out;
  }
  else {
    document.getElementById('results').innerHTML = "Sorry, no results...";
  }
};


function addr_search() {
  var inp = document.getElementById("addr");
  var xmlhttp = new XMLHttpRequest();
  var url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + inp.value;

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var myArr = JSON.parse(this.responseText);
      renderResults(myArr);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}
