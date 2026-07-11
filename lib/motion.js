export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, delay: i * 0.06, ease: "easeOut" },
  }),
};

export const staggerParent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09 },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const viewportOnce = { once: true, margin: "-80px 0px -80px 0px" };
