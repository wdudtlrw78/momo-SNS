import React from 'react';
import { useSelector } from 'react-redux';
import AppLayouts from '../components/AppLayout';
import FollowList from '../components/FollowList';
import UserProfile from '../components/UserProfile';

function Profile() {
  const { me } = useSelector((state) => state.user);
  return (
    <AppLayouts>
      <UserProfile />

      <FollowList header="팔로워 목록" data={me.Followers} />
      <FollowList header="팔로우 목록" data={me.Follows} />
    </AppLayouts>
  );
}

export default Profile;
