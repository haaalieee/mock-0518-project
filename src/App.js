import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import City from "./components/City";
import Rig from "./components/Rig";
import { CityProvider } from "./context/CityContext";
import CameraControl from "./utils/CameraControl";
import "./styles.css";

function App() {
  return (
    <>
      <Canvas
        linear
        camera={{ position: [-27, 27, 4], fov: 70 }}
        shadows={true}
      >
        <CityProvider>
          <color attach="background" args={["#c0dbe9"]} />
          <ambientLight intensity={4} />
          <Suspense fallback={null}>
            <Rig>
              <City
                rotation={[0, 1.56, 0]}
                scale={[0.8, 0.8, 0.8]}
                position={[0, -3, 15]}
              />
            </Rig>
          </Suspense>
          <CameraControl />
        </CityProvider>
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
