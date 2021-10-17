import {
  IonItem,
  IonLabel,
  IonLoading,
  IonSelect,
  IonSelectOption,
  IonToast,
} from '@ionic/react';
import { Dialog } from '@material-ui/core';
import Axios from 'axios';
import moment from 'moment-jalaali';
import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-modern-calendar-datepicker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import styled, { css } from 'styled-components';
import SideMenu from '../side-menu/SideMenu';
import Modal from './Modal';
import * as actions from '../../actions';
import store from '../../store';
import arrowDown from '../../fonts/down_arrow_icon.svg';

const URI = process.env.REACT_APP_REST_ENDPOINT;
const Home = () => {
  // const today = moment().format('jYYYY/jMM/jDD');

  // const dateInfo = today.split('/');
  // const todayDate = {
  //   day: +dateInfo[2],
  //   month: +dateInfo[1],
  //   year: +dateInfo[0],
  // };
  const [startDateBill, setStartDateBill] = useState('');
  const [endDateBill, setEndDateBill] = useState('');

  const [calendarStartDateBill, setCalendarStartDateBill] = useState(null);
  const [calendarEndDateBill, setCalendarEndDateBill] = useState(null);

  const [startDateCalendarOpenBill, setStartDateCalendarOpenBill] =
    useState(false);
  const [endDateCalendarOpenBill, setEndDateCalendarOpenBill] = useState(false);

  const [startDateSave, setStartDateSave] = useState('');
  const [endDateSave, setEndDateSave] = useState('');

  const [calendarStartDateSave, setCalendarStartDateSave] = useState(null);
  const [calendarEndDateSave, setCalendarEndDateSave] = useState(null);

  const [startDateCalendarOpenSave, setStartDateCalendarOpenSave] =
    useState(false);
  const [endDateCalendarOpenSave, setEndDateCalendarOpenSave] = useState(false);

  const [productName, setProductName] = useState('');
  const [billNumber, setBillNumber] = useState('');
  const [purchaseNumber, setPurchaseNumber] = useState('');

  const [statusFilter, setStatusFilter] = useState(-2);

  const [isShowingModal, setIsShowingModal] = useState(false);

  const [visible, setVisible] = useState(false);
  const [isAdmin, setAdmin] = useState(false);

  const [bill, setBill] = useState();
  const [isAllSelected, setAllSelected] = useState(false);
  const [bills, setBills] = useState([]);
  const [selectedBills, setSelectedBills] = useState([]);

  const [totalWeight, setTotalWeight] = useState(0);

  const [searchLoading, setSearchLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);

  const [inquiryMessage, setInquiryMessage] = useState('در حال استعلام');
  const [message, setMessage] = useState('');
  const [showMassage, setShowMassage] = useState(false);

  const searchHandler = () => {
    setSearchLoading(true);
    const data = {
      startDateBill,
      endDateBill,
      startDateSave,
      endDateSave,
      billNumber,
      purchaseNumber,
      status: statusFilter,
      productName,
      sort: sortObj,
      dbId: dataBaseSelected._id,
    };

    Axios.post(`${URI}/bill/all`, data)
      .then((result) => {
        const fetchedBills = result.data.bill.map((bill) => {
          if (dataBaseSelected.isShamsi) {
            return { ...bill, selected: false };
          }

          let b = { ...bill, selected: false };
          console.log(moment(b.bill.date).format('jYYYY/jMM/jDD'), b.bill.date);

          b.bill.date = moment(b.bill.date).format('jYYYY/jMM/jDD');
          b.draft.date = moment(b.draft.date).format('jYYYY/jMM/jDD');
          b.saveDate = moment(b.saveDate).format('jYYYY/jMM/jDD');

          return b;
        });

        setBills(fetchedBills);

        if (bills.length) {
          setTotalWeight(
            bills
              .map((bill) => {
                return +bill.bill.weight;
              })
              .reduce((totalWeight, billWeight) => totalWeight + billWeight)
          );
        }

        setSelectedBills([]);
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
      startDate: startDateSave,
      endDate: endDateSave,
      dbId: dataBaseSelected._id,
    };

    console.log({
      startDateBill,
      endDateBill,
      startDateSave,
      endDateSave,
    });

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
      username: localStorage.getItem('username'),
      accountId: accountSelected._id,
    };
    console.log(data, accountSelected._id);

    Axios.post(`${URI}/bill/estelam`, data)
      .then((result) => {
        console.log(result);

        setMessage('استعلام موفقیت آمیز بود');
        setShowMassage(true);
      })
      .catch((error) => {
        let errorMessage = JSON.parse(error.request.response);
        console.log(errorMessage);

        errorMessage = errorMessage ?? 'خطا در اتصال به بازارگاه';

        if (errorMessage.insertError) {
          setMessage(errorMessage.insertError);
        }

        setMessage(errorMessage.err);
        setShowMassage(true);
      })
      .finally(() => {
        searchHandler();

        setCheckLoading(false);
        setFetchLoading(false);
      });
  };

  const selectedBillsInquiry = async () => {
    if (!selectedBills.length) {
      setMessage('هیچ موردی انتخاب نشده است');
      setShowMassage(true);
      return;
    }
    for (let i = 0; i < selectedBills.length; i++) {
      let bill = selectedBills[i];
      const data = {
        _id: bill._id,
        purchaseId: bill.purchaseId,
        weight: bill.bill.weight,
        billNumber: bill.bill.number,
        username: localStorage.getItem('username'),
        accountId: accountSelected._id,
      };

      try {
        setInquiryMessage(`در حال استعلام ${i + 1} از ${selectedBills.length}`);
        setCheckLoading(true);
        const result = await Axios.post(`${URI}/bill/estelam`, data);
        console.log(result);

        setMessage('استعلام موفقیت آمیز بود');
        setShowMassage(true);
      } catch (error) {
        const errorMessage = JSON.parse(error.request.response);
        console.log(errorMessage);
        setMessage(errorMessage.err);
        setShowMassage(true);
      } finally {
        setCheckLoading(false);
        setFetchLoading(false);
      }

      if (i + 1 === selectedBills.length) {
        searchHandler();
      }
    }
  };

  const switchModal = (bill) => {
    setBill(bill);
    setIsShowingModal(!isShowingModal);
  };

  const [dataBases, setDataBases] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    console.log(store.getState().dataBase);

    setAdmin(localStorage.getItem('isAdmin') === 'true');
    searchHandler();
    Axios.get(`${URI}/databases/all`)
      .then((result) => {
        setDataBases(
          result.data.dbs.map(
            ({
              name,
              title,
              address,
              username,
              password,
              isShamsi,
              proc,
              _id,
            }) => {
              return {
                name,
                title,
                address,
                username,
                password,
                isShamsi,
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
          result.data.accounts.map(({ username, title, password, _id }) => {
            return {
              username,
              title,
              password,
              _id,
            };
          })
        );
      })
      .catch((e) => console.error(e));
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

  const checkAllHandler = () => {
    setAllSelected(!isAllSelected);

    setBills([
      ...bills.map((bill) => {
        bill.selected = isAllSelected;
        return bill;
      }),
    ]);

    setSelectedBills([...bills.filter((bill) => bill.selected)]);
  };

  // select box

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
    title,
    address,
    username,
    password,
    isShamsi,
    proc,
    data
  ) => {
    setActiveDataBase(false);
    setDataBaseSelected(data);
    actions.dataBaseChange(
      _id,
      name,
      title,
      address,
      username,
      password,
      isShamsi,
      proc
    );
  };

  const toggleSelectedAccount = (_id, username, title, password, acc) => {
    setAccountSelected(acc);
    setActiveAccount(false);
    actions.accountChange(_id, username, title, password);
  };

  const [sortObj, setSortObj] = useState({
    purchaseId: 0,
    spsWeight: 0,
    billWeight: 0,
    saveDate: 0,
    billDate: 0,
    billSerial: 0,
    billNumber: 0,
    productName: 0,
    customerName: 0,
    billStatus: 0,
  });

  const sortByPurchaseId = () => {
    if (sortObj.purchaseId === 0) {
      setSortObj({ ...sortObj, purchaseId: 1 });
    } else if (sortObj.purchaseId === 1) {
      setSortObj({ ...sortObj, purchaseId: -1 });
    } else {
      setSortObj({ ...sortObj, purchaseId: 0 });
    }
  };

  const sortBySpsWeight = () => {
    if (sortObj.spsWeight === 0) {
      setSortObj({ ...sortObj, spsWeight: 1 });
    } else if (sortObj.spsWeight === 1) {
      setSortObj({ ...sortObj, spsWeight: -1 });
    } else {
      setSortObj({ ...sortObj, spsWeight: 0 });
    }
  };

  const sortByBillWeight = () => {
    if (sortObj.billWeight === 0) {
      setSortObj({ ...sortObj, billWeight: 1 });
    } else if (sortObj.billWeight === 1) {
      setSortObj({ ...sortObj, billWeight: -1 });
    } else {
      setSortObj({ ...sortObj, billWeight: 0 });
    }
  };

  const sortBySaveDate = () => {
    if (sortObj.saveDate === 0) {
      setSortObj({ ...sortObj, saveDate: 1 });
    } else if (sortObj.saveDate === 1) {
      setSortObj({ ...sortObj, saveDate: -1 });
    } else {
      setSortObj({ ...sortObj, saveDate: 0 });
    }
  };

  const sortByBillDate = () => {
    if (sortObj.billDate === 0) {
      setSortObj({ ...sortObj, billDate: 1 });
    } else if (sortObj.billDate === 1) {
      setSortObj({ ...sortObj, billDate: -1 });
    } else {
      setSortObj({ ...sortObj, billDate: 0 });
    }
  };

  const sortByBillSerial = () => {
    if (sortObj.billSerial === 0) {
      setSortObj({ ...sortObj, billSerial: 1 });
    } else if (sortObj.billSerial === 1) {
      setSortObj({ ...sortObj, billSerial: -1 });
    } else {
      setSortObj({ ...sortObj, billSerial: 0 });
    }
  };

  const sortByProductName = () => {
    if (sortObj.productName === 0) {
      setSortObj({ ...sortObj, productName: 1 });
    } else if (sortObj.productName === 1) {
      setSortObj({ ...sortObj, productName: -1 });
    } else {
      setSortObj({ ...sortObj, productName: 0 });
    }
  };

  const sortByBillNumber = () => {
    if (sortObj.billNumber === 0) {
      setSortObj({ ...sortObj, billNumber: 1 });
    } else if (sortObj.billNumber === 1) {
      setSortObj({ ...sortObj, billNumber: -1 });
    } else {
      setSortObj({ ...sortObj, billNumber: 0 });
    }
  };

  const sortByCustomerName = () => {
    if (sortObj.customerName === 0) {
      setSortObj({ ...sortObj, customerName: 1 });
    } else if (sortObj.customerName === 1) {
      setSortObj({ ...sortObj, customerName: -1 });
    } else {
      setSortObj({ ...sortObj, customerName: 0 });
    }
  };

  const sortByBillStatus = () => {
    if (sortObj.billStatus === 0) {
      setSortObj({ ...sortObj, billStatus: 1 });
    } else if (sortObj.billStatus === 1) {
      setSortObj({ ...sortObj, billStatus: -1 });
    } else {
      setSortObj({ ...sortObj, billStatus: 0 });
    }
  };

  return (
    <>
      <IonLoading
        cssClass="custom-loading"
        isOpen={fetchLoading}
        onDidDismiss={() => setFetchLoading(false)}
        message={'در حال به روز رسانی'}
        duration={10000}
      />
      <IonLoading
        cssClass="custom-loading"
        isOpen={searchLoading}
        onDidDismiss={() => setSearchLoading(false)}
        message={'در حال جستجو'}
        duration={10000}
      />

      <IonLoading
        cssClass="custom-loading"
        isOpen={checkLoading}
        onDidDismiss={() => {
          setCheckLoading(false);
        }}
        message={inquiryMessage}
        duration={10000}
      />

      <SideMenuContainer visible={visible}>
        <SideMenu />
      </SideMenuContainer>
      <BlurContainer onClick={() => setVisible(false)} visible={visible} />

      <Header isAdmin={isAdmin}>
        <div onClick={() => setVisible(!visible)}>{menu}</div>
        <p>کشت و صنعت اکسون</p>
      </Header>

      <Container>
        <FiltersContainer>
          <Buttons>
            <ButtonsRow>
              <Button
                onClick={searchHandler}
                color={isAdmin ? 'gray' : 'green'}
              >
                <ButtonText>جست و جو</ButtonText>
              </Button>

              <Button
                onClick={fetchHandler}
                color={isAdmin ? 'rgb(32 107 116)' : 'gray'}
              >
                <ButtonText>بروزرسانی</ButtonText>
              </Button>
            </ButtonsRow>

            <ButtonsRow>
              <CheckAllBox
                onClick={checkAllHandler}
                color={isAdmin ? 'rgb(32 107 116)' : 'gray'}
              >
                <CheckAllTxt>انتخاب همه</CheckAllTxt>
              </CheckAllBox>
              <Button
                onClick={selectedBillsInquiry}
                color={selectedBills.length ? 'green' : 'gray'}
              >
                <ButtonText>
                  استعلام {'( ' + selectedBills.length + ' )'}
                </ButtonText>
              </Button>
            </ButtonsRow>

            <ShowTotalRowTop>
              <ShowTotal>
                <ShowTotalText>
                  بارنامه های پیدا شده : {'( ' + bills.length + ' )'}
                </ShowTotalText>
              </ShowTotal>
            </ShowTotalRowTop>
            <ShowTotalRow>
              <ShowTotal>
                <ShowTotalText>
                  مجموع وزن بارنامه ها :{' '}
                  {'( ' + totalWeight.toLocaleString() + ' )'}
                </ShowTotalText>
              </ShowTotal>
            </ShowTotalRow>
          </Buttons>

          <Dialog
            open={startDateCalendarOpenBill}
            onClose={() => setStartDateCalendarOpenBill(false)}
          >
            <Calendar
              calendarClassName="custom-calendar"
              value={calendarStartDateBill}
              onChange={(value) => {
                setCalendarStartDateBill(value);
                setStartDateBill(calculateTime(value));
                setStartDateCalendarOpenBill(false);
              }}
              locale="fa"
              shouldHighlightWeekends
            />
          </Dialog>

          <Dialog
            open={endDateCalendarOpenBill}
            onClose={() => setEndDateCalendarOpenBill(false)}
          >
            <Calendar
              calendarClassName="custom-calendar"
              value={calendarEndDateBill}
              onChange={(value) => {
                setCalendarEndDateBill(value);
                setEndDateBill(calculateTime(value));
                setEndDateCalendarOpenBill(false);
              }}
              locale="fa"
              shouldHighlightWeekends
            />
          </Dialog>

          <Dialog
            open={startDateCalendarOpenSave}
            onClose={() => setStartDateCalendarOpenSave(false)}
          >
            <Calendar
              calendarClassName="custom-calendar"
              value={calendarStartDateSave}
              onChange={(value) => {
                setCalendarStartDateSave(value);
                setStartDateSave(calculateTime(value));
                setStartDateCalendarOpenSave(false);
              }}
              locale="fa"
              shouldHighlightWeekends
            />
          </Dialog>

          <Dialog
            open={endDateCalendarOpenSave}
            onClose={() => setEndDateCalendarOpenSave(false)}
          >
            <Calendar
              calendarClassName="custom-calendar"
              value={calendarEndDateSave}
              onChange={(value) => {
                setCalendarEndDateSave(value);
                setEndDateSave(calculateTime(value));
                setEndDateCalendarOpenSave(false);
              }}
              locale="fa"
              shouldHighlightWeekends
            />
          </Dialog>

          <DateSectionContainer>
            <SelectionSection>
              <IonItem lines="none">
                <IonLabel>وضیعت استعلام</IonLabel>
                <IonSelect
                  mode="md"
                  value={statusFilter}
                  okText="تایید"
                  cancelText="لغو"
                  onIonChange={(e) => setStatusFilter(e.detail.value)}
                >
                  <IonSelectOption value="-2">همه</IonSelectOption>
                  <IonSelectOption value="-1">نامشخص</IonSelectOption>
                  <IonSelectOption value="1">موجود</IonSelectOption>
                  <IonSelectOption value="2">ناموجود</IonSelectOption>
                  <IonSelectOption value="0">عدم تطابق وزن</IonSelectOption>
                </IonSelect>
              </IonItem>

              <DateText>پایگاه داده</DateText>

              <SelectBox>
                <OptionContainer active={activeDataBase}>
                  {dataBases.map((d) => {
                    return (
                      <Option
                        onClick={(e) =>
                          toggleSelectedDataBase(
                            d._id,
                            d.name,
                            d.title,
                            d.address,
                            d.username,
                            d.password,
                            d.isShamsi,
                            d.proc,
                            d
                          )
                        }
                      >
                        {d.title}
                      </Option>
                    );
                  })}
                </OptionContainer>

                <SelectedOption onClick={toggleActiveDataBase}>
                  {dataBaseSelected === 0
                    ? 'انتخاب پایگاه داده'
                    : dataBaseSelected.title}
                </SelectedOption>
              </SelectBox>

              <DateText>حساب کاربری</DateText>
              <SelectBox>
                <OptionContainer active={activeAccount}>
                  {accounts.map((d) => {
                    return (
                      <Option
                        onClick={(e) =>
                          toggleSelectedAccount(
                            d._id,
                            d.username,
                            d.title,
                            d.password,
                            d
                          )
                        }
                      >
                        {d.title}
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
                    : accountSelected.title}
                </SelectedOption>
              </SelectBox>
            </SelectionSection>

            <DateSection>
              <DateInput>
                <DateTextFirstRow>شماره خرید</DateTextFirstRow>
                <BillNumberInput
                  onChange={(e) => setPurchaseNumber(e.target.value)}
                  onKeyPress={onKeyPress}
                ></BillNumberInput>

                <DateTextMarginLow>شماره بارنامه</DateTextMarginLow>
                <BillNumberInput
                  onChange={(e) => setBillNumber(e.target.value)}
                  onKeyPress={onKeyPress}
                ></BillNumberInput>

                <DateTextMarginHigh>نام کالا</DateTextMarginHigh>
                <BillNumberInput
                  style={{ 'font-size': '16px' }}
                  onChange={(e) => setProductName(e.target.value)}
                  onKeyPress={onKeyPress}
                ></BillNumberInput>
              </DateInput>
            </DateSection>

            <DateSection>
              <DateInput>
                <DateTextFirstRow
                  onClick={() => setStartDateCalendarOpenSave(true)}
                >
                  تاریخ ثبت از
                </DateTextFirstRow>
                <DateValue onClick={() => setStartDateCalendarOpenSave(true)}>
                  {startDateSave}
                </DateValue>
                {startDateSave && (
                  <CloseButton
                    onClick={() => {
                      setStartDateSave('');
                      setCalendarStartDateSave(null);
                    }}
                  >
                    X
                  </CloseButton>
                )}

                <DateTextFirstRow
                  onClick={() => setEndDateCalendarOpenSave(true)}
                >
                  تاریخ ثبت تا
                </DateTextFirstRow>

                <DateValue onClick={() => setEndDateCalendarOpenSave(true)}>
                  {endDateSave}
                </DateValue>
                {endDateSave && (
                  <CloseButton
                    onClick={() => {
                      setEndDateSave('');
                      setCalendarEndDateSave(null);
                    }}
                  >
                    X
                  </CloseButton>
                )}

                <DateTextBordered
                  onClick={() => setStartDateCalendarOpenBill(true)}
                >
                  تاریخ بارنامه از
                </DateTextBordered>
                <DateValue onClick={() => setStartDateCalendarOpenBill(true)}>
                  {startDateBill}
                </DateValue>
                {startDateBill && (
                  <CloseButton
                    onClick={() => {
                      setStartDateBill('');
                      setCalendarStartDateBill(null);
                    }}
                  >
                    X
                  </CloseButton>
                )}

                <DateText onClick={() => setEndDateCalendarOpenBill(true)}>
                  تاریخ بارنامه تا
                </DateText>

                <DateValue onClick={() => setEndDateCalendarOpenBill(true)}>
                  {endDateBill}
                </DateValue>
                {endDateBill && (
                  <CloseButton
                    onClick={() => {
                      setEndDateBill('');
                      setCalendarEndDateBill(null);
                    }}
                  >
                    X
                  </CloseButton>
                )}
              </DateInput>
            </DateSection>
          </DateSectionContainer>
        </FiltersContainer>

        <ColumnsSection>
          <CheckBoxColumn />
          <Column onClick={sortByPurchaseId}>
            <ColumnsTitle>
              <Arrow status={sortObj.purchaseId} src={arrowDown}></Arrow> شناسه
              بازارگاه
            </ColumnsTitle>
          </Column>
          <Column onClick={sortBySpsWeight}>
            <ColumnsTitle>
              <Arrow status={sortObj.spsWeight} src={arrowDown}></Arrow>وزن
              بازارگاه
            </ColumnsTitle>
          </Column>
          <Column onClick={sortByBillWeight}>
            <ColumnsTitle>
              <Arrow status={sortObj.billWeight} src={arrowDown}></Arrow>وزن
              بارنامه
            </ColumnsTitle>
          </Column>
          <Column onClick={sortBySaveDate}>
            <ColumnsTitle>
              <Arrow status={sortObj.saveDate} src={arrowDown}></Arrow>تاریخ ثبت
            </ColumnsTitle>
          </Column>
          <Column onClick={sortByBillDate}>
            <ColumnsTitle>
              <Arrow status={sortObj.billDate} src={arrowDown}></Arrow>تاریخ
              بارنامه
            </ColumnsTitle>
          </Column>
          <Column onClick={sortByBillSerial}>
            <ColumnsTitle>
              <Arrow status={sortObj.billSerial} src={arrowDown}></Arrow>سریال
              بارنامه
            </ColumnsTitle>
          </Column>
          <Column onClick={sortByBillNumber}>
            <ColumnsTitle>
              <Arrow status={sortObj.billNumber} src={arrowDown}></Arrow>شماره
              بارنامه
            </ColumnsTitle>
          </Column>
          <Column onClick={sortByProductName}>
            <ColumnsTitle>
              <Arrow status={sortObj.productName} src={arrowDown}></Arrow>نام
              کالا
            </ColumnsTitle>
          </Column>

          <NameColumn onClick={sortByCustomerName}>
            <ColumnsTitle>
              <Arrow status={sortObj.customerName} src={arrowDown}></Arrow>نام
              خریدار
            </ColumnsTitle>
          </NameColumn>

          <StatusColumn onClick={sortByBillStatus}>
            <ColumnsTitle>
              <Arrow status={sortObj.billStatus} src={arrowDown}></Arrow>وضعیت
              استعلام
            </ColumnsTitle>
          </StatusColumn>
        </ColumnsSection>

        <RowsContainer>
          {bills.map((bill, billIndex) => {
            return (
              <DataRow
                id={bill._id}
                unknown={bill.status === -1}
                success={bill.status === 1}
                warning={bill.status === 0}
                fail={bill.status === 2}
                onClick={() => switchModal(bill)}
              >
                <CheckBoxColumn
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Checkbox
                    checked={bills[billIndex].selected}
                    onChange={(e) => {
                      setBills([
                        ...bills.map((bill, index) => {
                          if (index === billIndex) {
                            bill.selected = e.target.checked;
                          }
                          return bill;
                        }),
                      ]);

                      setSelectedBills([
                        ...bills.filter((bill) => bill.selected),
                      ]);
                    }}
                  ></Checkbox>
                </CheckBoxColumn>
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
                  <DataValue>{bill.saveDate ?? 'ناموجود'}</DataValue>
                </Column>
                <Column>
                  <DataValue>{bill.bill.date}</DataValue>
                </Column>
                <Column>
                  <DataValue>{bill.bill.serial ?? 'ناموجود'}</DataValue>
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
        duration={6000}
      />
    </>
  );
};

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
          background-color: rgb(17, 160, 179) !important ;
        `
      : css`
          background-color: var(--caribbean-green);
        `}
`;

const Container = styled.div`
  align-items: center;
  background-color: white;
  position: fixed;
  top: 70px;
  right: 0;
  display: flex;
  flex-direction: column;
  height: calc(100vh -70px);
  width: 100vw;
  max-width: 100%;
  overflow-y: hidden;
  border-bottom: 1px solid #6b6b6b;
`;
// box-shadow: 0px 5px 10px 2px rgb(0 0 0 / 30%);

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;

  margin-left: 20px;
  padding-left: 20px;

  border-left: 1px solid var(--dove-gray);
`;

const ButtonsRow = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.161);
  height: 240px;
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
          background: var(--light-blue);
        `
      : props.color === 'green'
      ? css`
          background: var(--caribbean-green);
        `
      : css`
          background: rgb(32 107 116);
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

const DateSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  width: calc(100% - 330px);
  min-height: 240px;
`;

const DateSection = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-height: 70px;
`;

const SelectionSection = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;

  border-bottom: 1px solid var(--dove-gray);

  padding-bottom: 10px;

  width: 100%;
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
  width: 114px;
`;

const DateTextMarginLow = styled.p`
  color: var(--dove-gray);
  font-family: 'Dana-Regular', Helvetica, Arial, serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  margin: 0 30px 0 24px;
  width: 114px;
`;

const DateTextMarginHigh = styled.p`
  color: var(--dove-gray);
  font-family: 'Dana-Regular', Helvetica, Arial, serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  margin: 0 55px 0 24px;
  width: 114px;
`;

const DateTextBordered = styled.p`
  color: var(--dove-gray);
  font-family: 'Dana-Regular', Helvetica, Arial, serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  margin: 0 20px 0 24px;
  padding-right: 30px;
  padding-left:20px
  width: 114px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid var(--dove-gray);
`;

const DateTextFirstRow = styled.p`
  color: var(--dove-gray);
  font-family: 'Dana-Regular', Helvetica, Arial, serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  margin: 0 30px 0 24px;
  width: 110px;
`;

const DateInput = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row-reverse;
`;

const DateValue = styled.p`
  border: 1px solid var(--dove-gray);
  background-color: white;
  border-radius: 20px;
  height: 46px;
  opacity: 0.5;
  max-width: 155px;
  min-width: 150px;
  width: 155px;
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

const CloseButton = styled.p`
  border: 2px solid var(--dove-gray);
  border-radius: 14px;
  padding: 10px;
  padding-right: 12px;
  padding-left: 12px;
  font-weight: bold;
  margin-right: 10px;
`;

const BillNumberInput = styled.input`
  border: 1px solid var(--dove-gray);
  background-color: white;
  border-radius: 20px;
  height: 46px;
  opacity: 0.5;
  width: 135px;
  max-width: 135px;
  min-width: 133px;
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

const CheckBoxColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  padding: 4px;
  margin-right: 6px;
  margin-bottom: 6px;
  margin-top: 6px;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 100%;
  height: 100%;
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
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RowsContainer = styled.div`
  width: 100%;
  height: calc(100vh - 392px);

  padding: 5px 0;

  margin-top: 4px;
  border-top: 1px solid #696969;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const DataRow = styled.div`
  display: flex;
  flex-direction: row-reverse;

  min-height: 50px;
  width: calc(100% - 73px);
  padding: 0;
  margin-top: 9px;
  margin-left: 40px;

  background-color: white;
  border-radius: 12px;

  pointer-events: auto;
  transition: all 0.3s ease;

  &:first-of-type {
    margin-top: 10px;
  }

  // to make last one standout
  &:last-of-type {
    width: calc(100% - 33px);
    margin-left: 22px;
    margin-bottom: 10px;
  }

  &:hover {
    cursor: pointer;
  }

  ${(props) =>
    props.success &&
    css`
      color: var(--green);
      box-shadow: -1px 1px 5px 1px rgba(37, 255, 161, 0.2);
    `}

  ${(props) =>
    props.warning &&
    css`
      color: var(--pizazz);
      box-shadow: -1px 1px 5px 1px rgba(255, 145, 0, 0.2);
    `}

  ${(props) =>
    props.fail &&
    css`
      color: var(--bittersweet);
      box-shadow: -1px 1px 5px 1px rgba(255, 107, 107, 0.2);
    `}

  ${(props) =>
    props.unknown &&
    css`
      color: var(--dove-gray);
      box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1);
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

// updated
const CheckAllBox = styled.div`
  pointer-events: auto;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }

  ${(props) =>
    props.color === 'gray'
      ? css`
          background: var(--light-blue);
        `
      : props.color === 'green'
      ? css`
          background: var(--caribbean-green);
        `
      : css`
          background: rgb(32 107 116);
        `}

  border-radius: 12px;
  height: 44px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 16px;
`;

const CheckAllTxt = styled.p`
  color: white;
  font-family: 'Dana-Regular', Helvetica, Arial, serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  margin: 0;
`;

const ShowTotal = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  cursor: default;
  border-radius: 12px;
  height: 44px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
`;

const ShowTotalRow = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
`;

const ShowTotalRowTop = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;

  border-top: 1px solid var(--dove-gray);
  margin-top: 10px;
`;
const ShowTotalText = styled.p`
  color: black;
  font-family: 'Dana-Regular', Helvetica, Arial, serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  margin: 0;
`;

// select box

const SelectBox = styled.div`
  width: 280px;

  margin-right: 18px;

  display: flex;
  flex-direction: column;

  direction: rtl;
`;

const OptionContainer = styled.div`
  background: rgb(32 107 116);
  color: #f5f6fa;
  height: 0px;
  margin-top: 6px;
  max-height: 0px;
  width: 280px;
  transition: visibility 0.3s ease-in, opacity 0.5s ease-out,
    max-height 0.4s ease-in;
  border-radius: 8px;
  overflow: hidden;
  visibility: hidden;
  opacity: 0;

  position: fixed;

  margin-bottom: 0px;

  top: 290px;

  ${(props) =>
    props.active
      ? css`
          opacity: 1;
          visibility: visible;
          height: auto;
          max-height: auto;
        `
      : css``}

  order: 1;
  max-height: 240px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0px;
    background: rgb(32 107 116);
    border-radius: 0 8px 8px 0;
  }

  &::-webkit-scrollbar-thumb {
    background: rgb(32 107 116);
    border-radius: 0 8px 8px 0;
  }
`;

const SelectedOption = styled.div`
  background: rgb(17, 160, 179);
  border-radius: 8px;
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
    background: rgb(53 160 173);
  }
`;

const Arrow = styled.img`
  width: 30px;
  height: 0;

  opacity: 0;

  transition: transform 0.4s ease-out, opacity 0.5s ease-out,
    height 0.3s ease-out;

  ${(props) =>
    props.status === 1
      ? css`
          height: auto;
          opacity: 1;
          margin-bottom: 2px;
        `
      : props.status === -1
      ? css`
          height: auto;
          opacity: 1;
          margin-bottom: 2px;

          -webkit-transform: scaleY(-1);
          transform: scaleY(-1);
        `
      : css``}
`;

export default Home;
