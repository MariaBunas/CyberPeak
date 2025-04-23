document.addEventListener("DOMContentLoaded", function () {
    let video = document.getElementById("earthVideo");
    let earthContainer = document.getElementById("earth-container");
    let mapContainer = document.getElementById("map-container");

    // După 4 secunde, începe încetinirea rotației
    setTimeout(() => {
        video.style.animation = "rotateEarth 4s linear forwards";
    }, 4000);

    // După 6 secunde, ascunde Pământul și afișează harta
    setTimeout(() => {
        earthContainer.style.opacity = 0;
        setTimeout(() => {
            earthContainer.style.display = "none";
            mapContainer.style.display = "block";
        }, 2000);
    }, 6000);
});
