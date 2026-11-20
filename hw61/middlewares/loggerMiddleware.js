export const logRequests = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} запит до ${req.url}`);
  next();
};
