import "./index.css";
import {
  BoxGeometry,
  Color,
  CubeTextureLoader,
  InstancedBufferGeometry,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Quaternion,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
} from "three";
import Stats from "three/examples/jsm/libs/stats.module";

// @ts-ignore
const stats = new Stats();
document.body.appendChild(stats.dom);

const scene = new Scene();
const camera = new PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.00001,
  100_000
);
camera.position.z = 1000;

const renderer = new WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let instanceCount = 30_000;
let mesh = new InstancedMesh(
  new PlaneGeometry(1, 1),
  new MeshBasicMaterial(),
  instanceCount
);

const objects: Array<{
  index: number;
  color: Color;
  matrix: Matrix4;
}> = [];

for (let i = 0; i < instanceCount; i++) {
  const color = new Color(Math.floor(Math.random() * 16_777_215));
  const matrix = new Matrix4();
  matrix.compose(
    new Vector3(
      Math.floor((Math.random() - 0.5) * 10_000),
      Math.floor((Math.random() - 0.5) * 10_000),
      99.9999 + i / 1_000_000
    ),
    new Quaternion(),
    new Vector3(160, 70, 1)
  );
  objects.push({ index: i, color, matrix });
  mesh.setColorAt(i, color);
  mesh.setMatrixAt(i, matrix);
}

scene.add(mesh);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  stats.update();
  objects.forEach((obj) => {
    const vector = new Vector3().setFromMatrixPosition(obj.matrix);
    vector.x += Math.random() < 0.5 ? -1 : 1;
    vector.y += Math.random() < 0.5 ? -1 : 1;
    obj.matrix.setPosition(vector);
    mesh.setMatrixAt(obj.index, obj.matrix);
  });
  mesh.instanceMatrix.needsUpdate = true;
}
animate();
