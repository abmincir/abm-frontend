import React, { useState } from 'react';
import './style.css';

function ChangePass() {
  return (
    <Changepassword
      passChangeTitle="تغییر رمز عبور"
      currentPassTxt="رمز عبور فعلی"
      newPassTxt="رمز عبور جدید"
      newPassRepeatTxt="تکرار رمز عبور جدید"
      passChangeConfirm="تأیید"
    />
  );
}

export default ChangePass;

function Changepassword(props) {
  const [cPass, changePass] = useState('');
  const [nPass, setNewPass] = useState('');
  const [nrPass, repeatNewPass] = useState('');
  const {
    passChangeTitle,
    currentPassTxt,
    newPassTxt,
    newPassRepeatTxt,
    passChangeConfirm,
  } = props;

  return (
    <div className="change-password border-1px-dove-gray">
      <div className="pass-change-title dana-regular-normal-black-20px">
        {passChangeTitle}
      </div>
      <form className="change-pass-form">
        <input
          type="text"
          placeholder={currentPassTxt}
          className="current-pass-txt dana-regular-normal-dove-gray-16px"
          value={cPass}
          onChange={(cp) => {
            changePass(cp.target.value);
            console.log(cp.target.value);
          }}
        ></input>

        <input
          type="text"
          placeholder={newPassTxt}
          className="new-pass-txt dana-regular-normal-dove-gray-16px"
          value={nPass}
          onChange={(np) => {
            setNewPass(np.target.value);
            console.log(np.target.value);
          }}
        ></input>

        <input
          type="text"
          placeholder={newPassRepeatTxt}
          className="new-pass-repeat-txt dana-regular-normal-dove-gray-16px"
          value={nrPass}
          onChange={(nrp) => {
            repeatNewPass(nrp.target.value);
            console.log(nrp.target.value);
          }}
        ></input>
        <button className="pass-change-confirm dana-regular-normal-white-16px">
          {passChangeConfirm}
        </button>
      </form>
    </div>
  );
}
