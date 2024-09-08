import { Button, styled } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export const ButtonsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
  gap: "20px",
  marginTop: 20,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
    alignItems: "center",
    gap: 1,
  },
}));

export const PopupBodyStyled = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  rowGap: "20px",
  padding: "12px 16px 0 16px",
  borderRadius: "45px",
  backgroundColor: "rgba(0,0,0,0.68)",
  border: "2px solid #ffffff20",
  boxShadow: "0px 10px 40px 0px #2042EE66",
  zIndex: 10,
  height: "100%",
}));

export const PStyled = styled("p")(({ theme }) => ({
  fontSize: "24px",
  letterSpacing: "0.05px",
  color: "white",
  textAlign: "center",

  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
  },
}));

const BTN = {
  width: "100%",
  padding: "10px 16px",
  backgroundColor: "#049172",
  color: "#ffffff",
  borderRadius: "16px",
  fontSize: "14px",
  marginBottom: "20px",
  "&:hover": {
    backgroundColor: "rgba(4,145,114,0.65)",
    opacity: "0.8",
  },
};
export const ButtonStyled = styled(Button)(() => ({
  ...BTN,
}));

export const LoadingButtonStyled = styled(LoadingButton)(() => ({
  ...BTN,
}));

export const bannerPopupVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: "-100px",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: "0px",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: "-100px",
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};
