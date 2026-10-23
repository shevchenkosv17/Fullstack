import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import HeaderLogo from './HeaderLogo';
import { BREAKPOINTS, MEDIA_QUERIES } from '../styles/breakpoints';

const FooterRoot = styled.footer`
  margin-top: 20px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0 auto 0 50%;
    width: 100%;
    transform: translateX(-50%);
    border-top: 1px solid ${({ $colors }) => $colors.border};
    background: ${({ $colors }) => $colors.surfaceAlt};
    pointer-events: none;
    z-index: 0;
  }
`;

const FooterInner = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  width: 100%;
  max-width: ${BREAKPOINTS.desktop};
  margin: 0 auto;
  padding: 16px 20px;
  padding-bottom: 25px;
  align-items: flex-start;
  padding-top: 25px;

  @media ${MEDIA_QUERIES.tablet} {
    max-width: ${BREAKPOINTS.tablet};
    padding: 14px 16px;
    
  }

  @media ${MEDIA_QUERIES.phone} {
    max-width: ${BREAKPOINTS.phone};
    padding: 12px;
  }
`;

const FooterMenu = styled.nav`
  flex: 1;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FooterLink = styled(NavLink)`
  width: fit-content;
  color: ${({ $colors }) => $colors.textSecondary};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ $colors }) => $colors.textPrimary};
    text-decoration: underline;
  }

  &.active {
    color: ${({ $colors }) => $colors.accent};
    font-weight: 600;
  }
`;

const Copyright = styled.small`
  margin-left: auto;
  color: ${({ $colors }) => $colors.textSecondary};

  @media ${MEDIA_QUERIES.phone} {
    width: 100%;
    margin-left: 0;
  }
`;

export default function Footer() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <FooterRoot $colors={colors}>
      <FooterInner>
        <HeaderLogo />
        <FooterMenu>
          <FooterLink to="/" end $colors={colors}>
            {t('home')}
          </FooterLink>
          <FooterLink to="/about" $colors={colors}>
            {t('about')}
          </FooterLink>
          <FooterLink to="/contact" $colors={colors}>
            {t('contact')}
          </FooterLink>
          <FooterLink to="/add-post" $colors={colors}>
            {t('addPost')}
          </FooterLink>
        </FooterMenu>
        <Copyright $colors={colors}>
          &copy; {currentYear} DevNotes. All rights reserved.
        </Copyright>
      </FooterInner>
    </FooterRoot>
  );
}
