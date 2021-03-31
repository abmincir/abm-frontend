import React, { useState } from 'react';
import styled from 'styled-components';

const AllUsers = () => {
  const [users, setUsers] = useState([
    { username: 'user1', userId: 'user1', pass: '123', key: 1 },
    { username: 'user2', userId: 'user2', pass: '123', key: 2 },
    { username: 'user3', userId: 'user3', pass: '123', key: 3 },
  ]);

  return (
    <>
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
            </DataRow>
          ))}
        </RowsContainer>
      </Wrapper>
    </>
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
