import * as THREE from "three";
import { gsap } from "gsap";
// import React, { useMemo } from "react";
// import { useThree } from '@react-three/fiber'

const CameraAnimation = (zoom, focus, state, controls, onComplete) => {
  // const pos = new THREE.Vector3();
  // const look = new THREE.Vector3();

  const cameraLookAt = new THREE.Vector3(0, 0, 0);
  const _tmp = new THREE.Vector3();

  // zoom ? pos.set(focus.x, focus.y, focus.z + (-5)) : pos.set(-27, 27, 4);
  // zoom ? look.set(focus.x, focus.y, focus.z) : look.set(0, 0, 4);

  // state.camera.position.lerp(pos, 0.8);
  // state.camera.updateProjectionMatrix();

  // console.log("pos" + pos.x, pos.y, pos.z);

  // controls.setLookAt(
  //   state.camera.position.x,
  //   state.camera.position.y,
  //   state.camera.position.z,
  //   look.x,
  //   look.y,
  //   look.z,
  //   true
  // );

  const moveToStartPoint = () => {
    cameraPositionCurve.getPoint(0, _tmp);
    controls.setLookAt(_tmp.x, _tmp.y, _tmp.z, 0, 0, 4, true);
  };

  const cameraPositionCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-27, 27, 4),
    new THREE.Vector3(-30, 30, 29),
    new THREE.Vector3(focus.x + 30, focus.y, -2),
  ]);

  const cameraLookAtCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 4),
    new THREE.Vector3(0, 6, -9),
    new THREE.Vector3(50, 0, 12),
  ]);

  const animationProgress = { value: 0 };
  const pathAnimation = gsap.fromTo(
    animationProgress,
    {
      value: 0,
    },
    {
      value: 1,
      duration: 3,
      paused: true,
      onUpdateParams: [animationProgress],
      onUpdate({ value }) {
        cameraPositionCurve.getPoint(value, state.camera.position);
        cameraLookAtCurve.getPoint(value, cameraLookAt);

        // state.camera.lookAt(cameraLookAt);

        // curve.getPoint(value, _tmp);
        // const cameraX = _tmp.x;
        // const cameraY = _tmp.y;
        // const cameraZ = _tmp.z;
        // const lookAtX = 0;
        // const lookAtY = 0;
        // const lookAtZ = 0;

        controls.setLookAt(
          state.camera.position.x,
          state.camera.position.y,
          state.camera.position.z,
          cameraLookAt.x,
          cameraLookAt.y,
          cameraLookAt.z,
          true
        );
      },
      onStart() {
        controls.enabled = false;
      },
      onComplete() {
        controls.enabled = true;
        onComplete();
      },
    }
  );

  zoom ? pathAnimation.play(0) : moveToStartPoint();
  state.camera.updateProjectionMatrix();
};

export default CameraAnimation;
