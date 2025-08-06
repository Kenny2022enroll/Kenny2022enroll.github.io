const container = document.getElementById('three-bg');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha:true });
renderer.setSize(innerWidth, innerHeight);
container.appendChild(renderer.domElement);

// 1000 个随机粒子
const geometry = new THREE.BufferGeometry();
const positions = [];
for (let i = 0; i < 3000; i++) {
  positions.push(
    (Math.random() - 0.5) * 2000,
    (Math.random() - 0.5) * 2000,
    (Math.random() - 0.5) * 2000
  );
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
const material = new THREE.PointsMaterial({ color: 0xffffff, size: 1.2 });
const stars = new THREE.Points(geometry, material);
scene.add(stars);

camera.position.z = 1;

// 鼠标视差
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / innerWidth) * 2 - 1;
  const y = -(e.clientY / innerHeight) * 2 + 1;
  gsap.to(stars.rotation, { x: y * 0.1, y: x * 0.1, duration: 1 });
});

function animate() {
  requestAnimationFrame(animate);
  stars.rotation.x += 0.0003;
  stars.rotation.y += 0.0005;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
