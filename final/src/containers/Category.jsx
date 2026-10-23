import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Card, Loader, Error, Pager, Plug } from '../components';

import { useTheme } from '../contexts/ThemeContext';
import { getCategoryByKey, getCategoryKeyFromPostValue } from '../utils/categoryUtils';
import { POST_SORT_OPTIONS, sortPosts } from '../utils/postSort';

const POSTS_PER_PAGE = 10;

const PageSection = styled.section`
  margin: 0 auto;
  padding: 24px 0;
`;

const Title = styled.h2`
  margin-bottom: 16px;
`;

const ControlsRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

const ControlGroup = styled.label`
  display: grid;
  gap: 6px;
  min-width: 220px;
`;

const ControlLabel = styled.span`
  font-size: 0.82rem;
  color: ${({ $colors }) => $colors.textSecondary};
`;

const ControlSelect = styled.select`
  border: 1px solid ${({ $colors }) => $colors.border};
  border-radius: 8px;
  background: ${({ $colors }) => $colors.surfaceAlt};
  color: ${({ $colors }) => $colors.textPrimary};
  padding: 8px 10px;
`;

function Category() {
  const posts = useSelector(state => state.posts.postsData);
  const isLoading = useSelector(state => state.posts.loading);
  const error = useSelector(state => state.posts.error);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(POST_SORT_OPTIONS.DATE_PUBLISHED);
  const { colors } = useTheme();

  const { catName } = useParams();
  const selectedCategory = getCategoryByKey(catName);
  const selectedCategoryTitle = selectedCategory?.title ?? catName;
  const filteredPosts = (posts ?? []).filter((post) => {
    const postCategoryKey = getCategoryKeyFromPostValue(post.category);

    return postCategoryKey ? postCategoryKey === catName : post.category === catName;
  });
  const sortedPosts = useMemo(
    () => sortPosts(filteredPosts, sortBy),
    [filteredPosts, sortBy],
  );

  useEffect(() => {
    setPage(1);
  }, [catName, sortBy]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(sortedPosts.length / POSTS_PER_PAGE));

    setPage((prevPage) => Math.min(prevPage, totalPages));
  }, [sortedPosts.length]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error} />;
  }

  if (!posts?.length) {
    return <Plug text="No posts yet..." />;
  }

  if (!filteredPosts.length) {
    return (
      <PageSection>
        <Title>{selectedCategoryTitle}</Title>
        <ControlsRow>
          <ControlGroup>
            <ControlSelect
              $colors={colors}
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value={POST_SORT_OPTIONS.DATE_PUBLISHED}>Date published (newest first)</option>
              <option value={POST_SORT_OPTIONS.MOST_VIEWED}>Most viewed</option>
            </ControlSelect>
          </ControlGroup>
        </ControlsRow>
        <Plug text="No posts in this category yet..." />
      </PageSection>
    );
  }

  const pageCount = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const pageStart = (page - 1) * POSTS_PER_PAGE;
  const pageEnd = pageStart + POSTS_PER_PAGE;
  const pagedPosts = sortedPosts.slice(pageStart, pageEnd);

  return (
    <PageSection>
      <Title>{selectedCategoryTitle}</Title>
      <ControlsRow>
        <ControlGroup>
          <ControlSelect
            $colors={colors}
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value={POST_SORT_OPTIONS.DATE_PUBLISHED}>Date published (newest first)</option>
            <option value={POST_SORT_OPTIONS.MOST_VIEWED}>Most viewed</option>
          </ControlSelect>
        </ControlGroup>
      </ControlsRow>
      {pagedPosts.map(({
        uuid,
        title,
        body,
        userID,
        userId,
        id,
        category,
        imagePaths,
        datePublished,
        publishedAt,
        createdAt,
        created_at,
        date,
      }) => (
          <Card
            key={uuid}
            title={title}
            description={body}
            author={userID ?? userId}
            postID={id}
            category={category}
            imagePaths={imagePaths}
            publishedAt={datePublished ?? publishedAt ?? createdAt ?? created_at ?? date}
          />
        ))}
      <Pager page={page} pageCount={pageCount} onPageChange={setPage} />
    </PageSection>
  );
}

export default Category;
