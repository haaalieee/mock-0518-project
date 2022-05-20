import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import City from "./components/City";
import Rig from "./components/Rig";
import { CityProvider } from "./context/CityContext";
import CameraControl from "./utils/CameraControl";
import "./styles.css";

// extend({ OrbitControls });

// const Controls = () => {
//   const { camera, gl } = useThree();
//   const ref = useRef();
//   const { clickedCity } = useCity();

//   useFrame(() => {
//     ref.current.update();

//     if (clickedCity) {
//       ref.current.update();
//     }
//   });
//   return (
//     <orbitControls
//       ref={ref}
//       target={[0, 0, 0]}
//       enableDamping
//       args={[camera, gl.domElement]}
//     />
//   );
// };

function App() {
  const [zoom, setZoom] = useState(false);
  const [focus, setFocus] = useState({});
  return (
    <>
      <Canvas
        linear
        camera={{ position: [-27, 27, 4], fov: 70 }}
        shadows={true}
      >
        <CityProvider>
          <color attach="background" args={["#c0dbe9"]} />
          {/* <fog attach="fog" args={['#fffff', 10, 60]} /> */}
          <ambientLight intensity={4} />
          <Suspense fallback={null}>
            <Rig>
              <City
                rotation={[0, 1.56, 0]}
                scale={[0.01, 0.01, 0.01]}
                position={[10, -10, 20]}
              />
            </Rig>
          </Suspense>
          <CameraControl />
          {/* <Controls /> */}
          {/* <OrbitControls
          enablePan={false}
          enableZoom={true}
          maxPolarAngle={0.9}
          minPolarAngle={0.9}
          enableDamping={true}
        /> */}
        </CityProvider>
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
