import React from 'react';
import { useSelector } from 'react-redux';
import { LogoutOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import ProfileImg from '../ProfileImg';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e6e6e6;
  background: #fff;
`;

export const AvatarGroup = styled.div`
  padding-left: 1rem;
`;

export const InfoGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & .center-line {
    width: 90%;
    border: 1px solid #e6e6e6;
    padding: 0 1rem;
  }
`;

export const TitleAndLogout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 1rem;
  & h2 {
    font-size: 18px;
    margin-bottom: 0;
    color: #292929;
  }
`;

export const PostAndFollow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  & button {
    font-size: 14px;
    padding: 1rem;
    text-align: center;
    line-height: 1.5;
  }

  & button:hover {
    color: #008cff;
    transition: color 0.3s ease-in;
  }
`;

function UserProfile() {
  const { isLoggedIn, user } = useSelector((state) => state.user);

  return (
    <Container>
      <AvatarGroup>{isLoggedIn && <ProfileImg large />}</AvatarGroup>
      <InfoGroup>
        <TitleAndLogout>
          <h2>{isLoggedIn && user.email}</h2>
          <button type="button">
            <LogoutOutlined style={{ padding: '1rem', fontSize: '18px', color: '#65676B' }} />
          </button>
        </TitleAndLogout>

        <PostAndFollow>
          <button key="post" type="button">
            게시물
            <br />0
          </button>
          <button key="follower" type="button">
            팔로워
            <br />0
          </button>
          <button key="follow" type="button">
            팔로우
            <br />0
          </button>
        </PostAndFollow>
      </InfoGroup>
    </Container>
  );
}

export default UserProfile;
