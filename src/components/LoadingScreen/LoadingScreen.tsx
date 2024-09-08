import { LoadingScreenStyled } from "./LoadingScreen.styled.ts";
import { Loader } from "./Loader.tsx";

export const LoadingScreen = () => {
  return (
    <LoadingScreenStyled>
      <Loader />
    </LoadingScreenStyled>
  );
};
