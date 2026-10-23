import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';

const PagerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

function Pager({ page, pageCount, onPageChange }) {
  if (pageCount <= 1) {
    return null;
  }

  return (
    <PagerContainer>
      <Pagination
        count={pageCount}
        page={page}
        onChange={(_, value) => onPageChange(value)}
        color="primary"
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </PagerContainer>
  );
}

export default Pager;
