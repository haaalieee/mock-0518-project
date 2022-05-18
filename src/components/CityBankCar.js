import React, { useRef, useState, useEffect } from "react";
// import { useCityUpdate } from "../context/CityContext";

export default function CityBankCar(props) {
  const cityCar = useRef();

  // Mouse over car state
  const [hoverCar, setHoverCar] = useState(false);

  console.log(setHoverCar(false))

  // Showing dialog box when clicked
  // const { toggleCarDialog } = useCityUpdate();

  // Changing mouse pointer
  useEffect(() => {
    void (document.body.style.cursor = hoverCar ? "pointer" : "auto");
  }, [hoverCar]);

  return (
    <>
      <mesh
        ref={cityCar}
        // onPointerOver={(e) => setHoverCar(true)}
        // onPointerOut={(e) => setHoverCar(false)}
        // onClick={() => toggleCarDialog()}
      >
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
