import { useCallback } from "react";

export const useCharacterData = () => {
  const getCharacterData = useCallback(() => {
    return {
      file: "/character2.glb",
    };
  }, []);

  return { getCharacterData };
};
