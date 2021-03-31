import { IonToast } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';

const SideMenu = ({ changePassBtn__Txt, exportBtn__Txt, exitBtn__Txt }) => {
  const history = useHistory();
  const [isAdmin, setAdmin] = useState(false);
  const [name, setName] = useState('');
  const [showMassage, setShowMassage] = useState(false);

  useEffect(() => {
    setAdmin(localStorage.getItem('isAdmin') === 'true');
    console.log(
      localStorage.getItem('isAdmin'),
      localStorage.getItem('isAdmin') === 'true'
    );
    setName(localStorage.getItem('name'));
  }, []);

  const handleClick = () => {
    history.push(isAdmin ? '/create-user' : '/change-password');
  };

  const logout = () => {
    setShowMassage(true);

    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('name');

    history.push('/sign-in');
  };

  return (
    <>
      <div className="wrapper">
        <div className="user-menu">
          {isAdmin ? (
            <div className="container dark-back"></div>
          ) : (
            <div className="container"></div>
          )}

          <div className="avatar border-1px-dove-gray"></div>
          <h1 className="username dana-bold-white-26px">
            {isAdmin ? 'ادمین' : name}
          </h1>
          <div
            className="overlap-group2 border-class-1 side-menu-btn"
            onClick={handleClick}
          >
            <div className="change-pass-btntxt dana-regular-normal-white-20px">
              {isAdmin ? 'ساخت کاربر جدید' : 'ویرایش رمز عبور'}
            </div>
          </div>
          <div className="overlap-group1 side-menu-btn">
            <div className="export-btntxt dana-regular-normal-black-18px">
              دریافت فایل خروجی
            </div>
          </div>
          <div className="overlap-group side-menu-btn" onClick={logout}>
            <div className="exit-btntxt dana-regular-normal-white-20px">
              خروج
            </div>
          </div>
        </div>

        <IonToast
          isOpen={showMassage}
          cssClass="custom-toast"
          onDidDismiss={() => setShowMassage(false)}
          message="خارج شدید"
          duration={1000}
        />
      </div>
    </>
  );
};

export default SideMenu;