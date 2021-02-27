import React, { useState } from 'react';
import styled from 'styled-components';

const SignIn = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  return (
    <SignInBox>
      <SelectionBox>
        <User>ورود کاربر</User>
        <MidLine></MidLine>
        <Admin>ورود مدیر</Admin>
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
        <Enter>ورود</Enter>
      </FlexWrapper>
    </SignInBox>
  );
};

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

  pointer-events: auto;
  transition: all 0.5s ease;
  &:hover {
    transform: translate(5px, 0);
    cursor: pointer;
  }
`;
const MidLine = styled.div`
  background-color: var(--dove-gray);
  height: 46px;
  width: 1px;
`;
const User = styled.div`
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

  pointer-events: auto;
  transition: all 0.5s ease;
  &:hover {
    transform: translate(-5px, 0);
    cursor: pointer;
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
