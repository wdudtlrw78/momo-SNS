import React from 'react';
import AppLayouts from '../components/AppLayout';
import FollowList from '../components/FollowList';
import UserProfile from '../components/UserProfile';

function Profile() {
  const followerList = [{ nickname: '모모' }, { nickname: '바보' }, { nickname: '노드버드오피셜' }];

  const followList = [{ nickname: '모모' }, { nickname: '바보' }, { nickname: '노드버드오피셜' }];
  return (
    <AppLayouts>
      <UserProfile />

      <FollowList header="팔로워 목록" data={followerList} />
      <FollowList header="팔로우 목록" data={followList} />
    </AppLayouts>
  );
}

export default Profile;
