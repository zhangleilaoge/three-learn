import * as THREE from "three";

let ticker;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer;

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

camera.position.z = 5;

export const animate = () => {
  ticker = requestAnimationFrame(animate);

  if (!renderer) {
    renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector(".js-canvas"),
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

export const stop = () => {
  cancelAnimationFrame(ticker);
};
