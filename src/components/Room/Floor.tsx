import { RigidBody } from "@react-three/rapier";

export default function Floor() {
  return (
    <>
      {/*<ambientLight intensity={1} />*/}
      <RigidBody type="fixed">
        <mesh receiveShadow position={[0, -2.5, 0]}>
          <boxGeometry args={[100, 5, 100]} />
          <meshStandardMaterial opacity={0} color="lightblue" visible={false} />
        </mesh>
      </RigidBody>
    </>
  );
}
