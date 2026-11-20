export const validateUserInput = (req, res, next) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).send('Відсутні обов’язкові поля: username та password');
  }
  next();
};
