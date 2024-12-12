import { Environment, useGLTF, useTexture } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Suspense, useEffect, useState } from "react";
import {
  BufferGeometry,
  Euler,
  Material,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Object3DEventMap,
  Vector3,
} from "three";
import Floor from "./Floor.tsx";
import { RoomCentralLights } from "./RoomLights.tsx";
import { useLights } from "../../hooks/useLights.ts";
import { BoardsCollider } from "./BoardsCollider.tsx";

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

  const screenTexture1 = useTexture("/1.png");
  const screenTexture2 = useTexture("/2.png");
  const screenTexture3 = useTexture("/3.png");
  const screenTexture4 = useTexture("/4.png");
  const screenTexture5 = useTexture("/5.png");
  const screenTexture6 = useTexture("/6.png");
  const logo = useTexture("/logo.png");

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
        if (sceneItem instanceof Mesh) {
          switch (sceneItem.name) {
            case "BOARD008":
              sceneItem.material.map = screenTexture1;

              break;
            case "BOARD009":
              sceneItem.material.map = screenTexture2;

              break;
            case "BOARD010":
              sceneItem.material.map = screenTexture3;

              break;
            case "BOARD012":
              sceneItem.material.map = screenTexture4;

              break;
            case "BOARD013":
              sceneItem.material.map = screenTexture5;

              break;
            case "BOARD014":
              sceneItem.material.map = screenTexture6;
              break;
            case "POINT-SCREEN":
              sceneItem.material.map = logo;
              break;
            default:
              break;
          }
        }

        // if (sceneItem instanceof Mesh && sceneItem.name == "BOARD008") {
        //   sceneItem.material.map = screenTexture;
        // }
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
      <BoardsCollider scene={scene} />
      <Floor />
    </group>
  );
};
