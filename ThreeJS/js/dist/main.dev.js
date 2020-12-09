"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var THREE = _interopRequireWildcard(require("../node_modules/three/src/Three.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Créate à 3D cube using Three.js
 */

/**
 * init() is just a matter of resizing the cube when resizing 
 * the window
 */
var scene, camera, renderer, cube;
var container = document.getElementById("cube3d");

function init() {
  renderer = new THREE.WebGLRenderer({
    // antialias lisse les bords...
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(5, 0, 0);
  camera.lookAt(0, 0, 0);
  scene = new THREE.Scene(); // the cube is a geometry + material using the texture

  var geometry = new THREE.BoxGeometry(2, 2, 2);
  var texture = new THREE.TextureLoader().load('./textures/bleu_noir.png');
  var material = new THREE.MeshBasicMaterial({
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