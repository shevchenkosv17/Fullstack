import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Card, Loader, Error, Pager, Plug } from '../components';
import { useTheme } from '../contexts/ThemeContext';
import categories from '../data/categories.json';
import { getCategoryKeyFromPostValue } from '../utils/categoryUtils';
import { POST_SORT_OPTIONS, sortPosts } from '../utils/postSort';

const POSTS_PER_PAGE = 10;
const ALL_CATEGORIES_VALUE = 'all';

const PageSection = styled.section`
  margin: 0 auto;
  padding: 24px 0;
`;

const ControlsRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const ControlGroup = styled.label`
  display: grid;
  gap: 6px;
  min-width: 180px;
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

function Home() {
  const posts = useSelector(state => state.posts.postsData);
  const isLoading = useSelector(state => state.posts.loading);
  const error = useSelector(state => state.posts.error);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES_VALUE);
  const [sortBy, setSortBy] = useState(POST_SORT_OPTIONS.DATE_PUBLISHED);
  const { colors } = useTheme();

  const filteredAndSortedPosts = useMemo(() => {
    const sourcePosts = Array.isArray(posts) ? posts : [];
    const filteredPosts = sourcePosts.filter((post) => {
      if (selectedCategory === ALL_CATEGORIES_VALUE) {
        return true;
      }

      const postCategoryKey = getCategoryKeyFromPostValue(post.category);

      return postCategoryKey ? postCategoryKey === selectedCategory : post.category === selectedCategory;
    });

    return sortPosts(filteredPosts, sortBy);
  }, [posts, selectedCategory, sortBy]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(filteredAndSortedPosts.length / POSTS_PER_PAGE));

    setPage((prevPage) => Math.min(prevPage, totalPages));
  }, [filteredAndSortedPosts.length]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, sortBy]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error} />;
  }

  if (!posts?.length) {
    return <Plug text="No posts yet..." />;
  }

  const pageCount = Math.ceil(filteredAndSortedPosts.length / POSTS_PER_PAGE);
  const pageStart = (page - 1) * POSTS_PER_PAGE;
  const pageEnd = pageStart + POSTS_PER_PAGE;
  const pagedPosts = filteredAndSortedPosts.slice(pageStart, pageEnd);

  return (
    <PageSection>
      <ControlsRow>
        <ControlGroup>
          <ControlSelect
            $colors={colors}
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value={ALL_CATEGORIES_VALUE}>All categories</option>
            {categories.cats.map(({ key, title }) => (
              <option key={key} value={key}>{title}</option>
            ))}
          </ControlSelect>
        </ControlGroup>
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

      {pagedPosts.length > 0 ? (
        pagedPosts.map(
          ({
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
          ),
        )
      ) : (
        <Plug text="No posts match the selected filters." />
      )}
      {pageCount > 1 && <Pager page={page} pageCount={pageCount} onPageChange={setPage} />}
    </PageSection>
  );
}

export default Home;
