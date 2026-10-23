import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import styled from 'styled-components';

const LoaderWrapper = styled(Box)`
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 9999;
`;

export default function Loader() {
  return (
    <LoaderWrapper>
      <CircularProgress aria-label="Loading..." />
    </LoaderWrapper>
  );
}
