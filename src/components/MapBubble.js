import React, { forwardRef } from "react";
import { Html } from "@react-three/drei";
import { useSpring } from "@react-spring/core";
import { animated } from "@react-spring/web";
import { a } from "@react-spring/three";
import { useCity } from "../context/CityContext";
import { useFrame } from "@react-three/fiber";

const MapBubble = forwardRef((props, ref) => {
  // Context state provider
  const { hoverCity } = useCity();

  // Bubble scale animation properties
  const [{ bg }] = useSpring(
    {
      bg: Number(hoverCity),
      config: {
        mass: 1,
        tension: 120,
        friction: 14,
        precision: 0.002,
      },
    },
    [hoverCity]
  );

  // Default spring animation properties
  const [{ z }] = useSpring(
    {
      z: Number(hoverCity),
      config: { mass: 1, tension: 180, friction: 12, precision: 0.002 },
    },
    [hoverCity]
  );

  // Interpolations
  const bubbleScale = z.to([0, 1], [1, 1.3]);
  const bubbleBg = bg.to([0, 1], ["#7f00a9", "#157fc9"]);
  const bubblePsuedo = () => {
    let root = document.querySelector(":root");
    root.style.setProperty("--bgcolor", bubbleBg.get());
  };

  useFrame(() => {
    bubblePsuedo();
  });

  return (
    <a.group
      position={props.position}
      rotation={props.rotation}
      scale={bubbleScale}
    >
      <Html
        className="content"
        scale={props.scale}
        distanceFactor={20}
        ref={ref}
        transform
        occlude
      >
        <animated.div
          className="map-wrapper"
          style={{ backgroundColor: bubbleBg }}
        >
          <p>{props.text}</p>
        </animated.div>
      </Html>
    </a.group>
  );
});

export default MapBubble;
