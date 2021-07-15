import styled from '@emotion/styled';

export const HeadContainer = styled.div`
  width: 100%;
  max-width: 935px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 480px) {
    & #search {
      display: none;
    }
  }
`;

export const MainContainer = styled.div`
  width: 100%;
  max-width: 935px;
`;
