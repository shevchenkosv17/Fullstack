import styled from 'styled-components';

import logo from '../assets/logo.svg';
import logoMark from '../assets/logo-mark.svg';
import { useTheme } from '../contexts/ThemeContext';
import { MEDIA_QUERIES } from '../styles/breakpoints';

const StyledHeaderLogo = styled.span`
  display: block;
  height: 28px;
  width: calc(28px * 518 / 98);
  margin-right: 16px;
  flex-shrink: 0;
  background-color: ${({ $color }) => $color};
  -webkit-mask-image: url(${logo});
  mask-image: url(${logo});
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: left center;
  mask-position: left center;
  -webkit-mask-size: contain;
  mask-size: contain;

  @media ${MEDIA_QUERIES.tablet} {
    width: calc(28px * 64 / 98);
    -webkit-mask-image: url(${logoMark});
    mask-image: url(${logoMark});
  }
`;

export default function HeaderLogo() {
  const { colors } = useTheme();

  return (
    <StyledHeaderLogo
      $color={colors.textPrimary}
      role="img"
      aria-label="devnotes logo"
    />
  );
}
