export const getUsers = (req, res) => {
  res.send('Get users route');
};

export const postUser = (req, res) => {
  res.send('Post users route');
};

export const getUserById = (req, res) => {
  const { userId } = req.params;
  res.send(`Get user by Id route: ${userId}`);
};

export const putUser = (req, res) => {
  const { userId } = req.params;
  res.send(`Put user by Id route: ${userId}`);
};

export const deleteUser = (req, res) => {
  const { userId } = req.params;
  res.send(`Delete user by Id route: ${userId}`);
};
