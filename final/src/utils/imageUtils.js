import axios from 'axios';
import { UPLOAD_IMAGES_URL } from '../api';

import {
    MAX_IMAGE_COUNT,
    MAX_IMAGE_SIZE_BYTES,
    MIN_IMAGE_DIMENSION,
    MAX_IMAGE_DIMENSION,
    ALLOWED_IMAGE_EXTENSIONS,
    ALLOWED_IMAGE_MIME_TYPES,
} from '../data/constants';


export const getFileExtension = (fileName = '') => {
    const dotIndex = fileName.lastIndexOf('.');

    return dotIndex === -1 ? '' : fileName.slice(dotIndex).toLowerCase();
};

export const isAllowedImageFormat = (file) => {
    const extension = getFileExtension(file.name);

    return ALLOWED_IMAGE_EXTENSIONS.includes(extension) || ALLOWED_IMAGE_MIME_TYPES.includes(file.type);
};

export const getImageDimensions = (file) => new Promise((resolve, reject) => {
    const image = new Image();
    const imageURL = URL.createObjectURL(file);

    image.onload = () => {
        resolve({ width: image.width, height: image.height });
        URL.revokeObjectURL(imageURL);
    };

    image.onerror = () => {
        URL.revokeObjectURL(imageURL);
        reject(new Error(`Unable to read dimensions for "${file.name}".`));
    };

    image.src = imageURL;
});

export const handlePostImageInput = (event, setImageHandler, setImageValidationErrorHandler) => {
    const selectedFiles = Array.from(event.target.files ?? []);

    if (selectedFiles.length > MAX_IMAGE_COUNT) {
        setImageHandler(selectedFiles.slice(0, MAX_IMAGE_COUNT));
        setImageValidationErrorHandler(`Only ${MAX_IMAGE_COUNT} images are allowed. Keeping the first ${MAX_IMAGE_COUNT}.`);
        return;
    }

    setImageHandler(selectedFiles);
    setImageValidationErrorHandler('');
};

export const validatePostImages = async (postImages) => {
    const errors = [];

    if (postImages.length > MAX_IMAGE_COUNT) {
        errors.push(`Please upload up to ${MAX_IMAGE_COUNT} images.`);
    }

    for (const file of postImages) {
        if (!isAllowedImageFormat(file)) {
            errors.push(`"${file.name}" has unsupported format. Allowed: img, png.`);
        }

        if (file.size > MAX_IMAGE_SIZE_BYTES) {
            errors.push(`"${file.name}" is larger than 5MB.`);
        }

        try {
            const { width, height } = await getImageDimensions(file);
            const hasValidDimensions =
                width >= MIN_IMAGE_DIMENSION &&
                height >= MIN_IMAGE_DIMENSION &&
                width <= MAX_IMAGE_DIMENSION &&
                height <= MAX_IMAGE_DIMENSION;

            if (!hasValidDimensions) {
                errors.push(
                    `"${file.name}" must be between ${MIN_IMAGE_DIMENSION}x${MIN_IMAGE_DIMENSION} and ${MAX_IMAGE_DIMENSION}x${MAX_IMAGE_DIMENSION}.`,
                );
            }
        } catch (error) {
            errors.push(error.message);
        }
    }

    return errors;
};

export const uploadPostImages = async (postImages) => {
    if (postImages.length === 0) {
        return [];
    }

    const formData = new FormData();
    postImages.forEach((imageFile) => {
        formData.append('images', imageFile);
    });

    const response = await axios.post(UPLOAD_IMAGES_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data?.imagePaths ?? [];
};

