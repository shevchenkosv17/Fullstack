export const checkArticleAccess = (req, res, next) => {
  const userRole = req.headers['x-user-role'];
  if (req.method !== 'GET' && userRole !== 'admin' && userRole !== 'editor') {
    return res.status(403).send('Доступ заборонено. Недостатньо прав для зміни статей.');
  }
  next();
};
