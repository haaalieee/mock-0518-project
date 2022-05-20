import React, { useRef } from "react";

export default function CityBankCar(props) {
  const cityCar = useRef();

  return (
    <>
      <mesh ref={cityCar}>
        <group
          position={[2030.32, 553.72, 2509.66]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={100}
        >
          <mesh
            geometry={props.geometryMacchina003}
            material={props.materialsTexture004}
          />
        </group>
        <group
          position={[2062.88, 553.72, 2509.73]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={100}
        >
          <mesh
            geometry={props.geometryRuote003}
            material={props.materialsTexture004}
          />
        </group>
      </mesh>
    </>
  );
}
