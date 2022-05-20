import React, { forwardRef } from "react";

const Reference = forwardRef((props, ref) => {
  return (
    <mesh ref={ref} position={props.position} scale={props.scale} {...props}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
});

export default Reference;
