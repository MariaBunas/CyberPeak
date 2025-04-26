const map = L.map('map').setView([45.9432, 24.9668], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let markers = [];

// 📌 Adăugare manuală a markerului pe hartă când utilizatorul face click
map.on('click', function (e) {
    alert("Adding new location");
    const marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    markers.push(marker);

    // **Trimitem locația la backend pentru a fi salvată**
    let newLocation = `Manual,medium,${e.latlng.lat},${e.latlng.lng}`;
    sendLocationToServer(newLocation);
});

function testMeAlert(){
    alert("test me!");
}

// 📌 Funcție de trimitere către backend
function sendLocationToServer(locationData) {
    fetch('/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: locationData })
    })
    .then(response => response.text())
    .then(data => console.log("Locație salvată:", data))
    .catch(error => console.error("Eroare la trimiterea locației:", error));
}

document.addEventListener("DOMContentLoaded", function () {
    // Your JavaScript code here
    alert("test me!");
});

/*
// 📌 Capturarea locației GPS a utilizatorului
document.getElementById("report-hole").addEventListener("click", function() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            let severity = "medium"; // Poate fi modificată
            let name = `GPS Location ${Math.floor(Math.random() * 100)}`;

            // 📍 Adăugăm markerul pe hartă
            const marker = L.marker([lat, lng], { icon: icons[severity] })
                .addTo(map)
                .bindPopup(`<strong>${name}</strong><br>Gravitate: ${severity}`);

            // **Trimitem locația la backend**
            sendLocationToServer(`${name},${severity},${lat},${lng}`);
        });
    } else {
        alert("Geolocația nu este disponibilă.");
    }
});
*/

// 📌 Funcție pentru ștergerea markerelor
function clearMarkers() {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
}
  

