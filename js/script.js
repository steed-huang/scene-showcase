var scene, camera, renderer, house, curve;
var camPosIndex = 0;
var isMoving = false;
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
  var ambLight = new THREE.AmbientLight(0x404040, 0.3);
  scene.add(ambLight);

  var hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
  hemiLight.position.set(0, 300, 0);
  scene.add(hemiLight);

  var dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight.position.set(75, 300, -75);
  scene.add(dirLight);

  // Camera
  camera.position.set(0, 12, 15);
  camera.lookAt(new THREE.Vector3(0, -5, -5));
  logCam();

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  if (isMoving) {
    moveCamera();
  }
  renderer.render(scene, camera);
}

function windowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function moveCamera() {
  var camPos = curve.getPoint(camPosIndex / 100);
  var camRot = curve.getTangent(camPosIndex / 100);

  camera.position.x = camPos.x;
  camera.position.y = camPos.y;
  camera.position.z = camPos.z;

  camera.rotation.x = camRot.x;
  camera.rotation.y = camRot.y;
  camera.rotation.z = camRot.z;

  logCam();
  camPosIndex++;
  if (camPosIndex > 95) {
    isMoving = false;
    showInfo();
  }

  camera.lookAt(curve.getPoint((camPosIndex + 1) / 100));
}

function moveTo() {
  document.getElementById("infoButton").style.visibility = "hidden";
  camPosIndex = 0;
  changeCurve([
    new THREE.Vector3(0, 12, 15),
    new THREE.Vector3(0, 8.6, 11),
    new THREE.Vector3(1, 5.2, 6.5),
    new THREE.Vector3(0.6, 1.8, 2.5)
  ]);
  isMoving = true;
}

function moveBack() {}

function changeCurve(points) {
  curve = new THREE.CatmullRomCurve3(points);

  // draws curve
  /*
  let p = curve.getPoints(50);
  let geometry = new THREE.BufferGeometry().setFromPoints(p);
  let material = new THREE.LineBasicMaterial({ color: 0xff0000 });
  let curveObject = new THREE.Line(geometry, material);
  scene.add(curveObject);
  */
}

function showInfo() {
  let popup = document.createElement("div");
  let popTitle = document.createElement("h1");
  popup.setAttribute("id", "infoPopup");
  popTitle.setAttribute("id", "infoTitle");
  popTitle.innerHTML = "Mailbox";
  popup.appendChild(popTitle);
  document.body.appendChild(popup);
  popup.innerHTML +=
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit, velit ac vulputate cursus, libero ex vulputate turpis, sit amet condimentum ante tellus nec mi. Vestibulum rhoncus ligula justo, ac gravida magna pretium ut. Curabitur facilisis diam nisi, id laoreet justo congue porta. Aenean iaculis neque vitae bibendum congue. Mauris placerat erat nunc, at tempus ante egestas vitae. Donec feugiat nunc sit amet est elementum pellentesque. Mauris nec condimentum orci. Curabitur feugiat neque et justo tempus interdum. Nulla posuere euismod lorem vitae interdum. Mauris at auctor diam. In at varius nulla. Donec metus lectus, dignissim vitae odio et, congue gravida est. Ut luctus lorem quis orci scelerisque, sed vehicula augue ullamcorper.";
}

function logCam() {
  console.log("pos: x:", camera.position.x, " y:", camera.position.y, " z:", camera.position.z);
  console.log("rot: x:", camera.rotation.x, " y:", camera.rotation.y, " z:", camera.rotation.z);
}

window.onload = init;
window.addEventListener("resize", windowResize, false);
