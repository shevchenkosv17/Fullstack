import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import { addUser } from '../slices/usersSlice';

import {
  MIN_TEXT_LENGTH,
  MAX_TEXT_LENGTH,
} from '../data/constants';
import { useTheme } from '../contexts/ThemeContext';

import { validateRegisterForm } from '../validators/registration';

const INITIAL_FORM_VALUES = {
  firstName: '',
  secondName: '',
  dateOfBirth: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  policyConsent: false,
};

const PageSection = styled.section`
  margin: 0 auto;
  padding: 24px 0;
`;

const FormContainer = styled(Box)`
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${({ $themeMode }) => ($themeMode === 'night' ? '#334155' : '#cbd5e1')};
  background: ${({ $themeMode }) => ($themeMode === 'night' ? '#111827' : '#ffffff')};
`;

function Register() {
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  const [errors, setErrors] = useState({});
  
  const isLoading = useSelector(state => state.users.loading);
  const { theme } = useTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = event => {
    const { name, value } = event.target;

    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleCheckboxChange = event => {
    const { name, checked } = event.target;

    setFormValues(prevValues => ({
      ...prevValues,
      [name]: checked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateRegisterForm(formValues, setErrors)) {
      return;
    }

    dispatch(addUser({
      firstName: formValues.firstName,
      userName: formValues.firstName,
      secondName: formValues?.secondName ?? null,
      dateOfBirth: formValues.dateOfBirth,
      email: formValues.email,
      password: formValues.password,
      phone: formValues.phone,
    }));

    navigate(`/`);
    toast('Юзер зареєстрований!')

  };

  return (
    <PageSection>
      <FormContainer
        component="form"
        onSubmit={handleSubmit}
        noValidate
        $themeMode={theme}
      >
        <Stack spacing={2.5}>
          <Typography variant="h4" component="h1">
            Register
          </Typography>

          <TextField
            required
            label="Name"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
            slotProps={{
              htmlInput: { minLength: MIN_TEXT_LENGTH, maxLength: MAX_TEXT_LENGTH },
            }}
          />

          <TextField
            label="Second Name"
            name="secondName"
            value={formValues.secondName}
            onChange={handleChange}
            error={Boolean(errors.secondName)}
            helperText={errors.secondName}
            slotProps={{
              htmlInput: { minLength: MIN_TEXT_LENGTH, maxLength: MAX_TEXT_LENGTH },
            }}
          />

          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formValues.dateOfBirth}
            onChange={handleChange}
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{
              '& input::-webkit-datetime-edit-day-field, & input::-webkit-datetime-edit-month-field, & input::-webkit-datetime-edit-year-field, & input::-webkit-datetime-edit-text': {
                color: formValues.dateOfBirth ? 'inherit' : 'transparent',
              },
            }}
          />

          <TextField
            required
            label="Phone Number"
            name="phone"
            type="tel"
            value={formValues.phone}
            onChange={handleChange}
            error={Boolean(errors.phone)}
            helperText={errors.phone || 'Use +380XXXXXXXXX or 0XXXXXXXXX format.'}
          />

          <TextField
            required
            label="Email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />

          <TextField
            required
            label="Password"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />

          <TextField
            required
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formValues.confirmPassword}
            onChange={handleChange}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
          />

          <Box>
            <FormControlLabel
              control={(
                <Checkbox
                  name="policyConsent"
                  checked={formValues.policyConsent}
                  onChange={handleCheckboxChange}
                />
              )}
              label="I agree to the policy consent"
            />
            {errors.policyConsent && (
              <Typography variant="body2" color="error">
                {errors.policyConsent}
              </Typography>
            )}
          </Box>

          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </Stack>
      </FormContainer>
    </PageSection>
  );
}

export default Register;
