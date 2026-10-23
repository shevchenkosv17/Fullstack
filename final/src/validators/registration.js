import { normalizePhone } from '../utils/utils';
import {
    MIN_TEXT_LENGTH,
    MAX_TEXT_LENGTH,
    EMAIL_REGEX,
} from '../data/constants';

export const validateRegisterForm = (values, errorsHandler) => {
    const nextErrors = {};
    const trimmedFirstName = values.firstName.trim();
    const trimmedSecondName = values.secondName.trim();
    const trimmedPhone = normalizePhone(values.phone.trim());
    const trimmedEmail = values.email.trim();

    if (!trimmedFirstName) {
        nextErrors.firstName = 'Name is required.';
    } else if (trimmedFirstName.length < MIN_TEXT_LENGTH) {
        nextErrors.firstName = `Name must be at least ${MIN_TEXT_LENGTH} characters.`;
    } else if (trimmedFirstName.length > MAX_TEXT_LENGTH) {
        nextErrors.firstName = `Name must be at most ${MAX_TEXT_LENGTH} characters.`;
    }

    if (trimmedSecondName) {
        if (trimmedSecondName.length < MIN_TEXT_LENGTH) {
            nextErrors.secondName = `Second name must be at least ${MIN_TEXT_LENGTH} characters.`;
        } else if (trimmedSecondName.length > MAX_TEXT_LENGTH) {
            nextErrors.secondName = `Second name must be at most ${MAX_TEXT_LENGTH} characters.`;
        }
    }

    if (!trimmedPhone) {
        nextErrors.phone = 'Phone number is required.';
    }

    if (!trimmedEmail) {
        nextErrors.email = 'Email is required.';
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
        nextErrors.email = 'Enter a valid email address.';
    }

    if (!values.password) {
        nextErrors.password = 'Password is required.';
    }

    if (!values.confirmPassword) {
        nextErrors.confirmPassword = 'Please confirm your password.';
    } else if (values.confirmPassword !== values.password) {
        nextErrors.confirmPassword = 'Passwords must match.';
    }

    if (!values.policyConsent) {
        nextErrors.policyConsent = 'You must accept the policy consent.';
    }

    errorsHandler(nextErrors);

    return Object.keys(nextErrors).length === 0;
};