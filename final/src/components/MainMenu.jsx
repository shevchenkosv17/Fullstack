import { NavLink } from 'react-router-dom';

import { useLanguage } from '../contexts/LanguageContext';

import Button from '@mui/material/Button';

import styled from 'styled-components';
import { MEDIA_QUERIES } from '../styles/breakpoints';

const MenuContainer = styled.div`
  flex-grow: 1;
  min-width: 0;
`;

const Nav = styled.nav`
  display: flex;
  flex-wrap: nowrap;
  gap: 12px;

  @media ${MEDIA_QUERIES.phone} {
    gap: 8px;
  }
`;

const MenuButton = styled(Button).attrs({
  component: NavLink,
})`
  && {
  padding: 8px 12px;
  border: 1px solid ${({ $themeMode }) => ($themeMode === 'night' ? '#334155' : '#cbd5e1')};
  border-radius: 8px;
  color: ${({ $themeMode }) => ($themeMode === 'night' ? '#e2e8f0' : '#1e293b')};
  text-decoration: none;
  transition: all 0.2s ease;
  min-width: auto;
  }

  @media ${MEDIA_QUERIES.phone} {
    && {
      padding: 6px 10px;
      font-size: 0.85rem;
      white-space: nowrap;
    }
  }

  &:hover {
    background: ${({ $themeMode }) => ($themeMode === 'night' ? '#1e293b' : '#e2e8f0')};
  }

  &&.active {
    border-color: #2563eb;
    background: ${({ $themeMode }) => ($themeMode === 'night' ? '#1d4ed8' : '#dbeafe')};
    color: ${({ $themeMode }) => ($themeMode === 'night' ? '#f8fafc' : '#1d4ed8')};
  }
`;

export default function MainMenu({ $themeMode }) {
  const { t } = useLanguage();

  return (
    <MenuContainer>
      <Nav>
        <MenuButton to="/" end $themeMode={$themeMode}>
          {t('home')}
        </MenuButton>
        <MenuButton to="/about" $themeMode={$themeMode}>
          {t('about')}
        </MenuButton>
        <MenuButton to="/contact" $themeMode={$themeMode}>
          {t('contact')}
        </MenuButton>
        <MenuButton to="/add-post" $themeMode={$themeMode}>
          {t('addPost')}
        </MenuButton>
      </Nav>
    </MenuContainer>
  );
}
