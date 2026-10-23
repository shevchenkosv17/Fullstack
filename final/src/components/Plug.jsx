import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const PlugWrapper = styled.div`
  margin: 20px auto;
  padding: 24px;
  text-align: center;
  border: 1px dashed ${({ $themeMode }) => ($themeMode === 'night' ? '#334155' : '#cbd5e1')};
  border-radius: 12px;
  font-size: 1.2rem;
`;

const PlugText = styled.p`
  color: ${({ $themeMode }) => ($themeMode === 'night' ? '#cbd5e1' : '#334155')};
`;

export default function Plug({ text }) {
  const { theme } = useTheme();

  return (
    <PlugWrapper $themeMode={theme}>
      <PlugText $themeMode={theme}>{text}</PlugText>
    </PlugWrapper>
  );
}
