let map;

function initMap() {
  let centerIndonesia = {
    lat: 3.597031,
    lng: 98.678513,
  };
  map = new google.maps.Map(document.getElementById("map"), {
    center: centerIndonesia,
    zoom: 16,
  });
  
  createMarker();
}

const createMarker = () => {
    var marker = new google.maps.Marker({
        position: {
          lat: 3.597031,
          lng: 98.678513,
        },
        map: map,
    });
}
