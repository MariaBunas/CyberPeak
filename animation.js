document.addEventListener("DOMContentLoaded", function () {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("earth-container").appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('https://upload.wikimedia.org/wikipedia/commons/6/66/Earth_texture_map.jpg');
    const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
    const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    camera.position.z = 5;

    let scale = 1;
    function animate() {
        requestAnimationFrame(animate);
        earth.rotation.y += 0.01;

        if (scale < 10) {
            scale += 0.05;
            earth.scale.set(scale, scale, scale);
        }

        if (scale >= 10) {
            document.getElementById("earth-container").style.opacity = 0;
            setTimeout(() => {
                document.getElementById("earth-container").style.display = "none";
                document.getElementById("map-container").style.display = "block";
            }, 2000);
        }

        renderer.render(scene, camera);
    }
    
    animate();
});
