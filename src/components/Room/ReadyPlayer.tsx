import { useRef } from "react";
import { RapierRigidBody } from "@react-three/rapier";
import Ecctrl from "../Ecctrl/Ecctrl.tsx";
import { PlayerMouse } from "../PlayerMouse/PlayerMouse.tsx";
import { FloatingText } from "../FloatingText.tsx";
import { useFrame } from "@react-three/fiber";
import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
  Vector3,
} from "three";

export const ReadyPlayer = () => {
  const ref = useRef<RapierRigidBody>(null);
  const textRef =
    useRef<
      Mesh<
        BufferGeometry<NormalBufferAttributes>,
        Material | Material[],
        Object3DEventMap
      >
    >(null);

  useFrame(() => {
    if (textRef && textRef.current) {
      const new_pos = ref?.current?.translation();
      const newVec = new Vector3(new_pos?.x, new_pos?.y, new_pos?.z);
      if (newVec) {
        textRef.current?.lookAt(newVec);
      }
    }
  }); //Make text face the character

  return (
    <>
      <Ecctrl
        animated
        followLight
        ref={ref}
        position={[0, 2, 10]}
        springK={2}
        dampingC={0.5}
        rayOriginOffest={{ x: 0, y: -0.35, z: 0 }}
        autoBalanceSpringK={1.2}
        autoBalanceDampingC={0.084}
        autoBalanceSpringOnY={0.7}
        autoBalanceDampingOnY={0.093}
        disableFollowCam={false}
      >
        <PlayerMouse model_url={"/character2.glb"} />
      </Ecctrl>
      <FloatingText ref={textRef} />
    </>
  );
};
