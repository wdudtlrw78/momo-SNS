import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import gravatar from 'gravatar';
import Link from 'next/link';
import { css } from '@emotion/react';

export const Profile = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;

  ${(props) =>
    props.large &&
    css`
      width: 72px;
      height: 72px;
    `}
`;

function ProfileImg({ large }) {
  const { user } = useSelector((state) => state.user);

  return (
    <Link href="/profile">
      <a>
        <Profile src={gravatar.url(user.email, { s: '36px', d: 'retro' })} alt="#" large={large} />
      </a>
    </Link>
  );
}

ProfileImg.propTypes = {
  large: PropTypes.bool.isRequired,
};

export default ProfileImg;
