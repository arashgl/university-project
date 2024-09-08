import { IMotion } from '@/types/generals/motion.types';

export const mo_spinner: IMotion = {
    animate: { rotate: 360 },
    transition: {
        duration: 1,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
    },
};
