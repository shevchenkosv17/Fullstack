const articles = [
  { id: '1', title: 'Вступ до Node.js та Express', author: 'Олександр Коваленко', content: 'Основні принципи побудови серверних додатків на Express.' },
  { id: '2', title: 'Робота з мідлварами', author: 'Марія Шевченко', content: 'Як використовувати проміжне ПЗ для логування та безпеки.' },
  { id: '999', title: 'Шаблонізатори PUG та EJS', author: 'Іван Бойко', content: 'Інтеграція різних рушіїв рендерингу HTML в одному проєкті.' }
];

export const getArticles = (req, res) => {
  res.render('articles/articlesList.ejs', { articles });
};

export const postArticle = (req, res) => {
  res.send('Post articles route');
};

export const getArticleById = (req, res) => {
  const { articleId } = req.params;
  const article = articles.find(a => a.id === articleId) || {
    id: articleId,
    title: `Стаття #${articleId}`,
    author: 'Невідомий автор',
    content: `Детальний опис статті з ідентифікатором ${articleId}.`
  };
  res.render('articles/articleDetails.ejs', { article });
};

export const putArticle = (req, res) => {
  const { articleId } = req.params;
  res.send(`Put article by Id route: ${articleId}`);
};

export const deleteArticle = (req, res) => {
  const { articleId } = req.params;
  res.send(`Delete article by Id route: ${articleId}`);
};
