import Axios from 'axios';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import SideMenu from '../side-menu/SideMenu';

const AllUsers = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState([
    { username: 'user1', userId: 'user1', pass: '123', key: 1 },
    { username: 'user2', userId: 'user2', pass: '123', key: 2 },
    { username: 'user3', userId: 'user3', pass: '123', key: 3 },
  ]);
  const changeHandler = async () => {
    try {
      const result = await Axios.post();
    } catch (error) {
    } finally {
    }
  };
  const deleteUserHandler = async () => {
    try {
      const result = await Axios.post();
    } catch (error) {
    } finally {
    }
  };
  const addUserHandler = async () => {
    try {
      const result = await Axios.post();
    } catch (error) {
    } finally {
    }
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
      <Wrapper>
        <ColumnsSection>
          <Column>
            <ColumnsTitle>نام </ColumnsTitle>
          </Column>
          <Column>
            <ColumnsTitle>کد کاربری</ColumnsTitle>
          </Column>
          <Column>
            <ColumnsTitle>رمز عبور</ColumnsTitle>
          </Column>
          <Column>
            <Button onClick={addUserHandler} color="green">
              <ButtonText>افزودن کاربر</ButtonText>
            </Button>
          </Column>
        </ColumnsSection>

        <RowsContainer>
          {users.map((user) => (
            <DataRow>
              <Column>
                <DataValue>{user.username}</DataValue>
              </Column>
              <Column>
                <DataValue>{user.userId}</DataValue>
              </Column>

              <Column>
                <DataValue>{user.pass}</DataValue>
              </Column>
              <Column>
                <Button onClick={deleteUserHandler} color="black">
                  <ButtonText>حذف</ButtonText>
                </Button>
                <Button onClick={changeHandler} color="gray">
                  <ButtonText>به روز رسانی</ButtonText>
                </Button>
              </Column>
            </DataRow>
          ))}
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
  display: flex;
  align-items: center;
  flex-direction: column;

  background-color: white;

  overflow: hidden;

  height: 100%;
  width: 100%;
`;
const RowsContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;
const DataRow = styled.div`
  display: flex;
  flex-direction: row-reverse;

  min-height: 47px;
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

const DataValue = styled.p`
  color: inherit;
  font-family: 'Dana-Regular', Helvetica, Arial, serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  margin: 0;

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
  padding: 14px 48px 10px 48px;
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
  height: 30px;
  width: 110px;
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

export default AllUsers;
