import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;

// Three essential elements: Scene, Camera and Renderer
const scene = new THREE.Scene();

// Setting up camera
const fov = 75;
const aspect = w/h;
const near = 0.1; // Units to start rendering, units > 0.1 will not render
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// Set renderer to fit the browser's window size
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
// Append canvas to the window
document.body.appendChild(renderer.domElement);

// Mouse controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// Shapes - https://www.tutorialspoint.com/threejs/threejs_geometries.htm
const geo = new THREE.SphereGeometry(2, 3, 2);
const mat = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    flatShading: true, //Optional, shows facette
});
const mesh = new THREE.Mesh(geo, mat); // An object that takes the geometry and applies the material over it
scene.add(mesh);

// Wireframe material
const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true, // Shows the line on facette
});
const wireMesh = new THREE.Mesh(geo, wireMat);
mesh.add(wireMesh); // Append wireframe as child element of mesh

// Adding light
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000);
scene.add(hemiLight);

// Move the camera away as the camera and cube will be inside each other without it
camera.position.z = 3;

function animate(t = 0) {
    // console.log(t) //Demonstrate how time passes
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
};
animate();