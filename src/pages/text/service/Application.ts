import * as THREE from "three";
import { RESOURCES, ResourceNameEnum } from "../constants/resource";
import Loader from "../../../utils/loaders/Loader";
import Timer from "../../../utils/Timer";
import s from "../style.m.scss";
import { SizeEventEnum, TimeEventEnum } from "../../../constants/event";
import Sizer from "../../../utils/Sizer";

export class Application {
  timer: Timer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  loader: Loader;
  sizer: Sizer;

  constructor() {
    this.timer = new Timer();
    this.loader = new Loader();
    this.sizer = new Sizer();

    this.setCamera();
    this.setScene();
    this.setRenderer();

    this.loader.load(RESOURCES);
    this.timer.tick();
  }

  setCamera() {
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 50, 50);
    camera.lookAt(0, 0, 0);

    this.sizer.on(SizeEventEnum.Resize, ({ width, height }) => {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });

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

    this.sizer.on(SizeEventEnum.Resize, ({ width, height }) => {
      renderer.setSize(width, height);
    });

    this.renderer = renderer;
  }

  render() {
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
  }

  start() {
    this.timer.on(TimeEventEnum.Tick, () => {
      this.loader.toLoad === 0 && this.render();
    });
  }

  stop() {}
}

export default Application;
