import { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageControls from './controls/LanguageControls';
import ThemeControl from './controls/ThemeControl';
import AuthControl from './controls/AuthControl';

import styled from 'styled-components';
import { BREAKPOINTS, MEDIA_QUERIES } from '../styles/breakpoints';

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ControlsDesktop = styled.div`
  display: flex;

  @media ${MEDIA_QUERIES.tablet} {
    display: none;
  }
`;

const ControlsMobile = styled.div`
  display: none;
  margin-left: 4px;

  @media ${MEDIA_QUERIES.tablet} {
    display: flex;
    align-items: center;
  }
`;

const DrawerBody = styled(Box)`
  padding: 16px;
  width: 100%;
`;

const DrawerHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

const DrawerControlsContainer = styled(ControlsContainer)`
  flex-direction: column;
  align-items: stretch;
`;

const DrawerTopControls = styled(ControlsContainer)`
  justify-content: space-between;
`;

const HamburgerButton = styled(IconButton)`
  border: 1px solid ${({ $themeMode }) => ($themeMode === 'night' ? '#334155' : '#cbd5e1')};
  color: ${({ $themeMode }) => ($themeMode === 'night' ? '#e2e8f0' : '#1e293b')};
`;

export default function Controls({
  openAuthMenuHandler,
  authSession,
  authAnchorEl,
  authError,
  closeAuthMenuHandler,
  authorizeHandler,
  logoutHandler,
  credentials,
  credentialsChangeHandler,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const isTabletAndBelow = useMediaQuery(`(max-width: ${BREAKPOINTS.tablet})`);

  useEffect(() => {
    if (!isTabletAndBelow) {
      setIsDrawerOpen(false);
    }
  }, [isTabletAndBelow]);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleLanguageChange = (nextLanguage) => {
    changeLanguage(nextLanguage);
    setIsDrawerOpen(false);
  };

  const handleThemeChange = () => {
    toggleTheme();
    setIsDrawerOpen(false);
  };

  return (
    <>
      <ControlsDesktop>
        <ControlsContainer>
          <LanguageControls
            theme={theme}
            language={language}
            changeLanguage={changeLanguage}
          />
          <ThemeControl theme={theme} toggleTheme={toggleTheme} />
          <AuthControl
            theme={theme}
            authSession={authSession}
            authAnchorEl={authAnchorEl}
            authError={authError}
            closeAuthMenuHandler={closeAuthMenuHandler}
            authorizeHandler={authorizeHandler}
            logoutHandler={logoutHandler}
            credentials={credentials}
            credentialsChangeHandler={credentialsChangeHandler}
            openAuthMenuHandler={openAuthMenuHandler}
            registerLinkClickHandler={closeAuthMenuHandler}
          />
        </ControlsContainer>
      </ControlsDesktop>

      <ControlsMobile>
        <HamburgerButton $themeMode={theme} onClick={openDrawer} aria-label="open controls menu">
          <MenuIcon />
        </HamburgerButton>
      </ControlsMobile>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            width: '75vw',
            backgroundColor: theme === 'night' ? '#0f172a' : '#ffffff',
            color: theme === 'night' ? '#e2e8f0' : '#1e293b',
            borderLeft: `1px solid ${theme === 'night' ? '#334155' : '#cbd5e1'}`,
          },
        }}
      >
        <DrawerBody>
          <DrawerHeader>
            <IconButton
              onClick={closeDrawer}
              aria-label="close controls menu"
              sx={{ color: 'inherit' }}
            >
              <CloseIcon />
            </IconButton>
          </DrawerHeader>

          <DrawerControlsContainer>
            <DrawerTopControls>
              <LanguageControls
                theme={theme}
                language={language}
                changeLanguage={handleLanguageChange}
              />
              <ThemeControl theme={theme} toggleTheme={handleThemeChange} />
            </DrawerTopControls>
            <AuthControl
              theme={theme}
              authSession={authSession}
              authAnchorEl={authAnchorEl}
              authError={authError}
              closeAuthMenuHandler={closeAuthMenuHandler}
              authorizeHandler={authorizeHandler}
              logoutHandler={logoutHandler}
              credentials={credentials}
              credentialsChangeHandler={credentialsChangeHandler}
              openAuthMenuHandler={openAuthMenuHandler}
              registerLinkClickHandler={closeDrawer}
              variant="inline"
            />
          </DrawerControlsContainer>
        </DrawerBody>
      </Drawer>
    </>
  );
}
