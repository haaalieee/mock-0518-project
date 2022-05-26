import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";
import CameraControls from "camera-controls";
import CameraAnimation from "./CameraAnimation";
import { useCity } from "../context/CityContext";
import { useCityUpdate } from "../context/CityContext";

// Custom camera controls instance
CameraControls.install({ THREE });
extend({ CameraControls });

export default function CameraControl() {
  const ref = useRef();
  const camera = useThree((state) => state.camera);
  const state = useThree((state) => state);
  const gl = useThree((state) => state.gl);

  const { clickedCity, objectPosition } = useCity();
  const { toggleCarDialog } = useCityUpdate();

  useEffect(() => {
    if (clickedCity) {
      CameraAnimation(clickedCity, objectPosition, state, ref.current, () => toggleCarDialog());
      // console.log("clicked", objectPosition);
    } else {
      CameraAnimation(clickedCity, objectPosition, state, ref.current, () => toggleCarDialog());
      // console.log("not-clicked", objectPosition);
    }
  }, [clickedCity, objectPosition]);

  useFrame((state, delta) => {
    ref.current.update(delta);
  });

  return <cameraControls ref={ref} args={[camera, gl.domElement]} />;
}
