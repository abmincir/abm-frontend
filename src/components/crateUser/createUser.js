import { IonLoading, IonToast } from '@ionic/react';
import Axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
  const [loading, setLoading] = useState(false);
  const [showMassage, setShowMassage] = useState(false);
  const data = {
    username: nUser,
    password: pass,
    rPassword: rPass,
  };
  const history = useHistory();

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

  const createUserHandler = () => {
    setLoading(true);

    Axios.post('/update-course-picture/', data, headers)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response))
      .finally(() => {
        setLoading(false);
        setShowMassage(true);
        setTimeout(() => {
          history.push('/home');
        }, 1000);
      });
  };

  return (
    <div className="change-password border-1px-dove-gray">
      <IonLoading
        cssClass="custom-loading"
        isOpen={loading}
        onDidDismiss={() => setLoading(false)}
        message={'در حال بارگزاری'}
        duration={5000}
      />
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
          type="button"
          className="pass-change-confirm dana-regular-normal-white-16px create-user-btn"
          onClick={createUserHandler}
        >
          {createUserConfirm}
        </button>
      </form>
      <IonToast
        isOpen={showMassage}
        cssClass="custom-toast"
        onDidDismiss={() => setShowMassage(false)}
        message="کاربر جدید ایجاد شد"
        duration={1000}
      />
    </div>
  );
}
