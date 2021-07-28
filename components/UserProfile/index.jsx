import React, { useCallback } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Avatar } from 'antd';
import styled from '@emotion/styled';

import { logoutRequestAction } from '../../reducers/user';

export const Container = styled.div`
  width: 100%;
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

export const NicknameAndLogout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 1rem;
`;

export const Nickname = styled.div`
  font-size: 18px;
  margin-bottom: 0;
  color: #292929;

  & button {
    color: #008cff;
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

  @media (max-width: 380px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

function UserProfile() {
  const dispatch = useDispatch();
  const { me, isLoggingOut } = useSelector((state) => state.user);

  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Container>
      <AvatarGroup>
        <Link href="/profile">
          <a>
            <Avatar
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '96px',
                height: '96px',
                fontSize: '24px',
              }}
            >
              {me?.nickname}
            </Avatar>
          </a>
        </Link>
      </AvatarGroup>
      <InfoGroup>
        <NicknameAndLogout>
          <Nickname value={me?.nickname} />

          <Button type="button" onClick={onLogout} loading={isLoggingOut} style={{ margin: '1rem 1rem 0.5rem 0' }}>
            로그아웃
          </Button>
        </NicknameAndLogout>
        <PostAndFollow>
          <button key="post" type="button">
            게시물
            <br />
            {me?.Posts.length}
          </button>
          <Link href="/profile">
            <a>
              <button key="follower" type="button">
                팔로워 <br />
                {me?.Followers.length}
              </button>
            </a>
          </Link>
          <Link href="/profile">
            <a>
              <button key="follow" type="button">
                팔로우 <br />
                {me?.Follows.length}
              </button>
            </a>
          </Link>
        </PostAndFollow>
      </InfoGroup>
    </Container>
  );
}

export default UserProfile;
