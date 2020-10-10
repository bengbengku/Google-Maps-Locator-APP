var map;
var infoWindow;

function initMap() {
  let centerIndonesia = {
    lat: 3.597031,
    lng: 98.678513,
  };
  map = new google.maps.Map(document.getElementById("map"), {
    center: centerIndonesia,
    zoom: 14,
  });
  infoWindow = new google.maps.InfoWindow();
  getStores();
}

const getStores = () => {
    const API_URL = 'http://localhost:3000/api/stores';
    fetch(API_URL)
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    }).then((data) => {
      searchLocationsNear(data);
    })
}

const searchLocationsNear = (stores) => {
  let bounds = new google.maps.LatLngBounds();

  stores.forEach((store, index) => {
    let latlng = new google.maps.LatLng(
      store.location.coordinates[1],
      store.location.coordinates[0]
    );
    let name = store.storeName;
    let address = store.addressLines[0];
    bounds.extend(latlng);
    createMarker(latlng, name, address, index+1);
  });
  map.fitBounds(bounds);
}

const createMarker = (latlng, name, address, storeNumber) => {
    let html="<b>" + name + "</b> <br/>" + address;

    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        label: `${storeNumber}`
    });

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
}


