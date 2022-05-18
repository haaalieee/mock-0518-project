import React, { useRef, useEffect } from "react";
import MapBubble from "./MapBubble";
import { a } from "@react-spring/three";
import { useCity } from "../context/CityContext";
import { useCityUpdate } from "../context/CityContext";
import { useSpring } from "@react-spring/core";

export default function CityBank(props) {
  const bubbleBank = useRef();
  const cityBank = useRef();

  // Context state provider
  const { hoverCity } = useCity();
  const { toggleHoverCity } = useCityUpdate();

  console.log("CityBank")

  // Default spring animation properties
  const [{ z }] = useSpring(
    {
      z: Number(hoverCity),
      config: { mass: 1, tension: 120, friction: 14, precision: 0.002 },
    },
    [hoverCity]
  );

  useEffect(() => {
    void (document.body.style.cursor = hoverCity ? "pointer" : "auto");
  }, [hoverCity]);

  // Interpolations
  const floatPosZ = z.to([0, 1], [0, 2]);

  return (
    <a.group
      ref={cityBank}
      onPointerOver={() => toggleHoverCity(true)}
      onPointerOut={() => toggleHoverCity(false)}
      // onClick={(e) => {
      //   e.stopPropagation();
      //   toggleClickedCity();
      //   setObjectPosition(
      //     group.current.position.x,
      //     group.current.position.y,
      //     group.current.position.z
      //   ); // x: 20, y: 4, z: 8
      // }}
      position-z={floatPosZ}
    >
      <MapBubble
        text="City Bank"
        ref={bubbleBank}
        position={[0, 0, 14]}
        rotation={[Math.PI / 2, Math.PI, 0]}
      />
      <group position={[2.05, 1.09, 2.95]}>
        <mesh
          geometry={props.geometryColonna0}
          material={props.materialsTexture}
        />
      </group>
      <group position={[-1.9, 1.09, 2.9]}>
        <mesh
          geometry={props.geometryColonna001}
          material={props.materialsTexture}
        />
      </group>
      <group position={[4.53, 1.09, 2.95]}>
        <mesh
          geometry={props.geometryColonna002}
          material={props.materialsTexture}
        />
      </group>
      <group position={[-4.67, 1.09, 2.95]}>
        <mesh
          geometry={props.geometryColonna003}
          material={props.materialsTexture}
        />
      </group>
      <group position={[0.09, -3.63, 2.95]}>
        <mesh
          geometry={props.geometryVetriFinestre001}
          material={props.materialsVetri001}
        />
      </group>
      <group position={[0.09, -3.63, 2.95]}>
        <mesh
          geometry={props.geometryVetriPorta001}
          material={props.materialsVetri001}
        />
      </group>
      <group position={[-0.02, 0.53, 6.38]}>
        <mesh
          geometry={props.geometryCube048}
          material={props.materialsTexture}
        />
      </group>
      <group position={[2.09, 1.81, 6.54]}>
        <mesh
          geometry={props.geometryText002}
          material={props.materialsTexture}
        />
      </group>
      <group position={[0.51, -0.74, 9.73]}>
        <mesh
          geometry={props.geometryText001}
          material={props.materialsTexture}
        />
      </group>
      <group position={[5.72, 1.73, 1.85]}>
        <mesh
          geometry={props.geometryCespugli006Foglie003}
          material={props.materialsFoglie003}
        />
      </group>
      <group position={[5.71, 1.75, 1.34]}>
        <mesh
          geometry={props.geometryPiante006Vasi003}
          material={props.materialsVasi003}
        />
        <mesh
          geometry={props.geometryPiante006Terra003}
          material={props.materialsTerra003}
        />
      </group>
      <group position={[-5.53, 1.73, 1.85]}>
        <mesh
          geometry={props.geometryCespugli005Foglie003}
          material={props.materialsFoglie003}
        />
      </group>
      <group position={[-5.54, 1.75, 1.34]}>
        <mesh
          geometry={props.geometryPiante005Vasi003}
          material={props.materialsVasi003}
        />
        <mesh
          geometry={props.geometryPiante005Terra003}
          material={props.materialsTerra003}
        />
      </group>
      <group position={[0.09, -3.63, 3]}>
        <mesh
          geometry={props.geometryGradini}
          material={props.materialsTexture}
        />
      </group>
      <group position={[0.09, -3.63, 3]}>
        <mesh
          geometry={props.geometrySerramenti}
          material={props.materialsTexture}
        />
      </group>
      <group position={[0.09, -3.63, 3]}>
        <mesh
          geometry={props.geometryStruttura}
          material={props.materialsTexture}
        />
      </group>
      <group position={[-0.18, 0.77, 6.41]}>
        <mesh
          geometry={props.geometryTettioia}
          material={props.materialsTexture}
        />
      </group>
      <group position={[0.09, -3.63, 3]}>
        <mesh
          geometry={props.geometryTettu}
          material={props.materialsTexture}
        />
      </group>
    </a.group>
  );
}
