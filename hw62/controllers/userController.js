const users = [
  { id: '1', name: 'Олександр Коваленко', email: 'alex@example.com', role: 'Адміністратор' },
  { id: '2', name: 'Марія Шевченко', email: 'maria@example.com', role: 'Редактор' },
  { id: '777', name: 'Іван Бойко', email: 'ivan777@example.com', role: 'Користувач' }
];

export const getUsers = (req, res) => {
  res.render('users/usersList.pug', { users });
};

export const postUser = (req, res) => {
  res.send('Post users route');
};

export const getUserById = (req, res) => {
  const { userId } = req.params;
  const user = users.find(u => u.id === userId) || {
    id: userId,
    name: `Користувач #${userId}`,
    email: `user${userId}@example.com`,
    role: 'Гість'
  };
  res.render('users/userDetails.pug', { user });
};

export const putUser = (req, res) => {
  const { userId } = req.params;
  res.send(`Put user by Id route: ${userId}`);
};

export const deleteUser = (req, res) => {
  const { userId } = req.params;
  res.send(`Delete user by Id route: ${userId}`);
};
