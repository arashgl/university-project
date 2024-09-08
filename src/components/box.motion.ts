export const mo_box = (active: boolean) => ({
  initial: { y: 0, scale: 1 },
  animate: active ? { y: 0.5, scale: 1.4 } : { y: 0, scale: 1 },
  exit: { y: 0, scale: 0 },
  transition: {
    duration: 0.8,
    ease: "anticipate",
  },
});

export const mo_character = {
  initial: { y: 0 },
  animate: { y: 0.08 },
  transition: {
    duration: 1,
    delay: 0.5,
    ease: "easeInOut",
    // repeat: Infinity,
    repeatDelay: 0,
  },
};
