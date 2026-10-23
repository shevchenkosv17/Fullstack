import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useTheme } from '../contexts/ThemeContext';

const MAX_ENTRIES = 10;

const SidebarCard = styled.section`
  border: 1px solid ${({ $colors }) => $colors.border};
  border-radius: 12px;
  background: ${({ $colors }) => $colors.surfaceAlt};
  padding: 16px;
`;

const Title = styled.h3`
  margin: 0 0 12px;
  font-size: 1.1rem;
`;

const List = styled.ol`
  list-style: decimal;
  margin: 0;
  padding-left: 20px;
  display: grid;
  gap: 10px;
`;

const Item = styled.li`
  color: ${({ $colors }) => $colors.textSecondary};
`;

const PostLink = styled(Link)`
  color: ${({ $colors }) => $colors.accent};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ViewsLabel = styled.p`
  margin: 3px 0 0;
  font-size: 0.84rem;
  color: ${({ $colors }) => $colors.textSecondary};
`;

const toValidNumber = (value) => {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : 0;
};

const getViewsCount = (post) => {
  if (!post || typeof post !== 'object') {
    return 0;
  }

  return toValidNumber(
    post.viewsCount
    ?? post.viewCount
    ?? post.views
    ?? post.views_count,
  );
};

function MostViewed() {
  const posts = useSelector(state => state.posts.postsData);
  const isLoading = useSelector(state => state.posts.loading);
  const error = useSelector(state => state.posts.error);
  const { colors } = useTheme();

  const items = useMemo(() => {
    if (!Array.isArray(posts)) {
      return [];
    }

    return [...posts]
      .sort((firstPost, secondPost) => getViewsCount(secondPost) - getViewsCount(firstPost))
      .slice(0, MAX_ENTRIES);
  }, [posts]);

  return (
    <SidebarCard $colors={colors}>
      <Title>Most viewed</Title>
      {items.length > 0 ? (
        <List>
          {items.map((post, index) => (
            <Item key={post.id ?? post.uuid ?? `${post.title}-${index}`} $colors={colors}>
              <PostLink to={`/post/${post.id}`} $colors={colors}>
                {post.title || 'Untitled post'}
              </PostLink>
              <ViewsLabel $colors={colors}>{getViewsCount(post).toLocaleString()} views</ViewsLabel>
            </Item>
          ))}
        </List>
      ) : null}
    </SidebarCard>
  );
}

export default MostViewed;
