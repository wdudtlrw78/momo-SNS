import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { EditOutlined, LogoutOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import styled from '@emotion/styled';
import ProfileImg from '../ProfileImg';
import NicknameEditForm from '../NicknameEditForm';
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
`;

function UserProfile() {
  const dispatch = useDispatch();
  const { me, isLoggedIn, isLoggingOut } = useSelector((state) => state.user);
  const [nickname, setNickname] = useState(true);
  const [showNicknameEditForm, setShowNicknameEditForm] = useState(false);

  const onClickShowNicknameEditForm = useCallback(() => {
    setNickname(false);
    setShowNicknameEditForm(true);
  }, []);

  const router = useRouter();
  const isProfilePage = router.pathname === '/profile';

  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Container>
      <AvatarGroup>
        <Link href="/profile">
          <a>{isLoggedIn && <ProfileImg large />}</a>
        </Link>
      </AvatarGroup>
      <InfoGroup>
        <NicknameAndLogout>
          {nickname && (
            <Nickname value={nickname}>
              {isLoggedIn && me.nickname}{' '}
              {isProfilePage && (
                <button type="button" onClick={onClickShowNicknameEditForm}>
                  <EditOutlined />
                </button>
              )}
            </Nickname>
          )}

          {showNicknameEditForm && (
            <NicknameEditForm
              value={showNicknameEditForm}
              setNickname={setNickname}
              setShowNicknameEditForm={setShowNicknameEditForm}
            />
          )}

          <Button
            type="button"
            onClick={onLogout}
            loading={isLoggingOut}
            style={{ margin: '1rem 0 0.5rem 0', border: 'none' }}
          >
            <LogoutOutlined style={{ fontSize: '18px', color: '#65676B' }} title="로그아웃" />
          </Button>
        </NicknameAndLogout>
        <PostAndFollow>
          <button key="post" type="button">
            게시물
            <br />0
          </button>
          <button key="follower" type="button">
            <Link href="/profile">
              <a>팔로워</a>
            </Link>
            <br />0
          </button>
          <button key="follow" type="button">
            <Link href="/profile">
              <a>팔로우</a>
            </Link>
            <br />0
          </button>
        </PostAndFollow>
      </InfoGroup>
    </Container>
  );
}

export default UserProfile;
