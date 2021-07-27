import React, { useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import AppLayouts from '../components/AppLayout';
import FollowList from '../components/FollowList';
import UserProfile from '../components/UserProfile';

function Profile() {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Profile | Momo</title>
      </Head>
      <AppLayouts>
        <UserProfile />

        <FollowList header="팔로워 목록" data={me.Followers} />
        <FollowList header="팔로우 목록" data={me.Follows} />
      </AppLayouts>
    </>
  );
}

export default Profile;
