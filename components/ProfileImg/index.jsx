import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import gravatar from 'gravatar';

import { css } from '@emotion/react';

export const Profile = styled.img`
  width: 36px;
  height: 36px;
  display: inline-block;
  border-radius: 50%;

  ${(props) =>
    props.large &&
    css`
      width: 96px;
      height: 96px;
    `}
`;

function ProfileImg({ large }) {
  const { me } = useSelector((state) => state.user);

  return <Profile src={gravatar.url(me.nickname, { s: '36px', d: 'retro' })} alt={me.nickname} large={large} />;
}

ProfileImg.propTypes = {
  large: PropTypes.bool,
};

export default ProfileImg;
