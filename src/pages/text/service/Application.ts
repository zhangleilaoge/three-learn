import * as THREE from "three";
import { RESOURCES, ResourceNameEnum } from "../constants/resource";
import { Loader } from "../../../utils/Loader";
import Timer from "../../../utils/Timer";
import s from "../style.m.scss";
import { EventNameEnum } from "../../../types/file";

export class Application {
  timer: Timer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  loader: Loader;

  constructor() {
    this.timer = new Timer();

    this.setCamera();
    this.setScene();
    this.setRenderer();
    this.setLoader();
    this.setWorld();
  }

  setCamera() {
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 50, 50);
    camera.lookAt(0, 0, 0);

    this.camera = camera;
  }

  setScene() {
    const scene = new THREE.Scene();

    this.scene = scene;
  }

  setRenderer() {
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementsByClassName(s["jsCanvas"])[0],
      alpha: true,
    });
    renderer.setClearColor(0x000000, 1);
    renderer.setPixelRatio(2);
    renderer.setSize(window.innerWidth, window.innerHeight);

    this.renderer = renderer;
  }

  setLoader() {
    const loader = new Loader();
    loader.load(RESOURCES);

    this.loader = loader;
  }

  setWorld() {
    setTimeout(() => {
      const labelGeometry = new THREE.PlaneGeometry(30, 7.5, 1, 1);
      const labelTexture = new THREE.Texture(
        this.loader.resource[ResourceNameEnum.ContactTwitterLabelTexture],
      );
      labelTexture.needsUpdate = true;
      const labelMesh = new THREE.Mesh(
        labelGeometry,
        new THREE.MeshBasicMaterial({
          wireframe: false,
          color: 0xffffff,
          alphaMap: labelTexture,
          depthTest: true,
          depthWrite: false,
          transparent: true,
        }),
      );
      this.scene.add(labelMesh);
      this.renderer.render(this.scene, this.camera);
    }, 1000);
  }

  start() {}

  stop() {}
}

export default Application;
