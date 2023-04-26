// Create the map object
var map = L.map('map').setView([51.505, -0.09], 13);

// Add the OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);
// Add a marker for the user's current location
var marker = L.marker([0, 0]).addTo(map);

// Update the marker position periodically
function updateMarkerPosition() {
  navigator.geolocation.getCurrentPosition(function(position) {
    marker.setLatLng([position.coords.latitude, position.coords.longitude]);
  });
}

setInterval(updateMarkerPosition, 1000);
// Add a marker for the vehicle's current location
var vehicleMarker = L.marker([0, 0]).addTo(map);

// Update the vehicle marker position periodically
function updateVehiclePosition() {
  // Fetch the vehicle position from the backend API
  $.ajax({
    url: '/api/vehicle/position',
    success: function(data) {
      vehicleMarker.setLatLng([data.lat, data.lng]);
    }
  });
}

setInterval(updateVehiclePosition, 1000);
