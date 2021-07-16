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

export const AddPostButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border: 1px solid #292929;
  border-radius: 50%;
  margin-right: 16px;
  @media (min-width: 820px) {
    display: none;
  }

  &:hover {
    background: #008cff;
    transition: background 0.3s ease-in;

    & .plus {
      color: #fff;
    }
  }
`;

export const MainContainer = styled.div`
  width: 100%;
  max-width: 935px;
`;
