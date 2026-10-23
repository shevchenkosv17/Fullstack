import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';

import { resolveImageUrl } from '../api';
import { useTheme } from '../contexts/ThemeContext';
import { getCategoryKeyFromPostValue } from '../utils/categoryUtils';

const MAX_BODY_PREVIEW_LENGTH = 200;
const DATE_FALLBACK = 'Date unavailable';

const Container = styled(Paper)`
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  gap: 16px;
  align-items: start;
  border: 1px solid ${({ $themeMode }) => ($themeMode === 'night' ? '#334155' : '#cbd5e1')};
  background: ${({ $themeMode }) => ($themeMode === 'night' ? '#1e293b' : '#ffffff')};
  padding: 12px;
  margin-bottom: 10px;
  color: ${({ $themeMode }) => ($themeMode === 'night' ? '#e2e8f0' : '#0f172a')};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PreviewColumn = styled.div`
  width: 100%;
  min-height: 120px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  display: block;
`;

const PreviewPlaceholder = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 8px;
  border: 1px dashed ${({ $themeMode }) => ($themeMode === 'night' ? '#475569' : '#94a3b8')};
  color: ${({ $themeMode }) => ($themeMode === 'night' ? '#94a3b8' : '#64748b')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

const ContentColumn = styled.div`
  min-width: 0;
`;

const Title = styled(Link)`
  display: inline-block;
  font-size: 24px;
  font-weight: 700;
  text-decoration: none;
  color: ${({ $themeMode }) => ($themeMode === 'night' ? '#e2e8f0' : '#0f172a')};
  opacity: 0.9;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 1;
  }
`;

const Meta = styled.p`
  margin: 4px 0 0;
  color: ${({ $themeMode }) => ($themeMode === 'night' ? '#cbd5e1' : '#334155')};
  font-style: italic;
`;

const Description = styled.p`
  color: ${({ $themeMode }) => ($themeMode === 'night' ? '#e2e8f0' : '#1e293b')};
  margin: 10px 0;
  overflow-wrap: anywhere;
`;

const CategoryContainer = styled.div`
  color: ${({ $themeMode }) => ($themeMode === 'night' ? '#bfdbfe' : '#1d4ed8')};
`;

const CategoryLink = styled(Link)`
  color: inherit;
`;

const trimDescription = (text = '', maxLength = MAX_BODY_PREVIEW_LENGTH) => {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trimEnd()}...`;
};

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

const Card = ({ title, description, author, postID, category, imagePaths, publishedAt }) => {
  const { theme } = useTheme();
  const categoryKey = getCategoryKeyFromPostValue(category);
  const descriptionPreview = trimDescription(description ?? '');
  const postPublishedDate = formatPublishedDate(publishedAt);
  const previewImage = Array.isArray(imagePaths) ? imagePaths[0] : null;
  const previewImageSrc = previewImage ? resolveImageUrl(previewImage) : '';

  return (
    <Container $themeMode={theme}>
      <PreviewColumn>
        {previewImageSrc ? (
          <PreviewImage src={previewImageSrc} alt={`${title} preview`} loading="lazy" />
        ) : (
          <PreviewPlaceholder $themeMode={theme}>No image</PreviewPlaceholder>
        )}
      </PreviewColumn>
      <ContentColumn>
        <Title to={`/post/${postID}`} $themeMode={theme}>{title}</Title>
        <Meta $themeMode={theme}>author #{author} - {postPublishedDate}</Meta>
        <Description $themeMode={theme}>{descriptionPreview}</Description>
        <CategoryContainer $themeMode={theme}>
          <CategoryLink to={`/category/${categoryKey ?? category}`}>{category}</CategoryLink>
        </CategoryContainer>
      </ContentColumn>
    </Container>
  );
};

export default Card;
