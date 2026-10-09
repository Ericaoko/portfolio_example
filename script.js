// Initialize Three.js Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Create glowing torus knot
const geometry = new THREE.TorusKnotGeometry(0.5, 0.2, 100, 16);
const material = new THREE.MeshPhongMaterial({
  color: 0x8a2be2,
  emissive: 0x8a2be2,
  emissiveIntensity: 0.5,
  shininess: 100,
  transparent: true,
  opacity: 0.8
});

const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Add ambient and point light
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x8a2be2, 1.5, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Position camera
camera.position.z = 5;

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

// Smooth scroll for navigation
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: 'smooth'
    });
  });
});