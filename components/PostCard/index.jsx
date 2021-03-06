import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import moment from 'moment';
import { Button, Card, Popover, List, Comment, Avatar, Modal } from 'antd';
import { CheckCircleOutlined, EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import PostImages from '../PostImages';
import CommentForm from '../CommentForm';
import PostCardContent from '../PostCardContent';
import { REMOVE_CUTOFF_POSTS_REQUEST, REMOVE_POST_REQUEST, UPDATE_POST_REQUEST } from '../../reducers/post';
import FollowButton from '../FollowButton';
import { PostContainer, PostDate, PostHeader, UserInfoGroup } from './styled';
import { UNFOLLOW_REQUEST } from '../../reducers/user';

function PostCard({ post }) {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { removePostLoading } = useSelector((state) => state.post);
  const [liked, setLiked] = useState(false);
  const [CommentFormOpend, setCommentFormOpend] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [isIDontReportModalVisible, setIsIDontReportModalVisible] = useState(false);

  const id = useSelector((state) => state.user.me?.id);

  const onClickUpdate = useCallback(() => {
    setEditMode(true);
  }, []);

  const onCancelUpdate = useCallback(() => {
    setEditMode(false);
  }, []);

  const onChangePost = useCallback(
    (editText) => () => {
      dispatch({
        type: UPDATE_POST_REQUEST,
        data: {
          PostId: post.id,
          content: editText,
        },
      });
    },
    [post],
  );

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

  const isReportUnfollowUser = me?.Follows.find((v) => v.nickname === post.User.nickname);

  const onReportUnFollow = useCallback(() => {
    if (isReportUnfollowUser) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.nickname,
      });
      Modal.success({
        content: '????????? ????????? ?????????????????????.',
        okText: '??????',
      });
      setIsIDontReportModalVisible(false);
    } else {
      Modal.warning({
        content: '????????? ????????? ????????????.',
        okText: '??????',
      });
    }
    setIsIDontReportModalVisible(false);
  }, [isReportUnfollowUser]);

  const onReportCutOff = useCallback(() => {
    Modal.success({
      title: '????????? ?????????????????????.',
      okText: '??????',
    });
    dispatch({
      type: REMOVE_CUTOFF_POSTS_REQUEST,
      data: {
        UserId: post.User.id,
      },
    });

    if (isReportUnfollowUser) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.nickname,
      });
    }
  }, [isReportUnfollowUser]);

  const showReportModal = useCallback(() => {
    if (!(me && me.id)) {
      alert('???????????? ???????????????.');
      return;
    }
    setIsReportModalVisible(true);
  }, [me && me.id]);

  const handleOk = () => {
    setIsReportModalVisible(false);
    setIsIDontReportModalVisible(false);
  };

  const handleCancel = useCallback(() => {
    setIsReportModalVisible(false);
    setIsIDontReportModalVisible(false);
  }, []);

  function showJunkMailReportModal() {
    setIsReportModalVisible(false);
    Modal.success({
      content: '??????????????? ???????????????',
      okText: '??????',
    });
  }

  function showIDontLikeReportMidal() {
    setIsIDontReportModalVisible(true);
    setIsReportModalVisible(false);
  }

  return (
    <PostContainer>
      <PostHeader>
        <UserInfoGroup>
          <Link href={{ pathname: '/user', query: { id: post.User.id } }} prefetch={false}>
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
                    <Button onClick={onClickUpdate}>??????</Button>
                    <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>
                      ??????
                    </Button>
                  </>
                ) : (
                  <>
                    <Button type="danger" onClick={showReportModal}>
                      ??????
                    </Button>
                    <Modal
                      className="report-modal"
                      title="??????"
                      visible={isReportModalVisible || isIDontReportModalVisible}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      zIndex={2000}
                    >
                      {isReportModalVisible && (
                        <>
                          <p className="report-modal__title">??? ???????????? ???????????? ??????</p>
                          <p onClick={showJunkMailReportModal}>??????</p>
                          <p onClick={showIDontLikeReportMidal}>????????? ?????? ????????????.</p>
                        </>
                      )}
                      {isIDontReportModalVisible && (
                        <>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <CheckCircleOutlined style={{ fontSize: '48px', color: '#58c322' }} />
                            <p style={{ fontSize: '18px', color: '#292929' }}>??? ????????? ?????? ?????? ?????????????</p>
                          </div>
                          <div>
                            <p
                              style={{
                                margin: 0,
                                marginTop: '1rem',
                                padding: '0.5rem',
                                color: 'red',
                                cursor: 'pointer',
                              }}
                              onClick={onReportCutOff}
                            >
                              {post.User.nickname}??? ??????
                            </p>
                            <p
                              style={{ padding: '0.5rem', cursor: 'pointer', color: '#292929' }}
                              onClick={onReportUnFollow}
                            >
                              {post.User.nickname}??? ????????? ??????
                            </p>
                          </div>
                        </>
                      )}
                    </Modal>
                    {id && <FollowButton post={post} />}
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
              title="?????????"
            />
          ) : (
            <HeartOutlined style={{ fontSize: '18px' }} key="heart" onClick={onToggleLike} title="?????????" />
          ),
          <MessageOutlined style={{ fontSize: '18px' }} key="comment" onClick={onToggleComment} title="??????" />,
        ]}
      >
        <Card.Meta
          description={
            <PostCardContent
              editMode={editMode}
              onCancelUpdate={onCancelUpdate}
              onChangePost={onChangePost}
              postData={post.content}
            />
          }
        />
        <div style={{ padding: '0', color: '#00000073', marginTop: '1rem' }}>{`${
          post.Comments ? post.Comments.length : 0
        }?????? ??????`}</div>
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
      id: PropTypes.string,
      nickname: PropTypes.string,
    }),
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
