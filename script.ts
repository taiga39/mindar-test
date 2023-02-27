import * as THREE from "three";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

let mindarThree;
let renderAnimationId = null;
const container = document.getElementById("container");

mindarThree = new MindARThree({
  container: container,
  // mindマーカーのパス
  imageTargetSrc: "./marker.mind",
});

const { renderer, scene, camera } = mindarThree;
const anchor = mindarThree.addAnchor(0);
// マーカー起点に表示させるオブジェクトの用意
const geometry = new THREE.PlaneGeometry(1.5, 1.5);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  transparent: true,
  opacity: 0.5,
});
const plane = new THREE.Mesh(geometry, material);
// マーカー位置を追従するanchor.groupにオブジェクトを入れる
anchor.group.add(plane);

const update = () => {
  renderer.render(scene, camera);
  renderAnimationId = requestAnimationFrame(update);
};

const start = async () => {
  await mindarThree.start();
  update();
};

// スタートボタン・ストップボタンで認識＆描画を操作するための処理
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
startButton.addEventListener("click", () => {
  start();
});
stopButton.addEventListener("click", () => {
  mindarThree.stop();
  cancelAnimationFrame(renderAnimationId);
});
