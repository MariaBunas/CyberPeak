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

let markers = [];
map.on('click', function (e) {
    const marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    markers.push(marker);
});

function clearMarkers() {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
}
