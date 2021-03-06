import { IonToast } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';

function App(props) {
  return (
    <Usermenu
      username="کاربر آزمایشی شماره ۱"
      changePassBtn__Txt="ویرایش رمز عبور"
      exportBtn__Txt="دریافت فایل خروجی"
      exitBtn__Txt="خروج"
    />
  );
}

export default App;

function Usermenu(props) {
  const history = useHistory();
  const [isAdmin, setAdmin] = useState(false);
  const [showMassage, setShowMassage] = useState(false);

  useEffect(() => {
    console.log('checked', localStorage.getItem('isAdmin'));
    setAdmin(localStorage.getItem('isAdmin') === 'true');
  }, []);

  const handleClick = () => {
    history.push(isAdmin ? '/create-user' : '/change-password');
  };

  const logout = () => {
    setShowMassage(true);
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userId');
    setTimeout(() => {
      history.push('/sign-in');
    }, 1000);
  };

  const { username, changePassBtn__Txt, exportBtn__Txt, exitBtn__Txt } = props;
  return (
    <div className="wrapper">
      <div className="user-menu">
        {isAdmin ? (
          <div className="container border-1px-dove-gray dark-back"></div>
        ) : (
          <div className="container border-1px-dove-gray"></div>
        )}

        <div className="avatar border-1px-dove-gray"></div>
        <h1 className="username dana-bold-white-26px">
          {isAdmin ? 'ادمین' : username}
        </h1>
        <div
          className="overlap-group2 border-class-1 side-menu-btn"
          onClick={handleClick}
        >
          <div className="change-pass-btntxt dana-regular-normal-white-20px">
            {isAdmin ? 'ساخت کاربر جدید' : changePassBtn__Txt}
          </div>
        </div>
        <div className="overlap-group1 side-menu-btn">
          <div className="export-btntxt dana-regular-normal-black-18px">
            {exportBtn__Txt}
          </div>
        </div>
        <div className="overlap-group side-menu-btn" onClick={logout}>
          <div className="exit-btntxt dana-regular-normal-white-20px">
            {exitBtn__Txt}
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
  );
}