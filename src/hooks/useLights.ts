import { useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Object3D } from "three";
import * as THREE from "three";

export const useLights = () => {
  const [loading, setLoading] = useState(0);

  const [lights, setLights] = useState<Object3D<THREE.Object3DEventMap>[]>([]);

  const roomModel = useGLTF("/central.gltf", false, false, (progress) => {
    progress.manager.onLoad = () => {
      setLoading((prev) => prev + 1);
    };
  });

  useEffect(() => {
    if (roomModel.scene) {
      const res: Object3D<THREE.Object3DEventMap>[] = [];
      roomModel.scene.children.map((object: Object3D) => {
        if (object.name.startsWith("LIGHT-")) {
          res.push(object);
        }
      });
      setLights(res);
    }
  }, [loading]);

  return lights;
};
