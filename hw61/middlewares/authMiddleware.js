export const basicAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).send('Доступ заборонено. Не надано облікові дані.');
  }
  next();
};
