let map;
//https://roads.googleapis.com/v1/snapToRoads?parameters&key=AIzaSyCZak7Kgl56CREYyFdNzT3pAQzWYVzhmII
async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -27.585006713867188, lng: -48.526302337646484 },
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.HYBRID 
  });
}

initMap();