import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Error, Plug } from '../components';

import { BASE_URL, resolveImageUrl } from '../api';
import { useTheme } from '../contexts/ThemeContext';

const DATE_FALLBACK = 'Date unavailable';

const PageSection = styled.section`
  margin: 0 auto;
  padding: 28px 0;
`;

const PostArticle = styled.article`
  margin: 0 auto;
  padding: 28px;
  border: 1px solid ${({ $colors }) => $colors.border};
  border-radius: 14px;
  background: ${({ $colors }) => $colors.surfaceAlt};

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const PostTitle = styled.h1`
  margin-bottom: 10px;
  line-height: 1.15;
  letter-spacing: -0.015em;
  font-size: clamp(2rem, 2.8vw, 3rem);
`;

const PostMeta = styled.p`
  margin-bottom: 22px;
  color: ${({ $colors }) => $colors.textSecondary};
  font-style: italic;
  font-size: 0.95rem;
`;

const PostPreview = styled.img`
  float: right;
  width: clamp(230px, 38%, 360px);
  max-height: 340px;
  object-fit: cover;
  border-radius: 10px;
  margin: 0 0 14px 22px;
  margin-right: -64px;
  box-shadow: 0 14px 28px rgba(2, 6, 23, 0.2);

  @media (max-width: 980px) {
    margin-right: 0;
  }

  @media (max-width: 768px) {
    float: none;
    width: 100%;
    margin: 0 0 16px;
    max-height: 300px;
  }
`;

const PostBody = styled.div`
  color: ${({ $colors }) => $colors.textPrimary};
  line-height: 1.8;
  font-size: 1.08rem;
  overflow-wrap: anywhere;

  p + p {
    margin-top: 14px;
  }

  &::after {
    content: '';
    display: block;
    clear: both;
  }
`;

const formatPublishedDate = (publishedAt) => {
  if (!publishedAt) {
    return DATE_FALLBACK;
  }

  const parsedDate = new Date(publishedAt);

  if (Number.isNaN(parsedDate.getTime())) {
    return DATE_FALLBACK;
  }

  return parsedDate.toLocaleDateString();
};

function Post() {
  const currentPost = useSelector(state => state.posts.post);
  const isLoading = useSelector(state => state.posts.loading);
  const error = useSelector(state => state.posts.error);
  const { colors } = useTheme();
  const [post, setPost] = useState(currentPost);
  const { id: postID } = useParams();

  useEffect(() => {
    if (currentPost?.id === +postID) {
      setPost(currentPost);

      return;
    }

    const fetchData = async () => {
      const response = await fetch(`${BASE_URL}/${postID}`);
      const data = await response.json();

      setPost(data);
    };

    fetchData();
  }, [currentPost, postID]);

  if (isLoading) {
    return <p>Loading post...</p>;
  }

  if (!!error) {
    return <Error message={error} />;
  }

  if (!post) {
    return <Plug text="Post not found." />;
  }

  const previewImage = Array.isArray(post.imagePaths) ? post.imagePaths[0] : null;
  const previewImageSrc = previewImage ? resolveImageUrl(previewImage) : null;
  const publishedDate = formatPublishedDate(
    post.publishedAt ?? post.createdAt ?? post.created_at,
  );
  const authorLabel = post.userID ?? post.userId ?? 'Unknown';
  const bodyParagraphs = String(post.body ?? '')
    .split(/\n+/)
    .map(paragraph => paragraph.trim())
    .filter(Boolean);

  return (
    <PageSection>
      <PostArticle $colors={colors}>
        <PostTitle>{post.title}</PostTitle>
        <PostMeta $colors={colors}>By user #{authorLabel} - {publishedDate}</PostMeta>
        <PostBody $colors={colors}>
          {previewImageSrc && (
            <PostPreview
              src={previewImageSrc}
              alt={`${post.title} preview`}
            />
          )}
          {bodyParagraphs.length ? (
            bodyParagraphs.map((paragraph, index) => (
              <p key={`${post.id ?? 'post'}-paragraph-${index}`}>{paragraph}</p>
            ))
          ) : (
            <p>No content available for this post yet.</p>
          )}
        </PostBody>
      </PostArticle>
    </PageSection>
  );
}

export default Post;
