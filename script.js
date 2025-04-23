/*
document.addEventListener("DOMContentLoaded", function () {
    let video = document.getElementById("earthVideo");
    setTimeout(() => {
        video.style.transition = "opacity 2s";
        video.style.opacity = 0;
        setTimeout(() => {
            video.style.display = "none";
            document.getElementById("map").style.display = "block";
        }, 2000);
    }, 5000);
});
*/

/*const map = L.map('map').setView([45.9432, 24.9668], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let markers = [];
map.on('click', function (e) {
    const marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    markers.push(marker);
});

function clearMarkers() {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
}
*/
const map = L.map('map').setView([45.9432, 24.9668], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Definirea icon-urilor
const icons = {
    ok: L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    }),
    warning: L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    }),
    bad: L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    })
};

// URL-ul fișierului CSV
const csvUrl = 'https://raw.githubusercontent.com/popsaraizabela/CyberPeak-harta-interactiva/load-locations-from-csv/locations.csv';

fetch(csvUrl)
    .then(response => response.text())
    .then(csvText => {
        Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                const data = results.data;

                console.log("Locații citite:", data);  // ✅ Testează dacă CSV-ul este citit corect

                data.forEach(row => {
                    const lat = parseFloat(row.latitude);
                    const lng = parseFloat(row.longitude);
                    const name = row.name || 'Unnamed Location';
                    const severity = (row.severity || '').toLowerCase();
                    const icon = icons[severity] || icons['ok'];

                    if (!isNaN(lat) && !isNaN(lng)) {
                        L.marker([lat, lng], { icon }).addTo(map)
                            .bindPopup(`<strong>${name}</strong><br>Severity: ${severity}`);
                    } else {
                        console.warn("Locație ignorată (date invalide):", row);
                    }
                });
            }
        });
    })
    .catch(error => {
        console.error('Error fetching or parsing the CSV:', error);
    });

// ✅ Corectarea problemei cu legenda
const legend = L.control({ position: 'bottomright' });

legend.onAdd = function () {
    let div = L.DomUtil.create('div', 'info-legend');
    div.innerHTML = `
        <strong>Severity</strong><br>
        <div style="color: red;">🔴 Bad</div>
        <div style="color: yellow;">🟡 Pretty Bad</div>
        <div style="color: green;">🟢 OK</div>
    `;
    return div;
};

legend.addTo(map);
