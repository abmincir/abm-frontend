import { IonLoading, IonToast } from '@ionic/react';
import Axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import SideMenu from '../side-menu/SideMenu';
import './style.css';
const URI = process.env.REACT_APP_REST_ENDPOINT;

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
  const [isAdmin, setIsAdmin] = useState(true);
  const [visible, setVisible] = useState(false);
  const [nUser, newUser] = useState('');
  const [name, setName] = useState('');
  const [pass, password] = useState('');
  const [rPass, repeatPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMassage, setShowMassage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const history = useHistory();

  const {
    createUserTitle,
    newUserTxt,
    passTxt,
    passRepeatTxt,
    createUserConfirm,
  } = props;

  const createUserHandler = () => {
    setLoading(true);

    if (pass !== rPass) {
      return;
    }

    const data = {
      username: nUser,
      name,
      password: pass,
    };

    Axios.post(`${URI}/user/create`, data)
      .then((result) => {
        history.push('/all-users');
      })
      .catch((error) => {
        setErrorMessage(true);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <SideMenuContainer visible={visible}>
        <SideMenu />
      </SideMenuContainer>
      <BlurContainer onClick={() => setVisible(false)} visible={visible} />

      <Header isAdmin={isAdmin}>
        <div onClick={() => setVisible(!visible)}>{menu}</div>
        <p>کشت و صنعت اکسون</p>
      </Header>
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
            }}
          ></input>

          <input
            type="text"
            placeholder={'نام'}
            style={{ marginTop: '8px' }}
            className="current-pass-txt dana-regular-normal-dove-gray-16px"
            value={name}
            onChange={(u) => {
              setName(u.target.value);
            }}
          ></input>

          <input
            type="password"
            placeholder={passTxt}
            className="new-pass-txt dana-regular-normal-dove-gray-16px"
            value={pass}
            onChange={(p) => {
              password(p.target.value);
            }}
          ></input>

          <input
            type="password"
            placeholder={passRepeatTxt}
            className="new-pass-repeat-txt dana-regular-normal-dove-gray-16px"
            value={rPass}
            onChange={(rp) => {
              repeatPass(rp.target.value);
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
          isOpen={errorMessage}
          cssClass="custom-toast"
          onDidDismiss={() => setErrorMessage(false)}
          message="خطا"
          duration={1000}
        />

        <IonToast
          isOpen={showMassage}
          cssClass="custom-toast"
          onDidDismiss={() => setShowMassage(false)}
          message="کاربر جدید ایجاد شد"
          duration={1000}
        />
      </div>
    </>
  );
}
const SideMenuContainer = styled.div`
  top: 0px;
  right: -333px;
  width: 333px;
  height: 100%;
  position: fixed;
  z-index: 11;
  transition: all 0.8s ease;
  ${(props) =>
    props.visible
      ? css`
          transform: translate(-333px, 0);
        `
      : css`
          transform: translate(333px, 0);
        `}
`;

const menu = (
  <svg
    xmlns="http://www.w4.org/2000/svg"
    viewBox="0 0 24 24"
    width="30"
    height="30"
    fill="none"
    stroke="#FFF"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-menu menu-animation menu-button"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const BlurContainer = styled.div`
  with: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0); /* Fallback color */

  background-color: rgba(0, 0, 0, 0.6);
  /* Overlay effect: translucent background: black w/ partial opacity */

  width: 100vw; /* Full width */
  height: 100vh; /* Full height */
  position: fixed; /* Fix position on the top-left corner*/
  top: 0;
  left: 0;
  overflow: auto; /* Enable scroll if needed */
  backdrop-filter: blur(3px);
  transition: all 0.8s ease;
  z-index: 9;

  ${(props) =>
    props.visible
      ? css`
          visibility: visible;
          opacity: 1;
        `
      : css`
          visibility: hidden;
          opacity: 0;
        `}
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  z-index: 10;

  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: center;

  width: 100vw;
  height: 70px;
  min-height: 70px;
  max-height: 70px;
  padding-right: 48px;

  p {
    color: white;

    letter-spacing: 0px;
    text-align: center;
    white-space: nowrap;

    font-family: 'Dana-Bold', Helvetica, Arial, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;

    margin-right: 16px;
  }

  ${(props) =>
    props.isAdmin
      ? css`
          background-color: rgb(17, 160, 179) !important ;
        `
      : css`
          background-color: var(--caribbean-green);
        `}
`;
