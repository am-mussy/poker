export const createRoomId = () => {
  return parseInt(`${Math.random()}`.slice(-5)) + new Date().getMilliseconds();
};

export const createUserId = () => {
  return parseInt(`${Math.random()}`.slice(-5)) + new Date().getMilliseconds();
};
