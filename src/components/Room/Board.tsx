import { CuboidCollider } from "@react-three/rapier";
import { Euler, Object3D, Object3DEventMap } from "three";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion-3d";
import { Text } from "@react-three/drei";

type BoardProps = {
  board: Object3D<Object3DEventMap>;
};
const mapping: Record<number, string> = {
  8: "https://arandao.xyz",
  9: "https://sepid.app",
  11: "https://arusense.com",
  12: "https://redstartapply.com",
  13: "https://clinify.ir",
  14: "https://firemonitor.ir",
};
export const Board = ({ board }: BoardProps) => {
  const [entered, setEntered] = useState(false);
  const boardIndex = +board.name.slice(-2);

  return (
    <>
      <CuboidCollider
        args={[2, 3, 2]}
        sensor
        position={board.position}
        onIntersectionEnter={() => setEntered(true)}
        onIntersectionExit={() => setEntered(false)}
      />
      <AnimatePresence>
        {entered && (
          <motion.mesh
            position={board.position}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.mesh
              position={[1, 0.8, -0.1]} // Adjust position for the second button
              whileHover={{ scale: 1.05, pointsAtX: 10 }} // Hover effect
              onClick={() => {
                //open new tab with google.com
                window.open(mapping[boardIndex], "_blank");
              }} // Handle button click
            >
              <Text
                rotation={new Euler(0, boardIndex > 7 ? 0 : Math.PI, 0)}
                position={[-1, -0.5, boardIndex > 7 ? 0.3 : 0]}
                scale={0.5}
              >
                Click to navigate
              </Text>
            </motion.mesh>
          </motion.mesh>
        )}
      </AnimatePresence>
    </>
  );
};
