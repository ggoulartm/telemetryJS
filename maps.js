let map;

const CREDENTIAL_KEY = "MY_CREDENTIAL_KEY"

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -27.585006713867188, lng: -48.526302337646484 },
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.HYBRID 
  });
}

initMap();