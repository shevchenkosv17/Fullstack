import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import categories from '../data/categories.json';
import { addPost, clearCurrentPost } from '../slices/postsSlice';
import { generateDummyUUID } from '../utils/utils';

import {
  handlePostImageInput,
  validatePostImages,
  uploadPostImages,
} from '../utils/imageUtils';
import { useTheme } from '../contexts/ThemeContext';

const PageSection = styled.div`
  margin: 0 auto;
  padding: 24px 0;
`;

const PageTitle = styled.h1`
  margin-bottom: 16px;
`;

const AddPostForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${({ $themeMode }) => ($themeMode === 'night' ? '#334155' : '#cbd5e1')};
  background: ${({ $themeMode }) => ($themeMode === 'night' ? '#111827' : '#ffffff')};

  ${({ $isLoading }) => $isLoading && `
    opacity: 0.5;
    pointer-events: none;
    cursor: default;
  `}
`;

const CategoryControl = styled(FormControl)`
  min-width: 160px;
`;

const FileInput = styled.input`
  max-width: 100%;
`;

const ImageHint = styled.p`
  margin: 0;
  color: ${({ $themeMode }) => ($themeMode === 'night' ? '#94a3b8' : '#475569')};
`;

const ImageList = styled.ul`
  margin: 0;
  padding-left: 16px;
  color: ${({ $themeMode }) => ($themeMode === 'night' ? '#e2e8f0' : '#1e293b')};
`;

const ValidationError = styled.p`
  margin: 0;
  color: #fca5a5;
`;

function AddPost() {
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [category, setCategory] = useState('');
  const [postImages, setPostImages] = useState([]);
  const [imageValidationError, setImageValidationError] = useState('');

  const isLoading = useSelector(state => state.posts.loading);
  const newPostID = useSelector(state => state.posts.post?.id);

  const { theme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (newPostID) {
      navigate(`/post/${newPostID}`);
    }

    return () => {
      dispatch(clearCurrentPost());
    };
  }, [newPostID, dispatch, navigate]);

  const handleCategorySelection = (event) => {
    setCategory(event.target.value);
  };

  const handlePostTitleInput = (event) => {
    setPostTitle(event.target.value);
  };

  const handlePostBodyInput = (event) => {
    setPostBody(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const imageValidationErrors = await validatePostImages(postImages);

    if (imageValidationErrors.length > 0) {
      setImageValidationError(imageValidationErrors.join(' '));

      return;
    }

    try {
      const imagePaths = await uploadPostImages(postImages);

      setImageValidationError('');

      dispatch(addPost({
        userID: 1,
        title: postTitle,
        body: postBody,
        category,
        imagePaths,
        uuid: generateDummyUUID(),
      }));
    } catch (error) {
      const message =
        error?.response?.data?.message
        || error.message
        || 'Image upload failed.';

      setImageValidationError(message);
    }
  };

  return (
    <PageSection>
      <PageTitle>Add Post</PageTitle>
      <AddPostForm onSubmit={handleSubmit} $isLoading={isLoading} $themeMode={theme}>
        <TextField
          label="Title"
          name="title"
          value={postTitle}
          onChange={handlePostTitleInput}
          required
        />
        <CategoryControl variant="standard">
          <InputLabel id="category-selector">Category</InputLabel>
          <Select
            labelId="category-selector"
            id="category-selector"
            value={category}
            onChange={handleCategorySelection}
            required
          >
            {categories.cats.map(({ title }) => (
              <MenuItem
                key={title}
                value={title}
              >
                {title}
              </MenuItem>
            ))}
          </Select>
        </CategoryControl>
        <TextField
          name="body"
          id="body"
          label="Body"
          multiline
          minRows={4}
          value={postBody}
          onChange={handlePostBodyInput}
          required
        />
        <FileInput
          id="images"
          type="file"
          name="images"
          accept=".img,.png,image/png"
          multiple
          onChange={(event) => handlePostImageInput(event, setPostImages, setImageValidationError)}
        />
        <ImageHint $themeMode={theme}>
          Upload up to 5 images, 5MB each, dimensions between 100x100 and 2000x2000.
        </ImageHint>
        {postImages.length > 0 && (
          <ImageList $themeMode={theme}>
            {postImages.map((file) => (
              <li key={`${file.name}-${file.lastModified}`}>
                {file.name}
              </li>
            ))}
          </ImageList>
        )}
        {imageValidationError && (
          <ValidationError role="alert">{imageValidationError}</ValidationError>
        )}
        <Button type="submit" variant="contained">Create post</Button>
      </AddPostForm>
    </PageSection>
  );
}

export default AddPost;
