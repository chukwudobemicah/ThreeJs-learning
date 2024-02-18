import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");
const moveElBtn = document.querySelector("button.move-el");
const cameraViewBtn = document.querySelector("button.camera-view");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
// renderer.render(scene, camera);

// let time = Date.now();
const clock = new THREE.Clock();
const tl = gsap.timeline();
tl.to(mesh.position, { x: 2, delay: 1 });
tl.to(mesh.position, { x: 0 });

let cameraAnim = true;
moveElBtn.addEventListener("click", () => (cameraAnim = false));
cameraViewBtn.addEventListener("click", () => (cameraAnim = true));

const tick = () => {
  renderer.render(scene, camera);
  const elapsedTime = clock.getElapsedTime();
  //   const curTime = Date.now();
  //   const deltaTime = curTime - time;
  //   time = curTime;
  //   mesh.position.x += 0.01;
  //   mesh.rotation.y += 0.001 * deltaTime;
  // mesh.rotation.y = elapsedTime * Math.PI * 2;
  // mesh.position.y = Math.sin(elapsedTime);
  // mesh.position.x = Math.cos(elapsedTime);
  // camera.position.y = elapsedTime;
  // camera.position.x = elapsedTime;
  if (cameraAnim) {
    camera.position.y = Math.sin(elapsedTime);
    camera.position.x = Math.cos(elapsedTime);
    camera.lookAt(mesh.position);
  } else {
    // mesh.rotation.y = elapsedTime * Math.PI * 2;
    mesh.position.y = Math.sin(elapsedTime);
    // mesh.position.x = Math.cos(elapsedTime);
  }
  console.log(elapsedTime);
  window.requestAnimationFrame(tick);
};
tick();
