// import * as THREE from "three"
import React, { useRef }  from 'react'
import { useFrame } from "@react-three/fiber"

export default function Rig(props) {
    const outer = useRef()
    const inner = useRef()

    useFrame(({ camera, clock }) => {
    //   outer.current.position.x = THREE.MathUtils.lerp(outer.current.position.x, 0, 0.05)
    //   inner.current.rotation.y = Math.sin(clock.getElapsedTime() / 8) * Math.PI
    //   inner.current.position.z = 5 + -Math.sin(clock.getElapsedTime() / 2) * 10
    //   inner.current.position.y = -5 + Math.sin(clock.getElapsedTime() / 2) * 2
    })

    return (
      <group position={[0, 0, 0]} ref={outer}>
        <group ref={inner}>{props.children}</group>
      </group>
    )
}
