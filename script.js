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

// 📌 Citim locațiile din CSV și adăugăm markerii pe hartă
// fetch('https://cyberpeak-server.onrender.com/file/locations.csv')
   fetch('https://raw.githubusercontent.com/mariabunas/CyberPeak/main/locations.csv')
    .then(response => response.text())
    .then(csvText => {
        Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                alert("load data table ..");

                results.data.forEach(row => {
                    const lat = parseFloat(row.latitude);
                    const lng = parseFloat(row.longitude);
                    const name = row.name || 'Unnamed Location';
                    const severity = (row.severity || '').toLowerCase();
                    const icon = icons[severity] || icons['ok']; 
                    // const imageUrl = `https://cyberpeak-server.onrender.com/${row.image}`;
                    // const imageUrl = `https://cyberpeak-server.onrender.com/uploads/${row.image}`;
                    const imageUrl = 'c';

                    alert("load data row ..");

                    if (!isNaN(lat) && !isNaN(lng)) {
                        const marker = L.marker([lat, lng], { icon : icon}).addTo(map)
                            .bindPopup(`
                                <strong>${name}</strong><br>
                                Severitate: ${severity} <br>
                                <img src="${imageUrl}" alt="Imagine locație" width="200px">
                            `);
                    }
                });
            }
        });
    })
    .catch(error => console.error("Eroare la citirea locațiilor:", error));

// 📌 Funcție pentru ștergerea markerelor
function clearMarkers() {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
}
  

