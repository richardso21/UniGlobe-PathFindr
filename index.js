let map;
let markers;
// The location of NYC (demo)
let home = { lat: 40.712776, lng: -74.005974 };
let pressedLocation;
let listener;
let placeholderMarker;

// cookie funcs >>>
function bake_cookie(obj) {
  document.cookie = JSON.stringify(obj);
}

function read_cookie() {
  return JSON.parse(document.cookie);
}
if (document.cookie === "") {
  markers = [
    {
      position: home,
      type: "current",
    },
  ];
  bake_cookie(markers);
}
markers = read_cookie();
// cookie funcs <<<

function initMap() {
  // Init map, centered at NYC (demo)
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: home,
    mapId: "27de865f9cc32b67",
    disableDefaultUI: true,
  });

  // add bike & transit layer
  const transitLayer = new google.maps.TransitLayer();
  transitLayer.setMap(map);
  const bikeLayer = new google.maps.BicyclingLayer();
  bikeLayer.setMap(map);

  // make all markers on array
  setAllMarkers();

  // ui
  const popup = document.getElementById("popup-id");
  const button = document.getElementById("popup-button");
  const span = document.getElementById("close");

  button.onclick = function () {
    popup.style.display = "block";
    listener = map.addListener("click", (event) => {
      button2.style.visibility = "visible";
      pressedLocation = event.latLng;
      if (placeholderMarker !== undefined) placeholderMarker.setMap(null);
      placeholderMarker = new google.maps.Marker({
        position: event.latLng,
        map: map,
      });
    });
  };

  span.onclick = function () {
    popup.style.display = "none";
    if (placeholderMarker !== undefined) placeholderMarker.setMap(null);
    placeholderMarker = undefined;
    button2.style.visibility = "hidden";
    google.maps.event.removeListener(listener);
  };

  window.onclick = function (event) {
    if (event.target == popup) {
      popup.style.display = "none";
      if (placeholderMarker !== undefined) placeholderMarker.setMap(null);
      placeholderMarker = undefined;
      button2.style.visibility = "hidden";
      google.maps.event.removeListener(listener);
    }
  };

  const popup2 = document.getElementById("popup2-id");
  const button2 = document.getElementById("popup2-button");
  const span2 = document.getElementById("close2");
  const done = document.getElementById("done-button");

  button2.style.visibility = "hidden";

  button2.onclick = function () {
    popup2.style.display = "block";
    popup.style.display = "none";
    if (placeholderMarker !== undefined) placeholderMarker.setMap(null);
    placeholderMarker = undefined;
    button2.style.visibility = "hidden";
  };

  done.onclick = (event) => {
    event.preventDefault();
    let type;
    const radios = document.querySelectorAll(".resource");
    for (const radio of radios) {
      if (radio.checked) {
        type = radio.value;
        break;
      }
    }
    console.log(type);
    popup2.style.display = "none";
    newMarker(pressedLocation, type);
    if (placeholderMarker !== undefined) placeholderMarker.setMap(null);
    placeholderMarker = undefined;
    google.maps.event.removeListener(listener);
  };

  span2.onclick = function () {
    popup2.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == popup2) {
      popup2.style.display = "none";
    }
  };
}

function setAllMarkers() {
  markers.forEach((elem) => {
    let icon = setIcon(elem.type);
    // create marker object
    if (icon === null) {
      const marker = new google.maps.Marker({
        position: elem.position,
        map: map,
        title: "Current Location",
      });
      marker.addListener("click", () => {
        const infoWindow = new google.maps.InfoWindow({
          content: "Current Location",
        });
        infoWindow.open(map, marker);
      });
    } else {
      const marker = new google.maps.Marker({
        position: elem.position,
        map: map,
        icon: icon,
      });
    }
  });
}

function newMarker(position, type) {
  markers.push({ position, type });
  const icon = setIcon(type);
  const marker = new google.maps.Marker({
    position: position,
    map: map,
    icon: icon,
  });
  bake_cookie(markers);
}

// function to select which icon to use
function setIcon(type) {
  let iconPth;
  // create marker object
  switch (type) {
    case "bathrooms":
      iconPth = "img/bathrooms.png";
      break;
    case "water":
      iconPth = "img/water.png";
      break;
    case "kitchens":
      iconPth = "img/kitchens.png";
      break;
    case "shelters":
      iconPth = "img/shelters.png";
      break;
    case "donation":
      iconPth = "img/donation.png";
      break;
    case "test":
      iconPth = "img/test.png";
      break;
    case "mask":
      iconPth = "img/mask.png";
      break;
    default:
      iconPth = null;
      break;
  }
  return iconPth;
}
