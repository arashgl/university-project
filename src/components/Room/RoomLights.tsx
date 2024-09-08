import { Object3D, Vector3 } from "three";
import * as THREE from "three";

type propsType = {
  lights: Object3D<THREE.Object3DEventMap>[];
};
export const RoomCentralLights = ({ lights }: propsType) => {
  return (
    <group dispose={null}>
      {lights.map((object) => {
        if (object.position.z == 0) {
          return;
        }
        return (
          <spotLight
            key={object.uuid}
            position={
              new Vector3(
                object.position.x,
                object.position.y + 2,
                object.position.z,
              )
            }
            rotation={object.rotation}
            color={"#FFF"}
            intensity={100}
            angle={1.2}
            distance={100}
            decay={1.8}
            penumbra={0.5}
          />
        );
      })}
      <ambientLight intensity={0.8} />
    </group>
  );
};
