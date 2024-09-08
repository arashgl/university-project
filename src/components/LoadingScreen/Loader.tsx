import { motion } from "framer-motion";
import { mo_spinner } from "./LoadingScreen.motion.ts";
import { SpinnerStyled } from "./LoadingScreen.styled.ts";

type propType = {
  size?: number;
};
export const Loader = ({ size }: propType) => {
  return (
    <motion.div {...mo_spinner}>
      <SpinnerStyled
        sx={size ? { width: size, height: size } : {}}
      ></SpinnerStyled>
    </motion.div>
  );
};
