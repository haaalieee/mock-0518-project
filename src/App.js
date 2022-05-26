import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { SpotLightHelper } from "three";
import { Loader, useHelper } from "@react-three/drei";
import City from "./components/City";
// import Toureast from "./components/Toureast";
import Toureasttest from "./components/Toureasttest";
import Rig from "./components/Rig";
import { CityProvider } from "./context/CityContext";
import CameraControl from "./utils/CameraControl";
import "./styles.css";
import Waterfall from "./components/Waterfall";
import Oasis from "./components/Oasis";

// import {
//   EffectComposer,
//   DepthOfField,
//   Vignette,
// } from "@react-three/postprocessing";

function Scene() {
  const spLight = useRef();
  const spTreeLight = useRef();
  // useHelper(spTreeLight, SpotLightHelper, "teal");
  // useHelper(spLight, SpotLightHelper, "teal");

  return (
    <>
      <color attach="background" args={["#c0dbe9"]} />
      {/* <fog attach="fog" args={['#c0dbe9', 10, 150]} /> */}
      <ambientLight intensity={2} />
      <spotLight
        ref={spLight}
        position={[40, 160, -20]}
        intensity={5}
        distance={200}
        angle={0.5}
        penumbra={1}
        castShadow
        color="white"
      />
      <spotLight
        ref={spTreeLight}
        position={[40, 200, 180]}
        intensity={5}
        distance={300}
        angle={0.5}
        castShadow
        color="white"
      />
      <CityProvider>
        <Suspense fallback={null}>
          <Rig>
            <group position={[-7.5, -4.68, 4]}>
              <Waterfall />
            </group>
            <City
              rotation={[0, 1.56, 0]}
              scale={[0.01, 0.01, 0.01]}
              position={[10, -10, 20]}
            />
          </Rig>
        </Suspense>
        <CameraControl />
        {/* <OrbitControls
          enablePan={false}
          enableZoom={true}
          maxPolarAngle={0.9}
          minPolarAngle={0.9}
          enableDamping={true}
        /> */}
        <Oasis position={[10,30,-55]} scale={2} rotation={[0,2.9,0]}/>
        <Toureasttest scale={0.06} position={[30, 20, 100]} />
      </CityProvider>
    </>
  );
}

function App() {
  return (
    <>
      <Canvas
        linear
        camera={{ position: [-27, 27, 4], fov: 70 }}
        shadows={true}
      >
        <Scene />
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
