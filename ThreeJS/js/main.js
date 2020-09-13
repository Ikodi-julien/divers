import * as THREE from 'three';

let scene, camera, renderer, cube;

/**
 * Créate à 3D cube using Three.js
 */

/**
 * init() is just a matter of resizing the cube when resizing 
 * the window
 */

function init() {
  renderer = new THREE.WebGLRenderer({
    // antialias lisse les bords...
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(5, 0, 0);
  camera.lookAt(0, 0, 0);

  scene = new THREE.Scene();

  // the cube is a geometry + material using the texture
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const texture = new THREE.TextureLoader().load('./textures/bleu_noir.png');
  const material = new THREE.MeshBasicMaterial({
    map: texture
  });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
}

/**
 * animate() is what gives life to the cube
 */
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;
  renderer.render(scene, camera);
}

/**
 * the callback for event listener on window resize.
 */
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);
init();
animate();