import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 24px 0;
`;

const BackLink = styled(Link)`
  color: #2563eb;
`;

function NotFound() {
  return (
    <Wrapper>
      <h2>404 - Page Not Found</h2>
      <p>The page you requested does not exist.</p>
      <BackLink to="/">Go back to Home</BackLink>
    </Wrapper>
  );
}

export default NotFound;
