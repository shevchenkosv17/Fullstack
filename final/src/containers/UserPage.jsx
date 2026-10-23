import { useSelector } from 'react-redux';

import { Box, Paper, Stack, Typography } from '@mui/material';
import styled from 'styled-components';

import { Loader, Error, Plug } from '../components';

const PageSection = styled.section`
  margin: 0 auto;
  padding: 24px 0;
`;

const UserPaper = styled(Paper)`
  padding: 16px;
`;

function UserPage() {
  const user = useSelector(state => state.users.user);
  const isLoading = useSelector(state => state.users.loading);
  const error = useSelector(state => state.users.error);

  if (isLoading) {
    return <Loader />;
  }

  if (!!error) {
    return <Error message={error} />;
  }

  if (!user) {
    return <Plug text="User data is not available." />;
  }

  return (
    <PageSection>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        User Info
      </Typography>

      <UserPaper variant="outlined">
        <Stack spacing={1.5}>
          {Object.entries(user).map(([fieldName, fieldValue]) => (
            <Box
              key={fieldName}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '180px 1fr' },
                gap: 1,
                borderBottom: '1px solid',
                borderColor: 'divider',
                pb: 1,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                {fieldName}
              </Typography>
              <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                {String(fieldValue)}
              </Typography>
            </Box>
          ))}
        </Stack>
      </UserPaper>
    </PageSection>
  );
}

export default UserPage;
