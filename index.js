function initMap() {
  // The location of Uluru
  var home = { lat: 40.712776, lng: -74.005974 };
  // The map, centered at Uluru
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: home,
    mapId: "27de865f9cc32b67",
    disableDefaultUI: true,
  });

  const transitLayer = new google.maps.TransitLayer();
  transitLayer.setMap(map);
  const bikeLayer = new google.maps.BicyclingLayer();
  bikeLayer.setMap(map);
}
