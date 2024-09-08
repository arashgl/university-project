import { Box3, Group, MathUtils, Object3DEventMap, Vector3 } from "three";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  BOUNDARY_BOX_X_SYNC,
  BOUNDARY_BOX_Z_SYNC,
} from "@/sections/meet/Player/Player.constant.ts";
import * as THREE from "three";

export const usePlayerCamera = (
  container: React.RefObject<Group<Object3DEventMap>>,
  rotationTarget: React.MutableRefObject<number>,
) => {
  const cameraTarget = useRef<Group<Object3DEventMap>>(null);
  const cameraPosition = useRef<Group<Object3DEventMap>>(null);
  const cameraWorldPosition = useRef(new Vector3());
  const cameraLookAtWorldPosition = useRef(new Vector3());
  const cameraLookAt = useRef(new Vector3());
  const { scene, camera } = useThree();
  const [boundingBox, setBoundingBox] = useState<Box3>();

  //Bounding Box is for camera to not go out of the boundary of room
  useEffect(() => {
    const bound = scene.getObjectByName("MESH-COLLISION");
    let _boundingBox = new Box3();
    let testBox = new Box3();

    if (bound) {
      // bound.visible = false;
      // bound.mater
      _boundingBox = new Box3().setFromObject(bound);
      testBox = new Box3(
        new Vector3(
          _boundingBox.min.x + BOUNDARY_BOX_X_SYNC,
          _boundingBox.min.y,
          _boundingBox.min.z + BOUNDARY_BOX_Z_SYNC,
        ),
        new Vector3(
          _boundingBox.max.x - BOUNDARY_BOX_X_SYNC,
          _boundingBox.max.y,
          _boundingBox.max.z - BOUNDARY_BOX_Z_SYNC,
        ),
      );
    }

    setBoundingBox(testBox);
    // const helper = new Box3Helper(testBox, 0xff0000);
    // scene.add(helper);
  }, [scene]);

  useFrame(() => {
    if (container.current)
      container.current.rotation.y = MathUtils.lerp(
        container.current.rotation.y,
        rotationTarget.current,
        0.4,
      );

    if (cameraPosition.current) {
      cameraPosition.current.getWorldPosition(cameraWorldPosition.current);

      if (boundingBox) {
        cameraWorldPosition.current.clamp(boundingBox.min, boundingBox.max);
      }
      camera.position.lerp(cameraWorldPosition.current, 0.2);
    }

    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);
      camera.lookAt(cameraLookAt.current);
    }
  });

  return {
    cameraTarget,
    cameraPosition,
    cameraWorldPosition,
    cameraLookAtWorldPosition,
    cameraLookAt,
  };
};
