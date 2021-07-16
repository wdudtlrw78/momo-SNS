import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import gravatar from 'gravatar';
import Link from 'next/link';

export const Profile = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

function ProfileImg() {
  const { user } = useSelector((state) => state.user);
  return (
    <Link href="/profile">
      <a>
        <Profile src={gravatar.url(user.email, { s: '36px', d: 'retro' })} alt="#" />
      </a>
    </Link>
  );
}

export default ProfileImg;
