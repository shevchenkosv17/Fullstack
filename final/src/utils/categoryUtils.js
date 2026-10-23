import categories from '../data/categories.json';

const categoryList = categories.cats;

export const getCategoryByTitle = (title = '') =>
  categoryList.find((category) => category.title === title);

export const getCategoryByKey = (key = '') =>
  categoryList.find((category) => category.key === key);

export const getCategoryKeyFromPostValue = (value = '') => {
  const byKey = getCategoryByKey(value);
  if (byKey) {
    return byKey.key;
  }

  const byTitle = getCategoryByTitle(value);
  if (byTitle) {
    return byTitle.key;
  }

  return null;
};
