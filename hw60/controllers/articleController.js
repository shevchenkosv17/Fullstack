export const getArticles = (req, res) => {
  res.send('Get articles route');
};

export const postArticle = (req, res) => {
  res.send('Post articles route');
};

export const getArticleById = (req, res) => {
  const { articleId } = req.params;
  res.send(`Get article by Id route: ${articleId}`);
};

export const putArticle = (req, res) => {
  const { articleId } = req.params;
  res.send(`Put article by Id route: ${articleId}`);
};

export const deleteArticle = (req, res) => {
  const { articleId } = req.params;
  res.send(`Delete article by Id route: ${articleId}`);
};
