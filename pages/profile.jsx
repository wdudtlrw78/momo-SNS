import React from 'react';
import AppLayouts from '../components/AppLayout';
import PostCard from '../components/PostCard';
import UserProfile from '../components/UserProfile';

function Profile() {
  return (
    <AppLayouts>
      <UserProfile />

      <PostCard />
    </AppLayouts>
  );
}

export default Profile;
