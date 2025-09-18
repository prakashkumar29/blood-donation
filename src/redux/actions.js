export const makeNotification = (payload) => {
  if (!payload) return null;
  const [message, severity] = payload;
  return { message, severity };
};
