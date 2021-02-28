import Axios from 'axios';
import React, { useState } from 'react';
import './style.css';

function CreateUser() {
  return (
    <CreateNewUser
      createUserTitle="ساخت کاربر جدید"
      newUserTxt="نام کاربری"
      passTxt="رمز عبور"
      passRepeatTxt="تکرار رمز عبور"
      createUserConfirm="تأیید"
    />
  );
}

export default CreateUser;

function CreateNewUser(props) {
  const [nUser, newUser] = useState('');
  const [pass, password] = useState('');
  const [rPass, repeatPass] = useState('');
  const data = {
    username: nUser,
    password: pass,
    rPassword: rPass,
  };

  const headers = {
    'Content-Type': 'application/json',
  };

  const {
    createUserTitle,
    newUserTxt,
    passTxt,
    passRepeatTxt,
    createUserConfirm,
  } = props;

  return (
    <div className="change-password border-1px-dove-gray">
      <div className="pass-change-title dana-regular-normal-black-20px">
        {createUserTitle}
      </div>
      <form className="change-pass-form">
        <input
          type="text"
          placeholder={newUserTxt}
          className="current-pass-txt dana-regular-normal-dove-gray-16px"
          value={nUser}
          onChange={(u) => {
            newUser(u.target.value);
            console.log(u.target.value);
          }}
        ></input>

        <input
          type="password"
          placeholder={passTxt}
          className="new-pass-txt dana-regular-normal-dove-gray-16px"
          value={pass}
          onChange={(p) => {
            password(p.target.value);
            console.log(p.target.value);
          }}
        ></input>

        <input
          type="password"
          placeholder={passRepeatTxt}
          className="new-pass-repeat-txt dana-regular-normal-dove-gray-16px"
          value={rPass}
          onChange={(rp) => {
            repeatPass(rp.target.value);
            console.log(rp.target.value);
          }}
        ></input>
        <button
          className="pass-change-confirm dana-regular-normal-white-16px create-user-btn"
          onClick={() => {
            Axios.post('/update-course-picture/', data, headers)
              .then((res) => console.log(res))
              .catch((err) => console.log(err.response))
              .finally(() => {
                //allways run
              });
          }}
        >
          {createUserConfirm}
        </button>
      </form>
    </div>
  );
}
