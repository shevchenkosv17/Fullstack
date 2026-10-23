export const API_ORIGIN = 'http://localhost:3001';
export const API_FILE_SERVER = 'http://localhost:3009';

export const BASE_URL = `${API_FILE_SERVER}/posts`;
export const USERS_URL = `${API_ORIGIN}/users`;
export const UPLOAD_IMAGES_URL = `${API_FILE_SERVER}/upload-images`;

export const resolveImageUrl = (imagePath = '') => {
  if (!imagePath) {
    return '';
  }

  if (imagePath.startsWith('data:')) {
    return imagePath;
  }

  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  return `${API_FILE_SERVER}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};
