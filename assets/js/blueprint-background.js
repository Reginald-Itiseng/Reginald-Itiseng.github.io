import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const background = document.querySelector(".blueprint-bg");
const canvas = document.querySelector(".blueprint-bg__canvas");

if (background && canvas) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });

  const modelRoot = new THREE.Group();
  const loader = new GLTFLoader();
  const clock = new THREE.Clock();

  const cameraDistance = 6.4;
  const viewportFill = 12;
  const outsideViewRatio = 0.3;
  const minSmallScreenAnchor = -0.08;
  const maxRightAnchor = 0.42;

  let frameId = 0;
  let fittedModel = null;
  let baseModelX = 0;

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  scene.add(modelRoot);

  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect();
    renderer.setSize(width, height, false);
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();

    if (fittedModel) {
      fitModelToView(fittedModel);
    }
  };

  const fitModelToView = (object) => {
    object.scale.setScalar(1);
    object.rotation.set(-0.18, -0.56, 0.08);
    object.position.set(0, 0, 0);

    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const modelHeight = Math.max(size.y, 1);
    const modelWidth = Math.max(size.x, 1);
    const viewHeight = 2 * cameraDistance * Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5));
    const viewWidth = viewHeight * camera.aspect;
    const scale = (viewHeight * viewportFill) / modelHeight;
    const scaledWidth = modelWidth * scale;

    object.scale.setScalar(scale);

    const desiredX = (viewWidth * 0.5) - (scaledWidth * (0.5 - outsideViewRatio));
    const minX = viewWidth * minSmallScreenAnchor;
    const maxX = viewWidth * maxRightAnchor;

    baseModelX = THREE.MathUtils.clamp(desiredX, minX, maxX);
    modelRoot.position.set(baseModelX, 0, 0);

    camera.position.set(0.1, 0.05, cameraDistance);
    camera.lookAt(0, 0, 0);
  };

  const convertToWireframe = (object) => {
    const wireGroup = new THREE.Group();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x78d7e8,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
    });

    object.updateMatrixWorld(true);

    object.traverse((node) => {
      if (!node.isMesh || !node.geometry) return;

      const edges = new THREE.EdgesGeometry(node.geometry, 18);
      const lines = new THREE.LineSegments(edges, lineMaterial.clone());

      node.updateWorldMatrix(true, false);
      lines.applyMatrix4(node.matrixWorld);
      wireGroup.add(lines);
    });

    return wireGroup;
  };

  const animate = () => {
    const elapsed = clock.getElapsedTime();

    if (!prefersReducedMotion.matches) {
      modelRoot.position.set(baseModelX, Math.sin(elapsed * 0.18) * 0.08, 0);

      if (fittedModel) {
        fittedModel.rotation.set(
          -0.18 + Math.sin(elapsed * 0.22) * 0.035,
          -0.56 + elapsed * 0.08,
          0.08
        );
      }
    }

    renderer.render(scene, camera);
    frameId = window.requestAnimationFrame(animate);
  };

  resize();
  window.addEventListener("resize", resize, { passive: true });

  loader.load(
    background.dataset.modelSrc,
    (gltf) => {
      const wireModel = convertToWireframe(gltf.scene);
      const centeredModel = new THREE.Group();
      const center = new THREE.Box3().setFromObject(wireModel).getCenter(new THREE.Vector3());

      wireModel.position.sub(center);
      centeredModel.add(wireModel);
      fittedModel = centeredModel;
      fitModelToView(centeredModel);
      modelRoot.add(centeredModel);
      background.classList.add("blueprint-bg--ready");
      animate();
    },
    undefined,
    () => {
      background.classList.add("blueprint-bg--failed");
      renderer.dispose();
      window.cancelAnimationFrame(frameId);
    }
  );
}
