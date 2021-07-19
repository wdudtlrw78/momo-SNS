import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Link from 'next/link';
import moment from 'moment';
import { Button, Card, Popover, List, Comment } from 'antd';
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import ProfileImg from '../ProfileImg';
import PostImages from '../PostImages';
import CommentForm from '../CommentForm';

export const PostContainer = styled.div`
  margin-bottom: 1rem;
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border: 1px solid #e6e6e6;
  border-bottom: none;
  padding: 0.5rem 0 0.5rem 1rem;
`;

export const UserInfoGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const PostDate = styled.div`
  font-family: Roboto;
  color: #888;
`;

export const PopoverContainer = styled.div``;

function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [CommentFormOpend, setCommentFormOpend] = useState(false);
  const id = useSelector((state) => state.user.me?.id);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpend((prev) => !prev);
  }, []);

  return (
    <PostContainer>
      <PostHeader>
        <UserInfoGroup>
          <Link href={{ pathname: '/user', query: { id: post.User.id } }}>
            <a>
              <ProfileImg />
              <span style={{ margin: '0 0.5rem 0 1rem', verticalAlign: 'middle' }}>{post.User.nickname}</span>
            </a>
          </Link>
          <PostDate>{moment('YYYYMMDD, h:mm:ss').fromNow()}</PostDate>
        </UserInfoGroup>
        <PopoverContainer>
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger">삭제</Button>
                  </>
                ) : (
                  <>
                    <Button>팔로우</Button>
                    <Button type="danger">신고</Button>
                  </>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined style={{ fontSize: '24px', padding: '0.5rem 1rem', cursor: 'pointer', color: '#888' }} />
          </Popover>
        </PopoverContainer>
      </PostHeader>

      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined style={{ fontSize: '18px' }} key="retweet" />,
          liked ? (
            <HeartTwoTone style={{ fontSize: '18px' }} twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
          ) : (
            <HeartOutlined style={{ fontSize: '18px' }} key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined style={{ fontSize: '18px' }} key="comment" onClick={onToggleComment} />,
        ]}
      >
        <div>{`${post.Comments.length}개의 댓글`}</div>
      </Card>
      {CommentFormOpend && (
        <div>
          <CommentForm post={post} />
          <List
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment author={item.User.nickname} avatar={<ProfileImg />} content={item.content} />
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
    id: PropTypes.number,
    User: PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string,
    }),
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.shape({
      User: PropTypes.shape({
        nickname: PropTypes.string,
      }),
      content: PropTypes.string,
    }),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
