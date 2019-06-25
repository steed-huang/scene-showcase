var scene, camera, renderer, house;
var drawWidth = window.innerWidth;
var drawHeight = window.innerHeight;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, drawWidth / drawHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(drawWidth, drawHeight);
  document.body.appendChild(renderer.domElement);

  // Models
  var loader = new THREE.GLTFLoader();
  loader.load(
    "https://cdn.glitch.com/b5469c85-7f52-4fd5-a648-8d70ac85ec20%2Fhouse.glb?v=1561498777570",
    function(gltf) {
      house = gltf.scene;
      scene.add(house);
    }
  );

  // Lighting
  var ambLight = new THREE.AmbientLight(0x404040, 1); // soft white light
  scene.add(ambLight);

  var hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
  hemiLight.position.set(0, 300, 0);
  scene.add(hemiLight);

  var dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight.position.set(75, 300, -75);
  scene.add(dirLight);

  // Camera
  camera.position.set(0, 10, -20);
  camera.lookAt(new THREE.Vector3(0, 3, 0));

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

window.onload = init;
