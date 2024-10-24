import { BallCollider } from "@react-three/rapier";
import { useGLTF, useProgress } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Group, Object3DEventMap } from "three";
import { useFrame } from "@react-three/fiber";
import { useCheckSceneLoad } from "../../hooks/store/useCheckSceneLoad.ts";
import { usePlayerMovement } from "./hooks/usePlayerMovement.ts";

export interface ICharacterProps {
  model_url?: string;
  character_name?: string;
}
export const PlayerMouse = ({ model_url }: ICharacterProps) => {
  const characterFile = useGLTF(model_url || "/model/characters/01.gltf");
  const setLoad = useCheckSceneLoad((state) => state.setLoaded);
  const { loaded } = useProgress();

  useEffect(() => {
    if (loaded) setLoad(true);
  }, [loaded]);

  const action = useRef<{ current_action: string; prev_action: string }>({
    current_action: "idle",
    prev_action: "idle",
  });
  const groupRef = useRef<Group<Object3DEventMap>>(null);
  usePlayerMovement(groupRef, action);
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.y = -0.8;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={characterFile.scene} />;
      <BallCollider args={[0.5]} position={[0, 1, 0]} />
    </group>
  );
};
