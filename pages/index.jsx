import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'antd';
import { useInView } from 'react-intersection-observer';
import AppLayouts from '../components/AppLayout';
import UserProfile from '../components/UserProfile';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import PostForm from '../components/PostForm';
import LoginForm from '../components/LoginForm';

export const MainContainer = styled.div`
  width: 100%;
  max-width: 935px;
  display: flex;
  justify-content: center;
  align-items: start;

  @media (max-width: 820px) {
    flex-direction: column-reverse;
    padding: 0 1rem;
  }
`;

export const ContentContainer = styled.div`
  flex: 6;
  width: 100%;
  margin: 0 0 1rem 0;
`;

export const AddPostForm = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
  background: #fff;
  border: 1px solid #008cff;
  border-radius: 8px;

  @media (max-width: 820px) {
    margin: 1rem 0;
  }
`;

export const Container = styled.div`
  width: 100%;
  padding: 0 0.5rem;
`;

export const AddPost = styled.div`
  width: 100%;
  height: 36px;
  background-color: #f0f2f5;
  border-radius: 24px;
  cursor: pointer;

  &:hover {
    background-color: #e4e6eb;
    transition: background 0.3s ease-in;
  }

  p {
    display: flex;
    align-items: center;
    height: 36px;
    color: #65676b;
    margin-left: 0.5rem;
  }
`;

export const SiderContainer = styled.div`
  width: 100%;
  flex: 4;

  padding-left: 1rem;

  @media (max-width: 820px) {
    padding: 0;
  }
`;

function Home() {
  const dispatch = useDispatch();
  const [showPostForm, setShowPostForm] = useState(false);
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  useEffect(() => {
    if (inView && hasMorePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch({
        type: LOAD_POSTS_REQUEST,
        lastId,
      });
    }
  }, [inView, hasMorePosts, loadPostsLoading, mainPosts]);

  const onClickAddPost = useCallback(() => {
    setShowPostForm((prev) => !prev);
  }, []);

  return (
    <AppLayouts>
      <MainContainer>
        <ContentContainer>
          {me && (
            <AddPostForm>
              <Avatar>{me?.nickname[0]}</Avatar>
              <Container>
                <AddPost onClick={onClickAddPost}>
                  <p>{`${me?.nickname || ''} 님, 무슨 생각을 하고 계신가요?`}</p>
                </AddPost>
              </Container>
            </AddPostForm>
          )}
          {me && showPostForm ? <PostForm setShowPostForm={setShowPostForm} /> : null}
          {mainPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          <div ref={hasMorePosts && !loadPostsLoading ? ref : undefined} />
        </ContentContainer>
        <SiderContainer>{me ? <UserProfile /> : <LoginForm />}</SiderContainer>
      </MainContainer>
    </AppLayouts>
  );
}

export default Home;
