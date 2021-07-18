import React, { useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Input } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import AppLayouts from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { addPost } from '../reducers/post';

export const PostUpContainer = styled.div`
  margin-top: 4rem;

  @media (max-width: 820px) {
    margin: 4rem 1rem 0 1rem;
  }
`;

export const PostUpHeader = styled.div`
  background: #008cff;
  padding: 1rem 0;
  font-size: 24px;
  font-family: Roboto;
  color: #fff;
  border: 1px solid #d9d9d9;
  border-bottom: none;
  text-align: center;
`;

export const PostUpInputContainer = styled.div``;

export const PostUpButtonContainer = styled.div`
  display: flex;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-top: none;
  padding: 1rem;
  justify-content: space-between;
`;

export const PostImageContainer = styled.div``;

function PostUp() {
  const { imagePaths, postAdded } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const imageInput = useRef(null);
  const inputFocus = useRef(null);
  const [text, onChangeText, setText] = useInput('');

  const onSubmit = useCallback(() => {
    dispatch(addPost);
  }, [inputFocus.current]);

  useEffect(() => {
    if (postAdded) {
      setText('');
      Router.push('/');
    }
  }, [postAdded]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <AppLayouts>
      <PostUpContainer>
        <PostUpHeader>Create Post</PostUpHeader>
        <Form encType="multipart/fom-data" onFinish={onSubmit}>
          <PostUpInputContainer>
            <Input.TextArea
              maxLength={300}
              placeholder="게시글을 작성해 주세요."
              value={text}
              onChange={onChangeText}
              style={{ width: '100vw', height: '200px' }}
            />
          </PostUpInputContainer>
          <PostUpButtonContainer>
            <input type="file" multiple hidden ref={imageInput} />
            <Button onClick={onClickImageUpload}>
              <PictureOutlined style={{ fontSize: '16px' }} />
              Photo
            </Button>
            <div>
              <Link href="/">
                <a>
                  <Button>Cancel</Button>
                </a>
              </Link>
              <Button style={{ marginLeft: '0.5rem' }} type="primary" htmlType="submit">
                Post
              </Button>
            </div>
          </PostUpButtonContainer>
          <PostImageContainer>
            {imagePaths.map((v) => (
              <div key={v} style={{ display: 'inline-block' }}>
                <img src={v} style={{ width: '200px' }} alt={v} />
                <div>
                  <Button>제거</Button>
                </div>
              </div>
            ))}
          </PostImageContainer>
        </Form>
      </PostUpContainer>
    </AppLayouts>
  );
}

export default PostUp;
