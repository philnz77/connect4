export const randomFromArray = items =>
  items[Math.floor(Math.random() * items.length)];

export const startTimer = () => {
  const t0 = Date.now();
  return () => Date.now() - t0;
};
