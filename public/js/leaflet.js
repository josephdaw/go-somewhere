
// function to fetch all locations
const getLocationNames = async () => {
  const res = await fetch('/api/locations', {
    method: 'GET',
  })
  const data = await res.json()
  const locations = data.map(location => location.location_name)
  return locations;
}

// lookup locations and then display on map
function locationLookUp(locations) {
  // here you do something with data
  console.log(locations)

  // map start coordinates
  var startlat = -34.92537;
  var startlon = 138.59973;

  // Initialize map to specified coordinates
  var map = L.map('map', {
    center: [startlat, startlon],
    zoom: 12
  });

  // Add tiles (streets, etc)
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      maxZoom: 20,
      minZoom: 1
    }).addTo(map);

  var fg = L.featureGroup().addTo(map);

  var query_addr = locations;

  query_addr.forEach((query_addr) => {
    const provider = new window.GeoSearch.OpenStreetMapProvider()
    var query_promise = provider.search({
      query: query_addr
    });

    query_promise.then(console.log(query_promise))

    query_promise.then(value => {
      for (i = 0; i < value.length; i++) {
        // separate the name of the location from the address
        const labelArray = value[i].label.split(",");
        const placeName = labelArray.shift();
        const address = labelArray.join()


        var x_coor = value[i].x;
        var y_coor = value[i].y;
        var marker = L.marker([y_coor, x_coor]).addTo(fg)
        marker.bindPopup(`<b>${placeName}</b><br>${address}`).openPopup(); 
      };
    }, reason => {
      console.log(reason); // Error!
    });
  })
}

getLocationNames().then(locationLookUp);