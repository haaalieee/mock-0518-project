import * as THREE from "three";
// import React, { useMemo } from "react";
// import { useThree } from '@react-three/fiber'

const CameraAnimation = (zoom, focus, state, controls) => {
  const pos = new THREE.Vector3();
  const look = new THREE.Vector3();

  zoom ? pos.set(focus.x, focus.y, focus.z + (-5)) : pos.set(-27, 27, 4);
  zoom ? look.set(focus.x, focus.y, focus.z) : look.set(0, 0, 4);

  state.camera.position.lerp(pos, 0.8);
  state.camera.updateProjectionMatrix();

  console.log("pos" + pos.x, pos.y, pos.z);

  controls.setLookAt(
    state.camera.position.x,
    state.camera.position.y,
    state.camera.position.z,
    look.x,
    look.y,
    look.z,
    true
  );
};

export default CameraAnimation;
