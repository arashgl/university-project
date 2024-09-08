import { Environment, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useState } from "react";
import {
  BufferGeometry,
  Euler,
  Material,
  Mesh,
  MeshStandardMaterial,
  Vector3,
} from "three";
import Floor from "./Floor.tsx";
import { RoomCentralLights } from "./RoomLights.tsx";
import { useLights } from "../../hooks/useLights.ts";

export interface SceneItem {
  children?: SceneItem[];
  geometry?: BufferGeometry;
  name?: string;
  material?: Material;
  position?: Vector3;
  rotation?: Euler;
  scale?: Vector3;
  castShadow?: boolean;
  receiveShadow?: boolean;
  [key: string]: any;
}

export const Room = () => {
  const { scene } = useGLTF("/room-central.gltf");
  const [collisionMesh, setCollisionMesh] = useState<Mesh | null>(null);
  const lights = useLights();

  useEffect(() => {
    const mesh = scene.getObjectByName("MESH-COLLISION") as Mesh;
    if (mesh) {
      setCollisionMesh(mesh);
    }
    (scene.children as SceneItem) = scene.children.map(
      (sceneItem: SceneItem) => {
        if (sceneItem.geometry && sceneItem.name == "MESH-COLLISION") {
          sceneItem.material = new MeshStandardMaterial({ visible: false });
        }
        return sceneItem;
      },
    );
  }, [scene]);

  return (
    <group dispose={null}>
      <Environment preset="night" />
      <RoomCentralLights lights={lights} />
      {collisionMesh && (
        <RigidBody type={"fixed"} colliders={"trimesh"}>
          <primitive object={collisionMesh} />
        </RigidBody>
      )}
      <primitive object={scene} />
      <Floor />
    </group>
  );
};
