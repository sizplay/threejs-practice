import * as THREE from "three";

window.addEventListener("load", () => {
  init();
});

function init() {
  const renderer = new THREE.WebGLRenderer({
    antialias: true, // 부드럽게 렌더링
  });

  renderer.setSize(window.innerWidth, window.innerHeight); // renderer(canvas)의 화면 사이즈 설정
  document.body.appendChild(renderer.domElement); //rednerer(canvas)를 body에 추가

  const scene = new THREE.Scene(); // scene 생성
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500
  ); // camera 생성

  const geometry = new THREE.BoxGeometry(2, 2, 2); // geometry 생성
  const material = new THREE.MeshStandardMaterial({
    color: 0xcc99ff,
    // transparent: true,
    // opacity: 0.5,
    // visible: true
    // wireframe: true,
    // side: THREE.DoubleSide,
  }); // material 생성

  material.color.setHex(0xcc99fa); // material 색상 설정

  const cube = new THREE.Mesh(geometry, material); // mesh 생성
  scene.add(cube); // scene에 mesh 추가

  // camera.position.z = 5; // camera 위치 설정
  camera.position.set(3, 4, 5); // camera 위치 설정
  camera.lookAt(cube.position); // camera가 cube를 바라보도록 설정

  const directionalLight = new THREE.DirectionalLight(0xf0f0f0, 1); // directional light 생성
  directionalLight.position.set(-1, 2, 3); // directional light 위치 설정
  scene.add(directionalLight); // scene에 directional light 추가

  const ambientLight = new THREE.AmbientLight(0xf0f0f0, 0.5); // ambient light 생성
  ambientLight.position.set(-1, 2, 3); // ambient light 위치 설정
  scene.add(ambientLight); // scene에 ambient light 추가

  // renderer.render(scene, camera); // scene과 camera를 renderer에 렌더링
  render();

  function render() {
    requestAnimationFrame(render); // animation frame 생성

    cube.rotation.x += 0.01; // x축 회전
    // cube.rotation.y += 0.01; // y축 회전
    // cube.rotation.z += 0.01; // z축 회전

    // cube.rotation.x = THREE.MathUtils.degToRad(45); // x축 회전
    cube.position.y = Math.sin(cube.rotation.x);

    renderer.render(scene, camera); // scene과 camera를 renderer에 렌더링
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.render(scene, camera);
  }

  window.addEventListener("resize", handleResize);
}
