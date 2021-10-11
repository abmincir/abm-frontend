import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import SideMenu from '../side-menu/SideMenu';

const URI = process.env.REACT_APP_REST_ENDPOINT;

const AllAccounts = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  const [isAdmin] = useState(true);
  const [visible, setVisible] = useState(false);
  const [accounts, setAccounts] = useState([]);

  const history = useHistory();

  useEffect(() => {
    Axios.get(`${URI}/accounts/all`)
      .then((result) => {
        setAccounts(
          result.data.accounts.map(({ username, password, title, _id }) => {
            return {
              username,
              password,
              title,
              _id,
            };
          })
        );
      })
      .catch((e) => console.error(e));
  }, []);

  const changeHandler = async (index) => {
    const { _id, username, password, title } = accounts[index];
    const data = { _id, username, password, title };

    try {
      const result = await Axios.post(`${URI}/accounts/change-user`, data);
      console.log(result);
      setAccounts(
        [...accounts].map((account) =>
          account._id === accounts[index]._id ? result.data.account : account
        )
      );
      setMessage('تغییرات مورد نظر اعمال شد');
      setShowMessage(true);
    } catch (error) {
      console.error(error);
      setMessage('عدم ارتباط با سرور');
      setShowMessage(true);
    } finally {
    }
  };

  const editPasswordHandler = (index, password) => {
    setAccounts(
      accounts.map((u, indx) => {
        if (index !== indx) return u;
        return { ...u, password };
      })
    );
  };

  const editUsernameHandler = (index, username) => {
    setAccounts(
      accounts.map((u, indx) => {
        if (index !== indx) return u;
        return { ...u, username };
      })
    );
  };

  const editTitleHandler = (index, title) => {
    setAccounts(
      accounts.map((u, indx) => {
        if (index !== indx) return u;
        return { ...u, title };
      })
    );
  };

  const deleteAccountHandler = async (index) => {
    const data = { _id: accounts[index]._id };
    try {
      const result = await Axios.post(`${URI}/accounts/delete`, data);
      setAccounts(
        [...accounts].filter((account) => account._id !== accounts[index]._id)
      );

      setMessage('حساب کاربری مورد نظر حذف شد');
      setShowMessage(true);
    } catch (error) {
      console.error(error);
      setMessage('عدم ارتباط با سرور');
      setShowMessage(true);
    } finally {
    }
  };

  const addAccountHandler = async () => {
    history.push('/create-account');
  };

  return (
    <>
      <IonToast
        isOpen={showMessage}
        cssClass="custom-toast"
        onDidDismiss={() => setShowMessage(false)}
        message={message}
        duration={6000}
      />

      <SideMenuContainer visible={visible}>
        <SideMenu />
      </SideMenuContainer>
      <BlurContainer onClick={() => setVisible(false)} visible={visible} />

      <Header isAdmin={isAdmin}>
        <div onClick={() => setVisible(!visible)}>{menu}</div>
        <p>کشت و صنعت اکسون</p>
      </Header>

      <Wrapper>
        <ColumnsSection>
          <Column>
            <ColumnsTitle>کد کاربری</ColumnsTitle>
          </Column>
          <Column>
            <ColumnsTitle>رمز عبور</ColumnsTitle>
          </Column>
          <Column>
            <ColumnsTitle>عنوان حساب کاربری</ColumnsTitle>
          </Column>
          <Column>
            <Button onClick={addAccountHandler} color="green">
              <ButtonText>افزودن حساب کاربری</ButtonText>
            </Button>
          </Column>
        </ColumnsSection>

        <RowsContainer>
          {!accounts.length ? (
            <DataRow>
              <Column>
                <p>حساب کاربری یافت نشد</p>
              </Column>
            </DataRow>
          ) : (
            accounts.map((account, index) => (
              <DataRow key={account._id}>
                <Column>
                  <DataValue
                    onChange={(e) => editUsernameHandler(index, e.target.value)}
                    value={account.username}
                  />
                </Column>
                <Column>
                  <DataValue
                    onChange={(e) => editPasswordHandler(index, e.target.value)}
                    value={account.password}
                  />
                </Column>
                <Column>
                  <DataValue
                    onChange={(e) => editTitleHandler(index, e.target.value)}
                    value={account.title}
                  />
                </Column>
                <Column>
                  <Button
                    onClick={() => deleteAccountHandler(index)}
                    color="black"
                  >
                    <ButtonText>حذف</ButtonText>
                  </Button>
                  <Button onClick={() => changeHandler(index)} color="gray">
                    <ButtonText>تغییر</ButtonText>
                  </Button>
                </Column>
              </DataRow>
            ))
          )}
        </RowsContainer>
      </Wrapper>
    </>
  );
};

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
          background-color: rgba(112, 112, 112, 1) !important ;
        `
      : css`
          background-color: var(--caribbean-green);
        `}
`;

const Wrapper = styled.div`
  position: fixed;
  top: 70px;

  display: ;
  align-items: center;
  flex-direction: column;

  background-color: white;

  overflow-x: hidden;
  overflow-y: scroll;

  height: 100%;
  width: 100%;
`;

const RowsContainer = styled.div`
  width: 100%;
  height: 100%;

  overflow: hidden;
`;

const DataRow = styled.div`
  display: flex;
  flex-direction: row-reverse;

  min-height: 57px;
  width: calc(100% - 81px);
  padding: 0;
  margin-top: 18px;
  margin-left: 48px;

  background-color: white;
  border-radius: 12px;

  pointer-events: auto;
  transition: all 0.3s ease;

  &:first-of-type {
    margin-top: 10px;
  }

  &:last-of-type {
    margin-bottom: 10px;
  }

  &:hover {
    cursor: pointer;
  }
  color: var(--dove-gray);
  box-shadow: -2px 2px 8px 2px rgba(0, 0, 0, 0.1);
`;

const DataValue = styled.input`
  color: inherit;
  font-family: 'Dana-Regular', Helvetica, Arial, serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  margin: 0;

  border-radius: 14px;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  direction: rtl;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 0;
  flex-grow: 1;
`;

const ColumnsSection = styled.div`
  display: flex;
  flex-direction: row-reverse;
  min-height: 70px;
  width: 100%;
  padding: 14px 30px 10px 48px;
`;

const Button = styled.div`
  pointer-events: auto;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }

  ${(props) =>
    props.color === 'gray'
      ? css`
          background: var(--dove-gray);
        `
      : props.color === 'green'
      ? css`
          background: var(--caribbean-green);
        `
      : css`
          background: black;
        `}

  border-radius: 12px;
  height: 34px;
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 16px;
`;

const ButtonText = styled.p`
  color: white;
  font-family: 'Dana-Regular', Helvetica, Arial, serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  margin: 0;
`;

const ColumnsTitle = styled.p`
  color: black;
  font-family: 'Dana-Regular', Helvetica, Arial, serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
  margin: 0;
`;

export default AllAccounts;
