import styled from '@emotion/styled';

export const HeadContainer = styled.div`
  width: 100%;
  max-width: 935px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & #search {
    height: 28px;
    padding: 0 4px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    color: #292929;
  }

  & #search:focus {
    outline: none;
    border: 1px solid #008cff;
  }

  & #search::placeholder {
    color: #c7c7c7;
  }

  @media (max-width: 820px) {
    & #search {
      display: none;
    }
  }
`;

export const MainContainer = styled.div`
  width: 100%;
  max-width: 935px;
`;
