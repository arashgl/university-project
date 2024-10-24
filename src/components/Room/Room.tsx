import { Environment, useGLTF, useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useState } from "react";
import {
  BufferGeometry,
  Euler,
  LinearFilter,
  Material,
  Mesh,
  MeshStandardMaterial,
  RepeatWrapping,
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
  const { scene } = useGLTF("/central.gltf");
  const [collisionMesh, setCollisionMesh] = useState<Mesh | null>(null);
  const lights = useLights();
  const screenTexture = useTexture("/1.jpeg");

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
        if (sceneItem instanceof Mesh && sceneItem.name == "MAIN-BOARD") {
          screenTexture.wrapS = RepeatWrapping;
          screenTexture.wrapT = RepeatWrapping;
          screenTexture.repeat.set(1, 1);
          screenTexture.flipY = true;
          screenTexture.minFilter = LinearFilter;
          sceneItem.material.map = screenTexture;
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
