import { Link, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import styled from 'styled-components';

import { ControlButton } from './ControlButton';

const SessionInfo = styled(Box)`
  font-size: 0.75rem;
  opacity: 0.75;
  word-break: break-all;
  margin-bottom: 16px;
`;

const MenuContent = styled(Box)`
  padding: 16px;
  width: ${({ $isInline }) => ($isInline ? '100%' : '320px')};
`;

const AuthForm = styled(Box)`
  padding: 16px;
  width: ${({ $isInline }) => ($isInline ? '100%' : '320px')};
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AuthError = styled.p`
  margin: 0;
  color: #b91c1c;
  font-size: 0.8rem;
`;

const RegisterLinkText = styled.p`
  margin: 0;
  font-size: 0.85rem;
  text-align: center;
`;

function AuthControl({
  theme,
  authSession,
  authAnchorEl,
  authError,
  credentials,
  openAuthMenuHandler,
  closeAuthMenuHandler,
  authorizeHandler,
  credentialsChangeHandler,
  logoutHandler,
  registerLinkClickHandler,
  variant = 'menu',
}) {
  const { pathname } = useLocation();
  const isRegistrationPage = pathname === '/register';

  if (variant === 'inline') {
    return authSession ? (
      <MenuContent $isInline>
        <Box sx={{ mb: 1, fontSize: '0.9rem', opacity: 0.85 }}>
          Authorized as: {authSession.email}
        </Box>
        <SessionInfo>
          JWT: {authSession.token}
        </SessionInfo>
        <SessionInfo>
          <Link to="/user">User Page</Link>
        </SessionInfo>
        <Button onClick={logoutHandler} variant="contained" fullWidth>
          Logout
        </Button>
      </MenuContent>
    ) : (
      <AuthForm
        component="form"
        onSubmit={authorizeHandler}
        $isInline
      >
        <TextField
          label="Email"
          name="email"
          type="email"
          value={credentials.email}
          onChange={credentialsChangeHandler}
          size="small"
          autoComplete="email"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={credentials.password}
          onChange={credentialsChangeHandler}
          size="small"
          autoComplete="current-password"
          required
        />
        {authError ? (
          <AuthError>{authError}</AuthError>
        ) : null}
        <Button type="submit" variant="contained">Authorize</Button>
        {!isRegistrationPage ? (
          <RegisterLinkText>
            Do not have an account?{' '}
            <Link to="/register" onClick={registerLinkClickHandler}>
              Register
            </Link>
          </RegisterLinkText>
        ) : null}
      </AuthForm>
    );
  }

  return (
    <>
      <ControlButton
        $themeMode={theme}
        onClick={openAuthMenuHandler}
        startIcon={<AccountCircle />}
      >
        {authSession ? authSession.email : 'Authorize'}
      </ControlButton>

      <Menu
        anchorEl={authAnchorEl}
        open={Boolean(authAnchorEl)}
        onClose={closeAuthMenuHandler}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {authSession ? (
          <MenuContent>
            <Box sx={{ mb: 1, fontSize: '0.9rem', opacity: 0.85 }}>
              Authorized as: {authSession.email}
            </Box>
            <SessionInfo>
              JWT: {authSession.token}
            </SessionInfo>
            <SessionInfo>
              <Link to="/user">User Page</Link>
            </SessionInfo>
            <Button onClick={logoutHandler} variant="contained" fullWidth>
              Logout
            </Button>
          </MenuContent>
        ) : (
          <AuthForm
            component="form"
            onSubmit={authorizeHandler}
          >
            <TextField
              label="Email"
              name="email"
              type="email"
              value={credentials.email}
              onChange={credentialsChangeHandler}
              size="small"
              autoComplete="email"
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={credentialsChangeHandler}
              size="small"
              autoComplete="current-password"
              required
            />
            {authError ? (
              <AuthError>{authError}</AuthError>
            ) : null}
            <Button type="submit" variant="contained">Login</Button>
            {!isRegistrationPage ? (
              <RegisterLinkText>
                Do not have an account?{' '}
                <Link to="/register" onClick={registerLinkClickHandler}>
                  Register
                </Link>
              </RegisterLinkText>
            ) : null}
          </AuthForm>
        )}
      </Menu>
    </>
  );
}

export default AuthControl;
