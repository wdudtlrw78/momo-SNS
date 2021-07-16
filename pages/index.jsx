import React from 'react';
import styled from '@emotion/styled';
import AppLayouts from '../components/AppLayout';
import UserProfile from '../components/UserProfile';
import PostCard from '../components/PostCard';
import Link from 'next/link';
import ProfileImg from '../components/ProfileImg';
import { useSelector } from 'react-redux';

export const MainContainer = styled.div`
  width: 100%;
  max-width: 935px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 820px) {
    flex-direction: column-reverse;
    padding: 0 1rem;
  }
`;

export const ContentContainer = styled.div`
  flex: 6;
  width: 100%;
  margin: 1rem 0;
`;

export const AddPostForm = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
`;

export const Container = styled.div`
  width: 100%;
  padding: 0 0.5rem;
`;

export const AddPost = styled.button`
  width: 100%;
  height: 36px;
  background-color: #f0f2f5;
  border-radius: 24px;

  &:hover {
    background: #e4e6eb;
    transition: background 0.3s ease-in;
  }

  & p {
    display: flex;
    align-items: center;
    height: 36px;
    color: #65676b;
  }
`;

export const SiderContainer = styled.div`
  flex: 4;
  padding-left: 1rem;

  @media (max-width: 820px) {
    padding: 0;
  }
`;

function Home() {
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <AppLayouts>
      <MainContainer>
        <ContentContainer>
          <AddPostForm>
            {isLoggedIn && (
              <Link href="/profile">
                <a>
                  <ProfileImg />
                </a>
              </Link>
            )}
            <Container>
              <AddPost>
                <Link href="/postup">
                  <a>
                    <p>님, 무슨 생각을 하고 계신가요?</p>
                  </a>
                </Link>
              </AddPost>
            </Container>
          </AddPostForm>

          <PostCard />
        </ContentContainer>
        <SiderContainer>
          <UserProfile />
        </SiderContainer>
      </MainContainer>
    </AppLayouts>
  );
}

export default Home;
