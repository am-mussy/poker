export const generateID = () => {
  return parseInt(`${Math.random()}`.slice(-5)) + new Date().getMilliseconds();
};
