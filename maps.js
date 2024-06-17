let map;

const CREDENTIAL_KEY = ""

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    center: { lat: -27.585006713867188, lng: -48.526302337646484 },
    zoom: 14,
    mapId: 'f5b17940ec1c83ea'
  });

  let marker = new AdvancedMarkerElement({
    map,
    position: { lat: -27.585006713867188, lng: -48.526302337646484 },
});

    window.placeMarker = placeMarker
    window.marker = marker
    window.map = map
}

function placeMarker(map, location, marker) {
    marker.position = location
    var infowindow = new google.maps.InfoWindow({
      content: 'Latitude: ' + location.lat +
      '<br>Longitude: ' + location.lng
    });
    infowindow.open(map,marker);
  }

initMap();