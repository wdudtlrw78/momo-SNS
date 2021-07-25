import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';
import moment from 'moment';
import { Button, Card, Popover, List, Comment, Avatar } from 'antd';
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import PostImages from '../PostImages';
import CommentForm from '../CommentForm';
import PostCardContent from '../PostCardContent';
import { REMOVE_POST_REQUEST } from '../../reducers/post';
import FollowButton from '../FollowButton';
import { PostContainer, PostDate, PostHeader, UserInfoGroup } from './styled';

function PostCard({ post }) {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { removePostLoading } = useSelector((state) => state.post);
  const [liked, setLiked] = useState(false);
  const [CommentFormOpend, setCommentFormOpend] = useState(false);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpend((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const id = useSelector((state) => state.user.me?.id);
  return (
    <PostContainer>
      <PostHeader>
        <UserInfoGroup>
          <Link href={{ pathname: '/user', query: { id: post.User.id } }}>
            <a>
              <Avatar>{post.User.nickname[0]}</Avatar>
              <span style={{ margin: '0 0.5rem 0 1rem', verticalAlign: 'middle' }}>{post.User.nickname}</span>
            </a>
          </Link>
          <PostDate>{moment(post.createdAt).format('YYYY.MM.DD')}</PostDate>
        </UserInfoGroup>
        <div>
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>
                      삭제
                    </Button>
                  </>
                ) : (
                  <>
                    {id && <FollowButton post={post} />}
                    <Button type="danger">신고</Button>
                  </>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined style={{ fontSize: '24px', padding: '0.5rem 1rem', cursor: 'pointer', color: '#888' }} />
          </Popover>
        </div>
      </PostHeader>

      <Card
        cover={post.Images[0] && <PostImages images={post.Images} post={post} />}
        actions={[
          liked && me && me.id ? (
            <HeartTwoTone
              style={{ fontSize: '18px' }}
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onToggleLike}
              title="좋아요"
            />
          ) : (
            <HeartOutlined style={{ fontSize: '18px' }} key="heart" onClick={onToggleLike} title="좋아요" />
          ),
          <MessageOutlined style={{ fontSize: '18px' }} key="comment" onClick={onToggleComment} title="댓글" />,
        ]}
      >
        <Card.Meta description={<PostCardContent postData={post.content} />} />
        <div style={{ padding: '0', color: '#00000073', marginTop: '1rem' }}>{`${
          post.Comments ? post.Comments.length : 0
        }개의 댓글`}</div>
      </Card>
      {CommentFormOpend && (
        <div>
          <CommentForm post={post} />
          <List
            itemLayout="horizontal"
            dataSource={post.Comments || []}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </PostContainer>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    User: PropTypes.shape({
      id: PropTypes.number || PropTypes.string,
      nickname: PropTypes.string,
    }),
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
