import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Input } from 'antd';
import { PictureOutlined } from '@ant-design/icons';

import useInput from '../../hooks/useInput';
import { addPost } from '../../reducers/post';

export const PostUpContainer = styled.div`
  margin: -0.5rem 0 1rem 0;
  width: 100%;
  @media (max-width: 820px) {
  }
`;

export const PostUpButtonContainer = styled.div`
  display: flex;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-top: none;
  padding: 1rem;
  justify-content: space-between;
`;

export const PostImageContainer = styled.div`
  max-height: 30vh;
  overflow-x: auto;
  overflow-y: none;
  white-space: nowrap;
  background-color: #f5f6f7;
`;

function PostForm({ setShowPostForm }) {
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const inputFocus = useRef(null);
  const [text, onChangeText, setText] = useInput('');

  const onSubmit = useCallback(() => {
    dispatch(addPost(text));

    setShowPostForm((prev) => !prev);
  }, [text, inputFocus.current]);

  useEffect(() => {
    if (addPostDone) return setText('');
  }, [addPostDone]);

  const imageInput = useRef(null);
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onCloseButton = useCallback(() => {
    setShowPostForm((prev) => !prev);
  }, []);

  return (
    <div>
      <PostUpContainer>
        <Form encType="multipart/fom-data" onFinish={onSubmit}>
          <Input.TextArea
            maxLength={150}
            placeholder="게시글을 작성해 주세요."
            value={text}
            onChange={onChangeText}
            style={{ height: '200px' }}
          />

          <PostUpButtonContainer>
            <input type="file" multiple hidden ref={imageInput} />
            <Button onClick={onClickImageUpload}>
              <PictureOutlined style={{ fontSize: '16px' }} />
              Photo
            </Button>
            <div>
              <Button onClick={onCloseButton}>Cancel</Button>

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
    </div>
  );
}

PostForm.propTypes = {
  setShowPostForm: PropTypes.func.isRequired,
};

export default PostForm;
