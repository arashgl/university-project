import { Physics } from "@react-three/rapier";
import { Suspense, useEffect, useState } from "react";
import { Room } from "./Room/Room.tsx";
import { ReadyPlayer } from "./Room/ReadyPlayer.tsx";
import { useKeyboardControls } from "@react-three/drei";
import usePopUpStore from "../hooks/store/usePopup.ts";

export const Experience = () => {
  const [pausedPhysics, setPausedPhysics] = useState(true);
  const close = usePopUpStore((state) => state.close);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPausedPhysics(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  const [subscribe] = useKeyboardControls();

  useEffect(() => {
    const clear = subscribe((event) => {
      if (event.exit) {
        close();
      }
    });
    return () => clear();
  }, []);

  return (
    <Suspense fallback={null}>
      <Physics timeStep="vary" paused={pausedPhysics}>
        <Room />
        <ReadyPlayer />
      </Physics>
    </Suspense>
  );
};

export default Experience;
