import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../../reducers/post';

function CommentForm({ post }) {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);

  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  useEffect(() => {
    // 게시글 올렸는데 서버에서 문제가 발생하면 setText로 지워버리는 현상이 발생해서
    // addCommentDone 상태일 때 지워야한다.
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },
    });
  }, [commentText, id]);
  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0 }}>
        <Input.TextArea placeholder="댓글달기..." value={commentText} onChange={onChangeCommentText} rows={4} />
        <Button type="primary" htmlType="submit" style={{ float: 'right' }} loading={addCommentLoading}>
          Post
        </Button>
      </Form.Item>
    </Form>
  );
}

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
