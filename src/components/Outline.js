import React, { useRef, useEffect, useMemo, useState } from "react";
import { Vector2 } from "three";
import { useFrame, useThree } from "react-three-fiber";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";

export default function Outline() {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef();
  const [hovered, set] = useState([]);
  const aspect = useMemo(() => new Vector2(size.width, size.height), [size]);

  useEffect(() => composer.current.setSize(size.width, size.height), [size]);
  useFrame(() => composer.current.render(), 1);

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" args={[scene, camera]} />
      <outlinePass
        attachArray="passes"
        args={[aspect, scene, camera]}
        selectedObjects={hovered}
        visibleEdgeColor="white"
        edgeStrength={50}
        edgeThickness={2}
      />
      <shaderPass
        attachArray="passes"
        args={[FXAAShader]}
        uniforms-resolution-value={[1 / size.width, 1 / size.height]}
      />
    </effectComposer>
  );
}
