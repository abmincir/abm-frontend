import { IonLoading, IonToast } from '@ionic/react';
import Axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../change-pass/style.css';

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
  const [loading, setLoading] = useState(false);
  const [showMassage, setShowMassage] = useState(false);
  const [nrPass, repeatNewPass] = useState('');
  const data = {
    cPassword: cPass,
    npassword: nPass,
    rnPassword: nrPass,
  };

  const setNewPassword = () => {
    setLoading(true);

    // Axios.post('http://localhost:3000/user/changePassword', data)
    Axios.post('http://192.168.1.14:3000/user/changePassword', data)
      .then((res) => {
        console.log(res);
        history.push('/sign-in');
        setShowMassage(true);
      })
      .catch((err) => console.log(err.response))
      .finally(() => {
        setLoading(false);
      });
  };
  const history = useHistory();

  const {
    passChangeTitle,
    currentPassTxt,
    newPassTxt,
    newPassRepeatTxt,
    passChangeConfirm,
  } = props;

  return (
    <div className="change-password border-1px-dove-gray">
      <IonLoading
        cssClass="custom-loading"
        isOpen={loading}
        onDidDismiss={() => setLoading(false)}
        message={'در حال تغییر رمز'}
        duration={5000}
      />
      <div className="pass-change-title dana-regular-normal-black-20px">
        {passChangeTitle}
      </div>
      <form className="change-pass-form">
        <input
          type="password"
          placeholder={currentPassTxt}
          className="current-pass-txt dana-regular-normal-dove-gray-16px"
          value={cPass}
          onChange={(cp) => {
            changePass(cp.target.value);
            console.log(cp.target.value);
          }}
        ></input>

        <input
          type="password"
          placeholder={newPassTxt}
          className="new-pass-txt dana-regular-normal-dove-gray-16px"
          value={nPass}
          onChange={(np) => {
            setNewPass(np.target.value);
            console.log(np.target.value);
          }}
        ></input>

        <input
          type="password"
          placeholder={newPassRepeatTxt}
          className="new-pass-repeat-txt dana-regular-normal-dove-gray-16px"
          value={nrPass}
          onChange={(nrp) => {
            repeatNewPass(nrp.target.value);
            console.log(nrp.target.value);
          }}
        ></input>
        <button
          type="button"
          className="pass-change-confirm dana-regular-normal-white-16px"
          onClick={setNewPassword}
        >
          {passChangeConfirm}
        </button>
      </form>
      <IonToast
        isOpen={showMassage}
        cssClass="custom-toast"
        onDidDismiss={() => setShowMassage(false)}
        message="رمز با موفقیت تغییر کرد"
        duration={1000}
      />
    </div>
  );
}
