import { styled } from "@mui/material";

export const LoadingScreenStyled = styled("div")(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  zIndex:
    theme.zIndex.fab +
    theme.zIndex.appBar +
    theme.zIndex.drawer +
    theme.zIndex.modal +
    theme.zIndex.mobileStepper +
    theme.zIndex.speedDial +
    theme.zIndex.tooltip,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const SpinnerStyled = styled("div")(({ theme }) => ({
  borderTop: `2px solid ${theme.palette.primary.main}`,
  borderRadius: "50%",
  boxShadow: `inset 0 0 20px -10px ${theme.palette.primary.main}90,
    0 0 40px -10px ${theme.palette.primary.main}FF`,
  width: "80px",
  height: "80px",
}));
