import { IonLoading, IonToast } from '@ionic/react';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import * as actions from '../../actions';
import store from '../../store';

const URI = process.env.REACT_APP_REST_ENDPOINT;

const SignIn = ({ setToAdmin, setToUser }) => {
  const history = useHistory();

  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState('');

  const [pass, setPass] = useState('');

  const [loading, setLoading] = useState(false);

  const [showMassage, setShowMassage] = useState(false);
  const [message, setMessage] = useState('');

  const adminLoginHandler = (event) => {
    setLoading(true);
    if (user === 'exon' && pass === 'Exon@123') {
      localStorage.setItem('isAdmin', 'true');

      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      localStorage.removeItem('name');

      setMessage('با موفقیت وارد شدید');
      setShowMassage(true);
      history.push('/home');
    } else {
      setMessage('رمز عبور یا نام کاربری نامعتبر');
      setShowMassage(true);
      setLoading(false);
    }
  };

  const userLoginHandler = (event) => {
    if (dataBaseSelected === 0) {
      setMessage('انتخاب پایگاه داده اجباریست');
      setShowMassage(true);
      return;
    }
    if (accountSelected === 0) {
      setMessage('انتخاب حساب کاربری اجباریست');
      setShowMassage(true);
      return;
    }

    setLoading(true);

    const data = {
      username: user,
      password: pass,
    };

    Axios.post(`${URI}/user/auth`, data)
      .then((res) => {
        localStorage.setItem('userId', res.data.user._id);
        localStorage.setItem('username', res.data.user.username);
        localStorage.setItem('name', res.data.user.name);
        localStorage.setItem('isAdmin', 'false');

        setMessage('با موفقیت وارد شدید');
        setShowMassage(true);
        history.push('/home');
      })
      .catch((err) => console.log(err.response))
      .finally(() => {
        setLoading(false);
        setMessage('رمز عبور یا نام کاربری نامعتبر');
        setShowMassage(true);
      });
  };

  const adminLoginCheck = () => {
    if (dataBaseSelected === 0) {
      setMessage('هشدار: ورود بدون انتخاب پایگاه داده');
      setShowMassage(true);
      setTimeout(() => {
        adminLoginHandler();
      }, 3000);
    } else if (accountSelected === 0) {
      setMessage('هشدار: ورود بدون انتخاب حساب کاربری');
      setShowMassage(true);
      setTimeout(() => {
        adminLoginHandler();
      }, 3000);
    } else {
      adminLoginHandler();
    }
  };

  const onKeyPress = (e) => {
    if (e.charCode === 13) {
      if (isAdmin) {
        adminLoginCheck();
      } else {
        userLoginHandler();
      }
    }
  };

  // select box

  const [dataBases, setDataBases] = useState([]);
  const [accounts, setAccounts] = useState([]);

  // const [dataBases, setDataBases] = useState([
  //   { name: 'تدبیر' },
  //   { name: 'MIS' },
  // ]);
  // const [accounts, setAccounts] = useState([
  //   { username: 'exon test1' },
  //   { username: 'exon test2' },
  //   { username: 'exon test3' },
  //   { username: 'exon test4' },
  // ]);

  useEffect(() => {
    Axios.get(`${URI}/databases/all`)
      .then((result) => {
        setDataBases(
          result.data.dbs.map(
            ({ name, address, username, password, proc, _id }) => {
              return {
                name,
                address,
                username,
                password,
                proc,
                _id,
              };
            }
          )
        );
      })
      .catch((e) => console.error(e));

    Axios.get(`${URI}/accounts/all`)
      .then((result) => {
        setAccounts(
          result.data.accounts.map(({ username, password, _id }) => {
            return {
              username,
              password,
              _id,
            };
          })
        );
      })
      .catch((e) => console.error(e));
  }, []);

  const [dataBaseSelected, setDataBaseSelected] = useState(
    store.getState().dataBase ? store.getState().dataBase : 0
  );

  const [accountSelected, setAccountSelected] = useState(
    store.getState().account ? store.getState().account : 0
  );

  const [activeDataBase, setActiveDataBase] = useState(false);
  const [activeAccount, setActiveAccount] = useState(false);

  const toggleActiveDataBase = () => {
    setActiveDataBase(!activeDataBase);
  };
  const toggleActiveAccount = () => {
    setActiveAccount(!activeAccount);
  };

  const toggleSelectedDataBase = (
    _id,
    name,
    address,
    username,
    password,
    proc,
    data
  ) => {
    setActiveDataBase(false);
    setDataBaseSelected(data);
    actions.dataBaseChange(_id, name, address, username, password, proc);
  };

  const toggleSelectedAccount = (_id, username, password, acc) => {
    setAccountSelected(acc);
    setActiveAccount(false);
    actions.accountChange(_id, username, password);
  };

  return (
    <>
      <IonLoading
        cssClass="custom-loading"
        isOpen={loading}
        onDidDismiss={() => setLoading(false)}
        message={'در حال ورود'}
        duration={5000}
      />

      <Header isAdmin={isAdmin}>
        <p>کشت و صنعت اکسون</p>
      </Header>

      <Wrapper>
        <SignInBox
          activeAccount={activeAccount}
          activeDataBase={activeDataBase}
        >
          <SelectionBox>
            <User
              onClick={() => {
                setIsAdmin(false);
              }}
              isAdmin={isAdmin}
            >
              ورود کاربر
            </User>
            <MidLine></MidLine>
            <Admin
              onClick={() => {
                setIsAdmin(true);
              }}
              isAdmin={isAdmin}
            >
              ورود مدیر
            </Admin>
          </SelectionBox>
          <FlexWrapper>
            <SelectBox>
              <OptionContainer active={activeDataBase}>
                {dataBases.map((d) => {
                  return (
                    <Option
                      onClick={(e) =>
                        toggleSelectedDataBase(
                          d._id,
                          d.name,
                          d.address,
                          d.username,
                          d.password,
                          d.proc,
                          d
                        )
                      }
                    >
                      {d.name}
                    </Option>
                  );
                })}
              </OptionContainer>

              <SelectedOption onClick={toggleActiveDataBase}>
                {dataBaseSelected === 0
                  ? 'انتخاب پایگاه داده'
                  : dataBaseSelected.name}
              </SelectedOption>
            </SelectBox>

            <SelectBox>
              <OptionContainer active={activeAccount}>
                {accounts.map((d) => {
                  return (
                    <Option
                      onClick={(e) =>
                        toggleSelectedAccount(d._id, d.username, d.password, d)
                      }
                    >
                      {d.username}
                    </Option>
                  );
                })}
              </OptionContainer>

              <SelectedOption
                onClick={toggleActiveAccount}
                active={activeAccount}
              >
                {accountSelected === 0
                  ? 'انتخاب حساب کاربری'
                  : accountSelected.username}
              </SelectedOption>
            </SelectBox>

            <UserName
              type="text"
              name="user"
              id="user"
              placeholder="نام کاربری"
              value={user}
              onChange={(u) => {
                setUser(u.target.value);
              }}
              onKeyPress={onKeyPress}
            ></UserName>

            <Password
              type="password"
              name="pass"
              placeholder="رمز عبور"
              value={pass}
              onChange={(p) => {
                setPass(p.target.value);
              }}
              onKeyPress={onKeyPress}
            ></Password>
            <Enter
              type="button"
              isAdmin={isAdmin}
              onClick={isAdmin ? adminLoginCheck : userLoginHandler}
            >
              ورود
            </Enter>
          </FlexWrapper>
        </SignInBox>
        <IonToast
          isOpen={showMassage}
          cssClass="custom-toast"
          onDidDismiss={() => setShowMassage(false)}
          message={message}
          duration={1000}
        />
      </Wrapper>
    </>
  );
};

const Header = styled.div`
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
          background-color: rgba(112, 112, 112, 1) !important ;
        `
      : css`
          background-color: var(--caribbean-green);
        `}
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  background-color: white;

  overflow: hidden;

  width: 100%;
  height: 100%;
`;

const SelectionBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-content: space-between;
  justify-items: space-between;
  width: 60%;
  margin-top: 33.92px;
`;

const SignInBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: white;
  border-radius: 40px;
  background-color: white;
  border: 1px solid var(--dove-gray);

  margin-bottom: 70px;

  height: 900px;
  max-height: 416px;
  width: 384px;
  min-width: 384px;

  transition: max-height 0.4s ease-in;

  ${(props) =>
    props.activeDataBase
      ? props.activeAccount
        ? css`
            max-height: 676px;
          `
        : css`
            max-height: 516px;
          `
      : props.activeAccount
      ? css`
          max-height: 586px;
        `
      : css``}

  font-family: 'Dana-Light';
  font-style: normal;
  font-weight: 300;
`;

const Admin = styled.div`
  pointer-events: auto;
  transition: all 0.5s ease;
  &:hover {
    transform: translate(5px, 0);
    cursor: pointer;
  }
  ${(props) =>
    props.isAdmin
      ? css`
          font-family: 'Dana-Bold', Helvetica, Arial, serif;
          font-style: normal;
          font-weight: 700;
          color: black;
          font-size: 20px;
          letter-spacing: 0px;
          line-height: 20px;
          min-height: 29px;
          min-width: 82px;
          text-align: center;
          white-space: nowrap;
        `
      : css`
          color: black;
          font-family: 'Dana-Regular', Helvetica, Arial, serif;
          font-size: 20px;
          font-style: normal;
          font-weight: 300;
          letter-spacing: 0px;
          line-height: 20px;
          min-height: 29px;
          min-width: 72px;
          opacity: 0.7;
          text-align: center;
          white-space: nowrap;
        `}
`;
const MidLine = styled.div`
  background-color: var(--dove-gray);
  height: 46px;
  width: 1px;
`;
const User = styled.div`
  pointer-events: auto;
  transition: all 0.5s ease;
  &:hover {
    transform: translate(-5px, 0);
    cursor: pointer;
  }
  ${(props) =>
    props.isAdmin
      ? css`
          color: black;
          font-family: 'Dana-Regular', Helvetica, Arial, serif;
          font-size: 20px;
          font-style: normal;
          font-weight: 300;
          letter-spacing: 0px;
          line-height: 20px;
          min-height: 29px;
          min-width: 72px;
          opacity: 0.7;
          text-align: center;
          white-space: nowrap;
        `
      : css`
          font-family: 'Dana-Bold', Helvetica, Arial, serif;
          font-style: normal;
          font-weight: 700;
          color: black;
          font-size: 20px;
          letter-spacing: 0px;
          line-height: 20px;
          min-height: 29px;
          min-width: 82px;
          text-align: center;
          white-space: nowrap;
        `}
`;

const SelectBox = styled.div`
  // height: 40px;
  width: 280px;

  margin-bottom: 8px;

  display: flex;
  flex-direction: column;

  direction: rtl;
`;

const OptionContainer = styled.div`
  background: #2f3640;
  color: #f5f6fa;
  height: 0px;
  max-height: 0px;
  width: 280px;
  transition: visibility 0.3s ease-in, opacity 0.5s ease-out,
    max-height 0.4s ease-in;
  border-radius: 8px;
  overflow: hidden;
  visibility: hidden;
  opacity: 0;

  position: relative;

  margin-bottom: 0px;

  top: 3px;

  ${(props) =>
    props.active
      ? css`
          opacity: 1;
          visibility: visible;
          height: auto;
          max-height: auto;
          margin-bottom: 8px;
        `
      : css``}

  order: 1;
  max-height: 240px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0px;
    background: #0d141f;
    border-radius: 0 8px 8px 0;
  }

  &::-webkit-scrollbar-thumb {
    background: #525861;
    border-radius: 0 8px 8px 0;
  }
`;

const SelectedOption = styled.div`
  background: #2f3640;
  border-radius: 8px;
  margin-bottom: 8px;
  color: #f5f6fa;
  position: relative;

  order: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    background: url('img/arrow-down.svg');
    background-size: contain;
    background-repeat: no-repeat;

    position: absolute;
    height: 100%;
    width: 32px;
    right: 10px;
    top: 5px;

    transition: all 0.4s;
  }

  padding: 12px 24px;
  cursor: pointer;
`;

const Option = styled.div`
  padding: 12px 24px;
  cursor: pointer;

  &:hover {
    background: #414b57;
  }
`;

const UserName = styled.input`
  border: 1px solid var(--dove-gray);
  background-color: white;
  border-radius: 20px;
  height: 40px;
  width: 280px;
  display: flex;
  min-width: 280px;
  align-items: center;
  justify-content: center;

  color: var(--dove-gray);
  font-family: 'Dana-Regular', Helvetica, Arial, serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 16px;
  text-align: center;
  white-space: nowrap;
`;

const Password = styled.input`
  border: 1px solid var(--dove-gray);
  background-color: white;
  border-radius: 20px;
  height: 40px;
  width: 280px;

  display: flex;
  min-width: 280px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  color: var(--dove-gray);
  font-family: 'Dana-Regular', Helvetica, Arial, serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 16px;
  text-align: center;
  white-space: nowrap;
`;

const Enter = styled.button`
  background-color: var(--caribbean-green);
  border-radius: 20px;
  height: 40px;
  width: 120px;
  align-items: center;
  justify-content: center;
  display: flex;
  min-width: 120px;
  margin-top: 39px;

  color: white;
  font-family: 'Dana-Regular', Helvetica, Arial, serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 16px;
  min-height: 23px;
  min-width: 32px;
  text-align: center;
  white-space: nowrap;
  border: none;

  pointer-events: auto;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
  ${(props) =>
    props.isAdmin
      ? css`
          background-color: rgba(112, 112, 112, 1) !important;
        `
      : css`
          background-color: var(--caribbean-green);
        `}
`;

const FlexWrapper = styled.form`
  display: flex;
  flex-direction: column;
  min-height: 172px;
  width: 280px;
  align-items: center;
  justify-content: flex-start;
  margin-top: 39px;
`;
export default SignIn;
