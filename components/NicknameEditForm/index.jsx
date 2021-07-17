import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';

const NicknameEditForm = ({ setNickname, setShowNicknameEditForm }) => {
  const { user } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(user?.email || '');

  const onSubmit = useCallback(() => {
    setNickname(true);
    setShowNicknameEditForm(false);
  }, []);

  return (
    <>
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        onSearch={onSubmit}
        addonBefore="닉네임"
        enterButton="수정"
      />
    </>
  );
};

NicknameEditForm.propTypes = {
  setNickname: PropTypes.bool.isRequired,
  setShowNicknameEditForm: PropTypes.bool.isRequired,
};

export default NicknameEditForm;
