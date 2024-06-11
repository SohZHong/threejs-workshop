import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

var canvas = document.getElementById("myCanvas");

const w = window.innerWidth;
const h = window.innerHeight;

const scene = new THREE.Scene();

// Camera
const fov = 75;
const aspect = w/h;
const near = 0.1;
const far = 10;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: canvas });
renderer.setSize(500, 500);
// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.01;

const geo = new THREE.BoxGeometry(2, 2, 2);
const texture = new THREE.TextureLoader().load('./cat.jpg');
const mat = new THREE.MeshStandardMaterial({
    map: texture
})
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

// 
const newGeo = new THREE.IcosahedronGeometry(2.0, 5);
const newMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true
})
const newMesh = new THREE.Mesh(newGeo, newMat);
mesh.add(newMesh);

// light
const hemiSphere = new THREE.HemisphereLight(0x89CFF0, 0xff0000, 5);
scene.add(hemiSphere);

camera.position.z = 3;

function animate(t=0){
    requestAnimationFrame(animate);
    mesh.rotation.x = t/1000;
    mesh.rotation.y = t/1000;
    controls.update();
    renderer.render(scene, camera);
};

animate();

