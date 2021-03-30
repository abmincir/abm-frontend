import { IonLoading, IonToast } from '@ionic/react';
import { Dialog } from '@material-ui/core';
import Axios from 'axios';
import moment from 'moment-jalaali';
import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-modern-calendar-datepicker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import styled, { css } from 'styled-components';
import SideMenu from '../SideMenu/SideMenu';
import Modal from './Modal';

const URI = process.env.REACT_APP_REST_ENDPOINT;

const Home = () => {
  const today = moment().format('jYYYY/jMM/jDD');

  const dateInfo = today.split('/');
  const todayDate = {
    day: +dateInfo[2],
    month: +dateInfo[1],
    year: +dateInfo[0],
  };

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [calendarStartDate, setCalendarStartDate] = useState(todayDate);
  const [calendarEndDate, setCalendarEndDate] = useState(todayDate);

  const [startDateCalendarOpen, setStartDateCalendarOpen] = useState(false);
  const [endDateCalendarOpen, setEndDateCalendarOpen] = useState(false);

  const [billNumber, setBillNumber] = useState('');

  const [isShowingModal, setIsShowingModal] = useState(false);

  const [visible, setVisible] = useState(false);
  const [isAdmin, setAdmin] = useState(false);

  const [bill, setBill] = useState();
  const [bills, setBills] = useState([]);

  const [searchLoading, setSearchLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);

  const [message, setMessage] = useState('');
  const [showMassage, setShowMassage] = useState(false);

  const searchHandler = () => {
    setSearchLoading(true);
    const data = {
      startDate,
      endDate,
      billNumber,
    };

    Axios.post(`${URI}/bill/all`, data)
      .then((result) => {
        console.log(result.data);
        setBills(result.data.bill);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSearchLoading(false);
      });
  };

  const fetchHandler = () => {
    setFetchLoading(true);

    const data = {
      startDate,
      endDate,
    };

    Axios.post(`${URI}/bill/update-db`, data)
      .then((result) => {
        console.log(result);
        setBills(result.data.bill);
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = JSON.parse(error.request.response);
        console.log(errorMessage.message);
      })
      .finally(() => {
        setFetchLoading(false);
      });
  };

  const onCheckClick = (bill) => {
    setCheckLoading(true);

    const data = {
      _id: bill._id,
      purchaseId: bill.purchaseId,
      weight: bill.bill.weight,
      billNumber: bill.bill.number,
    };

    Axios.post(`${URI}/bill/estelam`, data)
      .then((result) => {
        console.log(result);

        searchHandler();

        setMessage('استعلام موفقیت آمیز بود');
        setShowMassage(true);
      })
      .catch((error) => {
        const errorMessage = JSON.parse(error.request.response);
        console.log(errorMessage);
        setMessage(errorMessage.err);
        setShowMassage(true);
      })
      .finally(() => {
        setFetchLoading(false);
      });
  };

  const switchModal = (bill) => {
    setBill(bill);
    setIsShowingModal(!isShowingModal);
  };

  useEffect(() => {
    console.log('checked', localStorage.getItem('isAdmin'));
    setAdmin(localStorage.getItem('isAdmin') === 'true');

    searchHandler();
  }, []);

  const calculateTime = (v) => {
    const faDate = v && `${v.year}/${v.month}/${v.day}`;

    if (!faDate) {
      return null;
    }

    const momentTime = moment(faDate, 'jYYYY/jMM/jDD');
    return momentTime.format('jYYYY/jMM/jDD');
  };

  const onKeyPress = (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
      searchHandler();
    }
  };

  return (
    <>
      <Container>
        <IonLoading
          cssClass="custom-loading"
          isOpen={fetchLoading}
          onDidDismiss={() => setFetchLoading(false)}
          message={'در حال به روز رسانی'}
          duration={5000}
        />
        <IonLoading
          cssClass="custom-loading"
          isOpen={searchLoading}
          onDidDismiss={() => setSearchLoading(false)}
          message={'در حال جستجو'}
          duration={5000}
        />

        <IonLoading
          cssClass="custom-loading"
          isOpen={checkLoading}
          onDidDismiss={() => {
            setCheckLoading(false);
          }}
          message={'در حال استعلام'}
          duration={4000}
        />

        <BlurContainer onClick={() => setVisible(false)} visible={visible} />

        <SideMenuContainer visible={visible}>
          <SideMenu />
        </SideMenuContainer>

        <Header isAdmin={isAdmin}>
          <div onClick={() => setVisible(!visible)}>{menu}</div>
          <p>کشت و صنعت اکسون</p>
        </Header>

        <ButtonsContainer>
          <Button onClick={searchHandler} color={isAdmin ? 'gray' : 'green'}>
            <ButtonText>جست و جو</ButtonText>
          </Button>

          <Button onClick={fetchHandler} color={isAdmin ? 'black' : 'gray'}>
            <ButtonText>بروزرسانی</ButtonText>
          </Button>

          <Dialog
            open={startDateCalendarOpen}
            onClose={() => setStartDateCalendarOpen(false)}
          >
            <Calendar
              calendarClassName="custom-calendar"
              value={calendarStartDate}
              onChange={(value) => {
                console.log({ raw: value, calc: calculateTime(value) });
                setCalendarStartDate(value);
                setStartDate(calculateTime(value));
                setStartDateCalendarOpen(false);
              }}
              locale="fa"
              shouldHighlightWeekends
            />
          </Dialog>

          <Dialog
            open={endDateCalendarOpen}
            onClose={() => setEndDateCalendarOpen(false)}
          >
            <Calendar
              calendarClassName="custom-calendar"
              value={calendarEndDate}
              onChange={(value) => {
                setCalendarEndDate(value);
                setEndDate(calculateTime(value));
                setEndDateCalendarOpen(false);
              }}
              locale="fa"
              shouldHighlightWeekends
            />
          </Dialog>

          <DateSection>
            <DateInput>
              <DateText>شماره بارنامه</DateText>
              <BillNumberInput
                onChange={(e) => setBillNumber(e.target.value)}
                onKeyPress={onKeyPress}
              ></BillNumberInput>

              <DateText onClick={() => setStartDateCalendarOpen(true)}>
                از تاریخ
              </DateText>
              <DateValue onClick={() => setStartDateCalendarOpen(true)}>
                {startDate || 'امروز'}
              </DateValue>

              <DateText onClick={() => setEndDateCalendarOpen(true)}>
                تا تاریخ
              </DateText>

              <DateValue onClick={() => setEndDateCalendarOpen(true)}>
                {endDate || 'امروز'}
              </DateValue>
            </DateInput>
          </DateSection>
        </ButtonsContainer>

        <ColumnsSection>
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

        <RowsContainer>
          {bills.map((bill) => {
            return (
              <DataRow
                id={bill._id}
                unknown={bill.status === -1}
                success={bill.status === 1}
                warning={bill.status === 0}
                fail={bill.status === 2}
                onClick={() => switchModal(bill)}
              >
                <Column>
                  <DataValue>
                    {bill.purchaseId ? bill.purchaseId : 'نامشخص'}
                  </DataValue>
                </Column>
                <Column>
                  <DataValue>
                    {bill.spsWeight ? bill.spsWeight : 'نامشخص'}
                  </DataValue>
                </Column>
                <Column>
                  <DataValue>{bill.bill.weight}</DataValue>
                </Column>
                <Column>
                  <DataValue>{bill.bill.date}</DataValue>
                </Column>
                <Column>
                  <DataValue>{bill.bill.number}</DataValue>
                </Column>
                <Column>
                  <DataValue>{bill.product.name}</DataValue>
                </Column>

                <NameColumn>
                  <DataValue>{bill.customer.name}</DataValue>
                </NameColumn>

                <StatusColumn
                  onClick={(e) => {
                    e.stopPropagation();
                    onCheckClick(bill);
                  }}
                >
                  {bill.status === -1
                    ? unknown
                    : bill.status === 1
                    ? success
                    : bill.status === 0
                    ? warning
                    : fail}
                </StatusColumn>
              </DataRow>
            );
          })}

          {bills.length === 0 && (
            <DataRow>
              <Column>
                <DataValue>موردی یافت نشد</DataValue>
              </Column>
            </DataRow>
          )}
        </RowsContainer>
      </Container>

      <Modal
        bill={bill}
        displayModal={isShowingModal}
        closeModal={switchModal}
      />

      <IonToast
        isOpen={showMassage}
        cssClass="custom-toast"
        onDidDismiss={() => setShowMassage(false)}
        message={message}
        duration={1000}
      />
    </>
  );
};

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
  z-index: 1;

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

const SideMenuContainer = styled.div`
  top: 0px;
  right: -333px;
  width: 333px;
  height: 100%;
  position: fixed;
  z-index: 2;
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

const Header = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: center;

  width: 100vw;
  height: 70px;
  min-height: 70px;
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

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.161);
  height: 80px;
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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row-reverse;
`;

const DateValue = styled.p`
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

const BillNumberInput = styled.input`
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
  min-height: 70px;
  width: 100%;
  padding: 14px 48px 10px 48px;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 0;
  flex-grow: 1;
`;

//todo Get BLUR EFFECT
const NameColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 0;
  flex-grow: 1;
  min-width: 280px;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 280px;
  direction: rtl;
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

const RowsContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const DataRow = styled.div`
  display: flex;
  flex-direction: row-reverse;

  min-height: 66px;
  width: calc(100% - 81px);
  padding: 0;
  margin-top: 24px;
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

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  direction: rtl;
`;

export default Home;
