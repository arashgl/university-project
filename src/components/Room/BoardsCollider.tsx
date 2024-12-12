import { Suspense, useEffect, useState } from "react";
import { CuboidCollider } from "@react-three/rapier";
import { Board } from "./Board.tsx";
import { Group, Object3D, Object3DEventMap } from "three";

type propsType = {
  scene: Group<Object3DEventMap>;
};
export const BoardsCollider = ({ scene }: propsType) => {
  const [boards, setBoards] = useState<Object3D<Object3DEventMap>[]>([]);

  useEffect(() => {
    let boards: Object3D<Object3DEventMap>[] = [];
    for (let i = 8; i < 14; i++) {
      const data = scene.getObjectByName("BOARD0" + (i > 9 ? i : "0" + i));

      if (data) boards.push(data);
    }
    boards = boards.sort((a, b) => +a.name.slice(-2) - +b.name.slice(-2));
    setBoards(boards);
  }, []);

  return boards.map((board, index) => (
    <Suspense
      key={index}
      fallback={
        <CuboidCollider
          args={[2, 2, 2]}
          sensor
          position={board.position}
          key={index}
        />
      }
    >
      <Board board={board} />
    </Suspense>
  ));
};
