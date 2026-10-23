export const POST_SORT_OPTIONS = {
  DATE_PUBLISHED: 'publishedDate',
  MOST_VIEWED: 'mostViewed',
};

const toValidNumber = (value) => {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : 0;
};

export const getPostViewsCount = (post) => {
  if (!post || typeof post !== 'object') {
    return 0;
  }

  return toValidNumber(
    post.viewsCount
  );
};

const getPostDateValue = (post = {}) =>
  post.publishedDate
  ?? post.createdDate
  ?? new Date();

export const getPostPublishedTimestamp = (post) => {
  const postDateValue = getPostDateValue(post);

  if (!postDateValue) {
    return 0;
  }

  const publishedTimestamp = new Date(postDateValue).getTime();

  return Number.isFinite(publishedTimestamp) ? publishedTimestamp : 0;
};

export const sortPosts = (posts = [], sortBy = POST_SORT_OPTIONS.DATE_PUBLISHED) => {
  const postsCopy = [...posts];

  if (sortBy === POST_SORT_OPTIONS.MOST_VIEWED) {
    return postsCopy.sort(
      (firstPost, secondPost) => getPostViewsCount(secondPost) - getPostViewsCount(firstPost),
    );
  }

  return postsCopy.sort(
    (firstPost, secondPost) =>
      getPostPublishedTimestamp(secondPost) - getPostPublishedTimestamp(firstPost),
  );
};
