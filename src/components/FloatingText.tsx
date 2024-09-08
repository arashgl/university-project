import { Text as DreiText } from "@react-three/drei";
import * as THREE from "three";
import { forwardRef } from "react";
import { motion } from "framer-motion-3d";
import { mo_character } from "./box.motion";
import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from "three";
import usePopUpStore from "../hooks/store/usePopup.ts";

function roundedRect(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(x, y + radius);
  shape.lineTo(x, y + height - radius);
  shape.quadraticCurveTo(x, y + height, x + radius, y + height);
  shape.lineTo(x + width - radius, y + height);
  shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  shape.lineTo(x + width, y + radius);
  shape.quadraticCurveTo(x + width, y, x + width - radius, y);
  shape.lineTo(x + radius, y);
  shape.quadraticCurveTo(x, y, x, y + radius);
  return shape;
}
export const FloatingText = forwardRef<
  Mesh<
    BufferGeometry<NormalBufferAttributes>,
    Material | Material[],
    Object3DEventMap
  >
>((_, ref) => {
  const toggle = usePopUpStore((state) => state.toggleIsOpen);
  return (
    <motion.group
      onPointerDown={() => {
        toggle();
      }}
      {...mo_character}
    >
      <mesh position={[0, 5, 0]} ref={ref}>
        {/* Background with rounded corners */}
        <mesh position={[0, 0, -0.01]}>
          <shapeGeometry args={[roundedRect(-0.6, -0.2, 5, 1, 0.1)]} />
          <meshBasicMaterial color="white" />
        </mesh>
        {/* Text */}
        <DreiText
          onPointerDown={() => {
            toggle();
          }}
          position={[2, 0.3, 0]}
          color="black"
          fontSize={0.4}
          anchorX="center"
          anchorY="middle"
        >
          Click Or Tap Here
        </DreiText>
      </mesh>
    </motion.group>
  );
});
