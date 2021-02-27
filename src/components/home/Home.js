import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { toPersian } from '../../numbers';
import Modal from './Modal';

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
    class="feather feather-menu menu-animation"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const success = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
    <circle cx="25" cy="25" r="25" fill="#25e1a1" />
    <path
      width="32"
      height="32"
      fill="none"
      stroke="#fff"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-miterlimit="10"
      d="M38 15L22 33l-10-8"
    />
  </svg>
);

const unknown = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path
      d="M256 0C114.8 0 0 114.8 0 256s114.8 256 256 256 256-114.8 256-256S397.2 0 256 0z"
      fill="#707070"
    />
    <path
      d="M277.3 384c0 11.8-9.6 21.3-21.3 21.3s-21.3-9.6-21.3-21.3 9.6-21.3 21.3-21.3 21.3 9.5 21.3 21.3z"
      fill="#eceff1"
    />
    <path
      d="M289.8 269.7c-7.6 3.5-12.4 11.1-12.4 19.4v9.6c0 11.8-9.5 21.3-21.3 21.3s-21.3-9.6-21.3-21.3v-9.6c0-24.9 14.6-47.7 37.2-58.2 21.7-10 37.4-36.6 37.4-49.6 0-29.4-23.9-53.3-53.3-53.3s-53.3 23.9-53.3 53.3c0 11.8-9.5 21.3-21.3 21.3s-21.3-9.6-21.3-21.3c0-52.9 43.1-96 96-96s96 43.1 96 96c-.2 28.9-25.2 71.2-62.4 88.4z"
      fill="#fafafa"
    />
  </svg>
);

const warning = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path
      d="M256 0C114.8 0 0 114.8 0 256s114.8 256 256 256 256-114.8 256-256S397.2 0 256 0z"
      fill="#ff9100"
    />
    <path
      d="M277.3 384c0 11.8-9.6 21.3-21.3 21.3s-21.3-9.6-21.3-21.3 9.6-21.3 21.3-21.3 21.3 9.5 21.3 21.3z"
      fill="#eceff1"
    />
    <path
      d="M277.3 298.7c0 11.8-9.6 21.3-21.3 21.3s-21.3-9.6-21.3-21.3V128c0-11.8 9.6-21.3 21.3-21.3s21.3 9.6 21.3 21.3v170.7z"
      fill="#fafafa"
    />
  </svg>
);

const fail = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72.434 72.437">
    <path
      d="M36.22 0C16.212 0 0 16.215 0 36.223c0 19.999 16.212 36.214 36.22 36.214s36.214-16.215 36.214-36.214C72.434 16.215 56.228 0 36.22 0zm15.592 48.083l-4.565 4.565-11.02-11.021L24.86 52.995l-4.565-4.565 11.367-11.367L20.639 26.04l4.568-4.565 11.02 11.02 11.349-11.343 4.565 4.565-11.349 11.346 11.02 11.02z"
      fill="#FF6B6B"
    />
  </svg>
);

const Home = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isShowingModal, setIsShowingModal] = useState(false);

  const switchModal = () => {
    setIsShowingModal(!isShowingModal);
  };

  return (
    <>
      {' '}
      <Container>
        <Header>
          {menu}
          <p>کشت و صنعت اکسون</p>
        </Header>

        <ButtonsContainer>
          <Button green>
            <ButtonText>جست و جو</ButtonText>
          </Button>

          <Button gray>
            <ButtonText>بروزرسانی</ButtonText>
          </Button>

          <DateSection>
            <DateText>از تاریخ</DateText>
            <DateInput>
              <DateValue
                placeholder="---- / -- / --"
                type="text"
                value={startDate}
                onChange={(e) => {
                  if (e.target.value.length > 10) return;
                  if (e.target.value.length < startDate.length) {
                    setStartDate('');
                    return;
                  }
                  if (
                    e.target.value.length === 4 ||
                    e.target.value.length === 7
                  )
                    setStartDate(e.target.value + '/');
                  else setStartDate(e.target.value);
                }}
              ></DateValue>

              <DateText>تا تاریخ</DateText>

              <DateValue
                placeholder="---- / -- / --"
                type="text"
                value={endDate}
                onChange={(e) => {
                  if (e.target.value.length > 10) return;
                  if (e.target.value.length < endDate.length) {
                    setEndDate('');
                    return;
                  }
                  if (
                    e.target.value.length === 4 ||
                    e.target.value.length === 7
                  )
                    setEndDate(e.target.value + '/');
                  else setEndDate(e.target.value);
                }}
              ></DateValue>
            </DateInput>
          </DateSection>
        </ButtonsContainer>

        <ColumnsSection>
          <CheckBoxColumn></CheckBoxColumn>
          <Column>
            <ColumnsTitle>شناسه بازارگاه</ColumnsTitle>
          </Column>
          <Column>
            <ColumnsTitle>وزن بازارگاه</ColumnsTitle>
          </Column>
          <Column>
            <ColumnsTitle>وزن بارنامه</ColumnsTitle>
          </Column>
          <Column>
            <ColumnsTitle>تاریخ بارنامه</ColumnsTitle>
          </Column>
          <Column>
            <ColumnsTitle>شماره بارنامه</ColumnsTitle>
          </Column>
          <Column>
            <ColumnsTitle>نام کالا</ColumnsTitle>
          </Column>

          <NameColumn>
            <ColumnsTitle>نام خریدار</ColumnsTitle>
          </NameColumn>

          <StatusColumn>
            <ColumnsTitle>وضعیت استعلام</ColumnsTitle>
          </StatusColumn>
        </ColumnsSection>

        <DataRow success onClick={switchModal}>
          <CheckBoxColumn></CheckBoxColumn>
          <Column>
            <DataValue>{toPersian(349203)}</DataValue>
          </Column>
          <Column>
            <DataValue>{toPersian(116200)}</DataValue>
          </Column>
          <Column>
            <DataValue>{toPersian(25077)}</DataValue>
          </Column>
          <Column>
            <DataValue>{toPersian('99/11/03')}</DataValue>
          </Column>
          <Column>
            <DataValue>{toPersian('384120-32/99')}</DataValue>
          </Column>
          <Column>
            <DataValue>ذرت برزيل</DataValue>
          </Column>

          <NameColumn>
            <DataValue>کشت و صنعت فتح خرم دشت</DataValue>
          </NameColumn>

          <StatusColumn>{success}</StatusColumn>
        </DataRow>

        <DataRow success onClick={switchModal}>
          <CheckBoxColumn></CheckBoxColumn>
          <Column>
            <DataValue>{toPersian(349203)}</DataValue>
          </Column>
          <Column>
            <DataValue>{toPersian(116200)}</DataValue>
          </Column>
          <Column>
            <DataValue>{toPersian(25009)}</DataValue>
          </Column>
          <Column>
            <DataValue>{toPersian('99/11/03')}</DataValue>
          </Column>
          <Column>
            <DataValue>{toPersian('384119-32/99')}</DataValue>
          </Column>
          <Column>
            <DataValue>ذرت برزيل</DataValue>
          </Column>

          <NameColumn>
            <DataValue>کشت و صنعت فتح خرم دشت</DataValue>
          </NameColumn>

          <StatusColumn>{success}</StatusColumn>
        </DataRow>

        <DataRow warning onClick={switchModal}>
          <CheckBoxColumn></CheckBoxColumn>
          <Column>
            <DataValue>{toPersian(349204)}</DataValue>
          </Column>
          <Column>
            <DataValue>{toPersian(116100)}</DataValue>
          </Column>
          <Column>
            <DataValue>{toPersian(20626)}</DataValue>
          </Column>
          <Column>
            <DataValue>{toPersian('99/11/02')}</DataValue>
          </Column>
          <Column>
            <DataValue>{toPersian('384118-32/99')}</DataValue>
          </Column>
          <Column>
            <DataValue>سويا پرک</DataValue>
          </Column>

          <NameColumn>
            <DataValue>شماره 28 مرغ مادر پيرانشهر</DataValue>
          </NameColumn>

          <StatusColumn>{warning}</StatusColumn>
        </DataRow>

        <DataRow fail onClick={switchModal}>
          <CheckBoxColumn></CheckBoxColumn>
          <Column>
            <DataValue>{toPersian(349100)}</DataValue>
          </Column>
          <Column>
            <DataValue>{toPersian(116350)}</DataValue>
          </Column>
          <Column>
            <DataValue>{toPersian(23420)}</DataValue>
          </Column>
          <Column>
            <DataValue>{toPersian('99/11/02')}</DataValue>
          </Column>
          <Column>
            <DataValue>{toPersian('384129-32/99')}</DataValue>
          </Column>
          <Column>
            <DataValue>جو روس</DataValue>
          </Column>

          <NameColumn>
            <DataValue>توليد کشاورزي دامداران استان کردستان</DataValue>
          </NameColumn>

          <StatusColumn>{fail}</StatusColumn>
        </DataRow>

        <DataRow unknown onClick={switchModal}>
          <CheckBoxColumn></CheckBoxColumn>
          <Column>
            <DataValue>{toPersian(349225)}</DataValue>
          </Column>
          <Column>
            <DataValue>{toPersian(116157)}</DataValue>
          </Column>
          <Column>
            <DataValue>{toPersian(25149)}</DataValue>
          </Column>
          <Column>
            <DataValue>{toPersian('99/11/04')}</DataValue>
          </Column>
          <Column>
            <DataValue>{toPersian('384173-32/98')}</DataValue>
          </Column>
          <Column>
            <DataValue>سويا پرک</DataValue>
          </Column>

          <NameColumn>
            <DataValue>خوراك دام و طيور بهمن زواره</DataValue>
          </NameColumn>

          <StatusColumn>{unknown}</StatusColumn>
        </DataRow>
      </Container>
      <Modal displayModal={isShowingModal} closeModal={switchModal} />
    </>
  );
};

const Container = styled.div`
  align-items: center;
  background-color: white;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: center;

  background-color: var(--caribbean-green);

  width: 100vw;
  height: 66px;
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
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.161);
  height: 70px;
  width: 100vw;

  padding: 0 48px;
`;

const Button = styled.div`
  pointer-events: auto;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
  ${(props) =>
    props.green &&
    css`
      background: var(--caribbean-green);
    `}

  ${(props) =>
    props.gray &&
    css`
      background: var(--dove-gray);
    `}
  border-radius: 12px;
  height: 44px;
  width: 150px;
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

const DateSection = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;

  width: calc(100% - 330px);
  min-height: 70px;
`;

const DateText = styled.p`
  color: var(--dove-gray);
  font-family: 'Dana-Regular', Helvetica, Arial, serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  margin: 0 40px 0 24px;
`;

const DateInput = styled.form`
width=100%;
display: flex;
  align-items: center;
  justify-content: center;
  flex-direction= row-reverse;
`;

const DateValue = styled.input`
  border: 1px solid var(--dove-gray);
  background-color: white;
  border-radius: 20px;
  height: 46px;
  opacity: 0.5;
  width: 210px;
  margin: 0 0 0 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--dove-gray);
  font-family: 'Dana-Regular', Helvetica, Arial, serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  opacity: 1;
  margin: 0;
`;

const ColumnsSection = styled.div`
  display: flex;
  flex-direction: row-reverse;
  min-height: 65px;
  width: 100%;
  padding: 48px 48px 0 48px;
`;

const CheckBoxColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 0;
  flex-grow: 1;
  max-width: 24px;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 0;
  flex-grow: 1;
`;

const NameColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 0;
  flex-grow: 1;
  min-width: 280px;
`;

const StatusColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 0;
  flex-grow: 1;
  max-width: 140px;
  max-height: 66px;

  svg {
    width: 32px;
    height: 32px;
  }
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

const DataRow = styled.div`
  display: flex;
  flex-direction: row-reverse;

  min-height: 66px;
  width: calc(100% - 96px);
  padding: 0;
  margin-top: 24px;

  background-color: white;
  border-radius: 12px;

  ${(props) =>
    props.success &&
    css`
      color: var(--green);
      box-shadow: -2px 2px 8px 2px rgba(37, 255, 161, 0.2);
    `}

  ${(props) =>
    props.warning &&
    css`
      color: var(--pizazz);
      box-shadow: -2px 2px 8px 2px rgba(255, 145, 0, 0.2);
    `}

  ${(props) =>
    props.fail &&
    css`
      color: var(--bittersweet);
      box-shadow: -2px 2px 8px 2px rgba(255, 107, 107, 0.2);
    `}

  ${(props) =>
    props.unknown &&
    css`
      color: var(--dove-gray);
      box-shadow: -2px 2px 8px 2px rgba(0, 0, 0, 0.1);
    `}
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
`;

export default Home;
