import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const PageSection = styled.section`
  margin: 0 auto;
  padding: 24px 0;
`;

const Title = styled.h2`
  margin-bottom: 12px;
`;

const Description = styled.p`
  color: ${({ $themeMode }) => ($themeMode === 'night' ? '#94a3b8' : '#475569')};
`;

function About() {
  const { theme } = useTheme();

  return (
    <PageSection>
      <Title>About Page</Title>
      <Description $themeMode={theme}>
        Use this page for information about your project.
      </Description>
    </PageSection>
  );
}

export default About;
