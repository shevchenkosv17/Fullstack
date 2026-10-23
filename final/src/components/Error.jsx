import Alert from '@mui/material/Alert';

import styled from 'styled-components';

const MessageWrapper = styled(Alert)`
  margin: 16px auto;
  font-size: 1rem;
`;

export default function Error({ message = 'Unknown error' }) {
  return (
    <MessageWrapper severity="error" variant="outlined">
      ERROR: {message}
    </MessageWrapper>
  );
}
