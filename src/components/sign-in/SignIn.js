import Axios from 'axios';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const SignIn = () => {
  const [user, setUser] = useState('');

  const [pass, setPass] = useState('');
  const data = {
    username: user,
    password: pass,
  };

  const headers = {
    'Content-Type': 'application/json',
  };
  const [isAdmin, setAdmin] = useState(false);

  return (
    <Wrapper>
      <Header isAdmin={isAdmin} />
      <Content>
        <SignInBox>
          <SelectionBox>
            <User onClick={() => setAdmin(false)} isAdmin={isAdmin}>
              ورود کاربر
            </User>
            <MidLine></MidLine>
            <Admin onClick={() => setAdmin(true)} isAdmin={isAdmin}>
              ورود مدیر
            </Admin>
          </SelectionBox>
          <FlexWrapper>
            <UserName
              type="text"
              name="user"
              id="user"
              placeholder="نام کاربری"
              value={user}
              onChange={(u) => {
                setUser(u.target.value);
                console.log(u.target.value);
              }}
            ></UserName>

            <Password
              type="password"
              name="pass"
              placeholder="رمز عبور"
              value={pass}
              onChange={(p) => {
                setPass(p.target.value);
                console.log(p.target.value);
              }}
            ></Password>
            <Enter
              isAdmin={isAdmin}
              onClick={() => {
                Axios.post('/update-course-picture/', data, headers)
                  .then((res) => console.log(res))
                  .catch((err) => console.log(err.response))
                  .finally(() => {
                    //allways run
                  });
              }}
            >
              ورود
            </Enter>
          </FlexWrapper>
        </SignInBox>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  background-color: white;

  overflow: hidden;

  height: 100%;
  width: 100%;
`;
const Header = styled.div`
  height: 66px;
  width: 1366px;
  ${(props) =>
    props.isAdmin
      ? css`
          background-color: rgba(112, 112, 112, 1) !important;
        `
      : css`
          background-color: var(--caribbean-green);
        `}
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
  align-content: center;
  justify-items: center;
  overflow: hidden;
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
  background-color: white;

  display: flex;
  flex-direction: column;

  justify-content: flex-start;
  align-items: center;

  margin-left: 0.96px;
  margin-top: 159px;

  min-width: 384px;

  border-radius: 40px;
  border: 1px solid var(--dove-gray);
  background-color: white;

  height: 316px;
  width: 384px;

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
