import React from 'react';
import './style.css';

function App() {
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
  const { username, changePassBtn__Txt, exportBtn__Txt, exitBtn__Txt } = props;

  return (
    <div className="wrapper">
      <div className="user-menu">
        <div className="container border-1px-dove-gray"></div>
        <div className="avatar border-1px-dove-gray"></div>
        <h1 className="username dana-bold-white-26px">{username}</h1>
        <div className="overlap-group2 border-class-1 side-menu-btn">
          <div className="change-pass-btntxt dana-regular-normal-white-20px">
            {changePassBtn__Txt}
          </div>
        </div>
        <div className="overlap-group1 side-menu-btn">
          <div className="export-btntxt dana-regular-normal-black-18px">
            {exportBtn__Txt}
          </div>
        </div>
        <div className="overlap-group side-menu-btn">
          <div className="exit-btntxt dana-regular-normal-white-20px">
            {exitBtn__Txt}
          </div>
        </div>
      </div>
    </div>
  );
}
