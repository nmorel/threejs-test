import "./index.css";
import {
  BoxGeometry,
  CubeTextureLoader,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  WebGLRenderer,
} from "three";
import Stats from 'three/examples/jsm/libs/stats.module'

const stats = new Stats()
document.body.appendChild(stats.dom)

const scene = new Scene();
const camera = new PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.00001,
  100000
);
camera.position.z = 1000;

const renderer = new WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const objects: Mesh[] = []
for (let i = 0; i < 10; i++) {
  const randomColor = Math.floor(Math.random() * 16777215);
  const randomX = Math.floor((Math.random() - 0.5) * 1000)
  const randomY = Math.floor((Math.random() - 0.5) * 1000)
  const plane = new Mesh(
    new PlaneGeometry(160, 72),
    new MeshBasicMaterial({ color: randomColor })
  );
  plane.position.set(randomX, randomY, 99.9999 + i / 1000000);
  objects.push(plane)
}

objects.forEach(obj => scene.add(obj))

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  stats.update()
  objects.forEach(obj => {
      obj.position.x += Math.random() < 0.5 ? -1 : 1
      obj.position.y += Math.random() < 0.5 ? -1 : 1
  })
}
animate();
