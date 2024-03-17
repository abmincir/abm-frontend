import {
  IonItem,
  IonLabel,
  IonLoading,
  IonSelect,
  IonSelectOption,
  IonToast,
} from "@ionic/react";
import { Dialog } from "@material-ui/core";
import Axios from "axios";
import moment from "moment-jalaali";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import styled, { css } from "styled-components";
import SideMenu from "../side-menu/SideMenu";
import Modal from "./Modal";
import * as actions from "../../actions";
import store from "../../store";
import arrowDown from "../../fonts/down_arrow_icon.svg";

const URI = process.env.REACT_APP_REST_ENDPOINT;
const Address = () => {
  const [startDateSave, setStartDateSave] = useState("");
  const [endDateSave, setEndDateSave] = useState("");

  const [calendarStartDateSave, setCalendarStartDateSave] = useState(null);
  const [calendarEndDateSave, setCalendarEndDateSave] = useState(null);

  const [startDateCalendarOpenSave, setStartDateCalendarOpenSave] =
    useState(false);
  const [endDateCalendarOpenSave, setEndDateCalendarOpenSave] = useState(false);

  const [code, setCode] = useState();
  const [hamlCode, setHamlCode] = useState();
  const [contractCode, setcontractCode] = useState();
  const [shenaseh, setShenaseh] = useState();
  const [bargah, setBargah] = useState();

  const [hamlCompanyCode, setHamlCompanyCode] = useState();

  const [receivedBarnames, setReceivedBarnames] = useState();

  // const [isShowingModal, setIsShowingModal] = useState(false);

  const [visible, setVisible] = useState(false);
  const [isAdmin, setAdmin] = useState(false);

  const [draft, setDraft] = useState();
  const [isAllSelected, setAllSelected] = useState(true);
  const [drafts, setDrafts] = useState([]);
  const [selectedDrafts, setSelectedDrafts] = useState([]);

  const [totalWeight, setTotalWeight] = useState(0);
  const [companies, setCompanies] = useState();

  const [searchLoading, setSearchLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const [deleteLoadin, setDeleteLoading] = useState(false);

  const [inquiryMessage, setInquiryMessage] = useState("در حال ارسال");
  const [deleteMessage, setDeleteMessage] = useState("در حال حذف");
  const [message, setMessage] = useState("");
  const [showMassage, setShowMassage] = useState(false);

  const searchHandler = () => {
    setSearchLoading(true);
    const data = {
      hamlCode,
      code,
      bargah,
      shenaseh,
      startDate: startDateSave,
      endDate: endDateSave,
      sort: sortObj,
    };

    Axios.post(`${URI}/draft/all`, data)
      .then((result) => {
        const fetchedDrafts = result.data.map((draft) => {
          if (dataBaseSelected.isShamsi) {
            return { ...draft, selected: false };
          }

          let b = { ...draft, selected: false };
          return b;
        });

        setDrafts(fetchedDrafts);

        setSelectedDrafts([]);
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
    Axios.post(`${URI}/draft/update-db`, data)
      .then((result) => {
        setDrafts(result.data.data);
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

  const fetchReportsHandler = async () => {
    const data = {
      companyCode: hamlCompanyCode,
      date1: startDateSave,
      date2: endDateSave,
      // reportName: 'شرکتها'
      reportName: "گزارش بارگيري فايل پرديس",
    };

    try {
      setFetchLoading(true);
      await Axios.post(`${URI}/companies/all`, data);
    } catch (error) {
      console.error("An error occurred. e:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  const onCheckClick = (draft) => {
    setCheckLoading(true);

    const addresses = [
      {
        goId: "f2589520-c565-4d1b-958f-f0332ecba2f3",
        hamlCode: contractCode.toString(),
        companyCode: hamlCompanyCode,
        havCode: draft.code.toString(),
        receiverName: draft.name,
        receiverAddress: draft.address,
        receiverPostalCode: draft.postCode,
        receiverTel: draft.tel,
        receiverNationalCode: draft.meli,
        receiverJahadYektaCode: draft.yekta,
        weight: draft.weight,
        sendTraili: draft.trail,
        shenaseTakhsis: draft.shenaseh,
        shenaseKharid: draft.bargah,
        groupCode: "1",
        explanations: "",
      },
    ];

    Axios.post(`${URI}/addresses/add`, addresses)
      .then((result) => {
        setMessage("موفقیت آمیز بود");
        setShowMassage(true);
      })
      .catch((error) => {
        let errorMessage = error;
        console.log(errorMessage);
        errorMessage = errorMessage ?? "خطا در اتصال به بندرگاه";
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

  const onDeleteClick = (draft) => {
    setDeleteLoading(true);

    const addresses = [
      {
        goId: "f2589520-c565-4d1b-958f-f0332ecba2f3",
        hamlCode: contractCode.toString(),
        companyCode: hamlCompanyCode,
        havCode: draft.code.toString(),
      },
    ];

    Axios.post(`${URI}/addresses/delete`, addresses)
      .then((result) => {
        setMessage("موفقیت آمیز بود");
        setShowMassage(true);
      })
      .catch((error) => {
        let errorMessage = error;
        console.log(errorMessage);

        errorMessage = errorMessage ?? "خطا در اتصال به بندرگاه";

        if (errorMessage.insertError) {
          setMessage(errorMessage.insertError);
        }

        setMessage(errorMessage.err);
        setShowMassage(true);
      })
      .finally(() => {
        searchHandler();

        setDeleteLoading(false);
        setFetchLoading(false);
      });
  };

  const deleteDraftsInquiry = async () => {
    if (!selectedDrafts.length) {
      setMessage("هیچ موردی انتخاب نشده است");
      setShowMassage(true);
      return;
    }

    const addresses = selectedDrafts.map((d) => [
      {
        goId: "f2589520-c565-4d1b-958f-f0332ecba2f3",
        hamlCode: contractCode.toString(),
        companyCode: hamlCompanyCode,
        havCode: d.code.toString(),
      },
    ]);

    Axios.post(`${URI}/addresses/delete`, addresses)
      .then((result) => {
        setMessage("موفقیت آمیز بود");
        setShowMassage(true);
      })
      .catch((error) => {
        let errorMessage = error;
        console.log(errorMessage);

        errorMessage = errorMessage ?? "خطا در اتصال به بندرگاه";

        if (errorMessage.insertError) {
          setMessage(errorMessage.insertError);
        }

        setMessage(errorMessage.err);
        setShowMassage(true);
      })
      .finally(() => {
        searchHandler();

        setDeleteLoading(false);
        setFetchLoading(false);
      });
  };

  const selectedDraftsInquiry = async () => {
    if (!selectedDrafts.length) {
      setMessage("هیچ موردی انتخاب نشده است");
      setShowMassage(true);
      return;
    }

    const addresses = selectedDrafts.map((d) => {
      return {
        goId: "f2589520-c565-4d1b-958f-f0332ecba2f3",
        hamlCode: contractCode.toString(),
        companyCode: hamlCompanyCode,
        havCode: d.code.toString(),
        receiverName: d.name,
        receiverAddress: d.address,
        receiverPostalCode: d.postCode,
        receiverTel: d.tel,
        receiverNationalCode: d.meli,
        receiverJahadYektaCode: d.yekta,
        weight: d.weight,
        sendTraili: d.trail,
        shenaseTakhsis: d.shenaseh,
        shenaseKharid: d.bargah,
        groupCode: "1",
        explanations: "",
      };
    });

    Axios.post(`${URI}/addresses/add`, addresses)
      .then((result) => {
        setMessage("موفقیت آمیز بود");
        setShowMassage(true);
      })
      .catch((error) => {
        let errorMessage = error;
        console.log(errorMessage);

        errorMessage = errorMessage ?? "خطا در اتصال به بندرگاه";

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

  // const switchModal = (draft) => {
  //   setDraft(draft);
  //   setIsShowingModal(!isShowingModal);
  // };

  const [dataBases, setDataBases] = useState([{}, {}]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    setAdmin(localStorage.getItem("isAdmin") === "true");
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

    Axios.post(`${URI}/companies/data`)
      .then((result) => {
        setCompanies(result);
      })
      .catch((e) => console.error(e));
  }, []);

  const calculateTime = (v) => {
    const faDate = v && `${v.year}/${v.month}/${v.day}`;

    if (!faDate) {
      return null;
    }

    const momentTime = moment(faDate, "jYYYY/jMM/jDD");
    return momentTime.format("jYYYY/jMM/jDD");
  };

  const onKeyPress = (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
      searchHandler();
    }
  };

  const checkAllHandler = () => {
    setAllSelected(!isAllSelected);

    setDrafts([
      ...drafts.map((draft) => {
        draft.selected = isAllSelected;
        return draft;
      }),
    ]);

    setSelectedDrafts([...drafts.filter((draft) => draft.selected)]);
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

  const [sortObj, setSortObj] = useState({});

  const sortByShenaseh = () => {
    if (sortObj.shenaseh === -1) {
      setSortObj({});
    } else if (sortObj.shenaseh === 1) {
      setSortObj({ shenaseh: -1 });
    } else {
      setSortObj({ shenaseh: -1 });
    }
    searchHandler();
  };

  const sortByBargah = () => {
    if (sortObj.bargah === -1) {
      setSortObj({});
    } else if (sortObj.bargah === 1) {
      setSortObj({ bargah: -1 });
    } else {
      setSortObj({ bargah: -1 });
    }
    searchHandler();
  };

  const sortByCode = () => {
    if (sortObj.code === -1) {
      setSortObj({});
    } else if (sortObj.code === 1) {
      setSortObj({ code: -1 });
    } else {
      setSortObj({ code: -1 });
    }
    searchHandler();
  };

  const sortByHamlCode = () => {
    if (sortObj.hamlCode === -1) {
      setSortObj({});
    } else if (sortObj.hamlCode === 1) {
      setSortObj({ hamlCode: -1 });
    } else {
      setSortObj({ hamlCode: -1 });
    }
    searchHandler();
  };

  const sortByMeli = () => {
    if (sortObj.meli === -1) {
      setSortObj({});
    } else if (sortObj.meli === 1) {
      setSortObj({ meli: -1 });
    } else {
      setSortObj({ meli: -1 });
    }
    searchHandler();
  };

  const sortByYekta = () => {
    if (sortObj.yekta === -1) {
      setSortObj({});
    } else if (sortObj.yekta === 1) {
      setSortObj({ yekta: -1 });
    } else {
      setSortObj({ yekta: -1 });
    }
    searchHandler();
  };

  const sortByWeight = () => {
    if (sortObj.weight === -1) {
      setSortObj({});
    } else if (sortObj.weight === 1) {
      setSortObj({ weight: -1 });
    } else {
      setSortObj({ weight: -1 });
    }
    searchHandler();
  };

  return (
    <>
      <IonLoading
        cssClass="custom-loading"
        isOpen={fetchLoading}
        onDidDismiss={() => setFetchLoading(false)}
        message={"در حال به روز رسانی"}
        duration={10000}
      />
      <IonLoading
        cssClass="custom-loading"
        isOpen={searchLoading}
        onDidDismiss={() => setSearchLoading(false)}
        message={"در حال جستجو"}
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

      <IonLoading
        cssClass="custom-loading"
        isOpen={deleteLoadin}
        onDidDismiss={() => {
          setDeleteLoading(false);
        }}
        message={deleteMessage}
        duration={10000}
      />

      <SideMenuContainer visible={visible}>
        <SideMenu />
      </SideMenuContainer>
      <BlurContainer onClick={() => setVisible(false)} visible={visible} />

      <Header isAdmin={isAdmin}>
        <div onClick={() => setVisible(!visible)}>{menu}</div>
        <p>ایده پردازان کارآفرین</p>
      </Header>

      <Container>
        <FiltersContainer>
          <Buttons>
            <ButtonsRow>
              <Button
                onClick={searchHandler}
                color={isAdmin ? "dark-blue" : "green"}
              >
                <ButtonText>جست و جو</ButtonText>
              </Button>

              <Button
                onClick={fetchHandler}
                color={isAdmin ? "dark-blue" : "green"}
              >
                <ButtonText>بروزرسانی</ButtonText>
              </Button>
            </ButtonsRow>

            <ButtonsRow>
              <CheckAllBox
                onClick={checkAllHandler}
                color={isAdmin ? "dark-blue" : "green"}
              >
                <CheckAllTxt>انتخاب همه</CheckAllTxt>
              </CheckAllBox>

              <Button
                onClick={fetchReportsHandler}
                color={isAdmin ? "dark-blue" : "green"}
              >
                <ButtonText>دریافت گزارش ها</ButtonText>
              </Button>
            </ButtonsRow>

            <ButtonsRow>
              <Button
                onClick={deleteDraftsInquiry}
                color={
                  isAdmin
                    ? selectedDrafts.length
                      ? "dark-blue"
                      : "blue"
                    : selectedDrafts.length
                    ? "green"
                    : "gray"
                }
              >
                <ButtonText>
                  حذف آدرس {"( " + selectedDrafts.length + " )"}
                </ButtonText>
              </Button>

              <Button
                onClick={selectedDraftsInquiry}
                color={
                  isAdmin
                    ? selectedDrafts.length
                      ? "dark-blue"
                      : "blue"
                    : selectedDrafts.length
                    ? "green"
                    : "gray"
                }
              >
                <ButtonText>
                  ارسال آدرس {"( " + selectedDrafts.length + " )"}
                </ButtonText>
              </Button>
            </ButtonsRow>

            <ShowTotalRowTop>
              <ShowTotal>
                <ShowTotalText>
                  آدرس های پیدا شده : {"( " + drafts.length + " )"}
                </ShowTotalText>
              </ShowTotal>
            </ShowTotalRowTop>
          </Buttons>
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
                <IonLabel>انتخاب شرکت</IonLabel>
                <IonSelect
                  mode="md"
                  value={hamlCompanyCode}
                  okText="تایید"
                  cancelText="لغو"
                  onIonChange={(e) => setHamlCompanyCode(e.detail.value)}
                >
                  <IonSelectOption value="0">هیچکدام</IonSelectOption>
                  <IonSelectOption value="36778">نگین بار</IonSelectOption>
                  <IonSelectOption value="36628">سیوان ۱</IonSelectOption>
                  <IonSelectOption value="3600628">سیوان ۲</IonSelectOption>
                  <IonSelectOption value="36859">کاروش</IonSelectOption>
                  <IonSelectOption value="36678">آسایش</IonSelectOption>
                  <IonSelectOption value="36776">تابان</IonSelectOption>
                </IonSelect>
              </IonItem>

              <DateTextFirstRow>کد قرارداد</DateTextFirstRow>
              <BillNumberInput
                onChange={(e) => setcontractCode(e.target.value)}
                onKeyPress={onKeyPress}
              ></BillNumberInput>

              <DateText>پایگاه داده</DateText>

              <SelectBox>
                <OptionContainer active={activeDataBase} isAdmin={isAdmin}>
                  {dataBases.map((d) => {
                    return (
                      <Option
                        isAdmin={isAdmin}
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

                <SelectedOption
                  onClick={toggleActiveDataBase}
                  isAdmin={isAdmin}
                >
                  {dataBaseSelected === 0
                    ? "انتخاب پایگاه داده"
                    : dataBaseSelected.title}
                </SelectedOption>
              </SelectBox>

              <DateText>حساب کاربری</DateText>
              <SelectBox>
                <OptionContainer active={activeAccount} isAdmin={isAdmin}>
                  {accounts.map((d) => {
                    return (
                      <Option
                        isAdmin={isAdmin}
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
                  isAdmin={isAdmin}
                >
                  {accountSelected === 0
                    ? "انتخاب حساب کاربری"
                    : accountSelected.title}
                </SelectedOption>
              </SelectBox>
            </SelectionSection>

            <DateSection>
              <DateInput>
                <DateTextFirstRow>کد کشتی</DateTextFirstRow>
                <BillNumberInput
                  onChange={(e) => setHamlCode(e.target.value)}
                  onKeyPress={onKeyPress}
                ></BillNumberInput>

                <DateTextMarginHigh
                  startDateSave={startDateSave}
                  endDateSave={endDateSave}
                >
                  کد کارتکس
                </DateTextMarginHigh>
                <BillNumberInput
                  style={{ "font-size": "16px" }}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyPress={onKeyPress}
                ></BillNumberInput>

                <DateTextMarginHigh
                  startDateSave={startDateSave}
                  endDateSave={endDateSave}
                >
                  شناسه خرید
                </DateTextMarginHigh>
                <BillNumberInput
                  style={{ "font-size": "16px" }}
                  onChange={(e) => setBargah(e.target.value)}
                  onKeyPress={onKeyPress}
                ></BillNumberInput>

                <DateTextMarginHigh
                  startDateSave={startDateSave}
                  endDateSave={endDateSave}
                >
                  شناسه تخصیص
                </DateTextMarginHigh>
                <BillNumberInput
                  style={{ "font-size": "16px" }}
                  onChange={(e) => setShenaseh(e.target.value)}
                  onKeyPress={onKeyPress}
                ></BillNumberInput>
              </DateInput>
            </DateSection>

            <DateSection>
              <DateInput>
                <DateTextFirstRow
                  onClick={() => setStartDateCalendarOpenSave(true)}
                >
                  تاریخ از
                </DateTextFirstRow>
                <DateValue onClick={() => setStartDateCalendarOpenSave(true)}>
                  {startDateSave}
                </DateValue>
                {startDateSave && (
                  <CloseButton
                    onClick={() => {
                      setStartDateSave("");
                      setCalendarStartDateSave(null);
                    }}
                  >
                    X
                  </CloseButton>
                )}

                <DateTextFirstRow
                  onClick={() => setEndDateCalendarOpenSave(true)}
                >
                  تاریخ تا
                </DateTextFirstRow>

                <DateValue onClick={() => setEndDateCalendarOpenSave(true)}>
                  {endDateSave}
                </DateValue>
                {endDateSave && (
                  <CloseButton
                    onClick={() => {
                      setEndDateSave("");
                      setCalendarEndDateSave(null);
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

          <Column onClick={sortByBargah}>
            <ColumnsTitle>
              <Arrow status={sortObj.bargah} src={arrowDown}></Arrow> شناسه خرید
            </ColumnsTitle>
          </Column>
          <Column onClick={sortByShenaseh}>
            <ColumnsTitle>
              <Arrow status={sortObj.shenaseh} src={arrowDown}></Arrow> شناسه
              تخصیص
            </ColumnsTitle>
          </Column>
          <Column onClick={sortByCode}>
            <ColumnsTitle>
              <Arrow status={sortObj.code} src={arrowDown}></Arrow>کد کارتکس
            </ColumnsTitle>
          </Column>
          <Column onClick={sortByHamlCode}>
            <ColumnsTitle>
              <Arrow status={sortObj.hamlCode} src={arrowDown}></Arrow>کد کشتی
            </ColumnsTitle>
          </Column>
          <Column>
            <ColumnsTitle>
              <Arrow src={arrowDown}></Arrow>نام خریدار
            </ColumnsTitle>
          </Column>
          <Column>
            <ColumnsTitle>
              <Arrow src={arrowDown}></Arrow>نام گیرنده
            </ColumnsTitle>
          </Column>
          <Column onClick={sortByMeli}>
            <ColumnsTitle>
              <Arrow status={sortObj.meli} src={arrowDown}></Arrow>شناسه/کدملی
              گیرنده
            </ColumnsTitle>
          </Column>
          <Column onClick={sortByYekta}>
            <ColumnsTitle>
              <Arrow status={sortObj.yekta} src={arrowDown}></Arrow>کد یکتا
            </ColumnsTitle>
          </Column>
          <Column onClick={sortByWeight}>
            <ColumnsTitle>
              <Arrow status={sortObj.weight} src={arrowDown}></Arrow>تناژ
            </ColumnsTitle>
          </Column>

          <StatusColumn>
            <ColumnsTitle>
              <Arrow src={arrowDown}></Arrow>وضعیت ارسال
            </ColumnsTitle>
          </StatusColumn>

          <StatusColumn>
            <ColumnsTitle>
              <Arrow src={arrowDown}></Arrow>وضعیت حذف
            </ColumnsTitle>
          </StatusColumn>
        </ColumnsSection>

        <RowsContainer>
          {drafts.map((draft, draftIndex) => {
            return (
              <DataRow
                id={draft._id}
                // unknown={draft.status === -1}
                // success={draft.status === 1}
                // warning={draft.status === 0}
                // fail={draft.status === 2}
                unknown={true}
                success={false}
                warning={false}
                fail={false}
                // onClick={() => switchModal(draft)}
              >
                <CheckBoxColumn
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Checkbox
                    checked={drafts[draftIndex].selected}
                    onChange={(e) => {
                      setDrafts([
                        ...drafts.map((draft, index) => {
                          if (index === draftIndex) {
                            draft.selected = e.target.checked;
                          }
                          return draft;
                        }),
                      ]);

                      setSelectedDrafts([
                        ...drafts.filter((draft) => draft.selected),
                      ]);
                    }}
                  ></Checkbox>
                </CheckBoxColumn>
                <Column>
                  <DataValue>{draft.bargah}</DataValue>
                </Column>
                <Column>
                  <DataValue>{draft.shenaseh}</DataValue>
                </Column>
                <Column>
                  <DataValue>{draft.code}</DataValue>
                </Column>
                <Column>
                  <DataValue>{draft.hamlCode}</DataValue>
                </Column>
                <Column>
                  <DataValue>{draft.customerName}</DataValue>
                </Column>
                <Column>
                  <DataValue>{draft.name}</DataValue>
                </Column>
                <Column>
                  <DataValue>{draft.meli}</DataValue>
                </Column>
                <Column>
                  <DataValue>{draft.yekta}</DataValue>
                </Column>
                <Column>
                  <DataValue>{draft.weight}</DataValue>
                </Column>

                <StatusColumn
                  onClick={(e) => {
                    e.stopPropagation();
                    onCheckClick(draft);
                  }}
                >
                  {draft.status === "unknown" ||
                  draft.status === null ||
                  undefined
                    ? unknown
                    : draft.status === "added"
                    ? success
                    : draft.status === "updated"
                    ? warning
                    : fail}
                </StatusColumn>

                <StatusColumn
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteClick(draft);
                  }}
                >
                  {draft.status === "added" ||
                  "unknown" ||
                  draft.status === null ||
                  undefined
                    ? unknown
                    : draft.status === "deleted"
                    ? success
                    : draft.status === "updated"
                    ? warning
                    : fail}
                </StatusColumn>
              </DataRow>
            );
          })}

          {drafts.length === 0 && (
            <DataRow>
              <Column>
                <DataValue>موردی یافت نشد</DataValue>
              </Column>
            </DataRow>
          )}
        </RowsContainer>
      </Container>

      {/* <Modal
          bill={draft}
          displayModal={isShowingModal}
          closeModal={switchModal}
        /> */}

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

    font-family: "Dana-Bold", Helvetica, Arial, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;

    margin-right: 16px;
  }

  ${(props) =>
    props.isAdmin
      ? css`
          background-color: #5c7aea !important ;
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
  height: 300px;
  justify-content: space-between;

  margin-left: 20px;
  padding-left: 20px;

  border-left: 1px solid var(--dove-light-gray);
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
  align-items: flex-start;

  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.161);
  height: 330px;
  width: 100vw;

  padding: 12px 48px;
`;

const Button = styled.div`
  pointer-events: auto;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }

  ${(props) =>
    props.color === "blue"
      ? css`
          background: var(--blue);
        `
      : props.color === "gray"
      ? css`
          background: var(--dove-gray);
        `
      : props.color === "green"
      ? css`
          background: var(--caribbean-green);
        `
      : css`
          background: var(--dark-blue);
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
  font-family: "Dana-Regular", Helvetica, Arial, serif;
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

  border-bottom: 1px solid var(--dove-light-gray);

  padding-bottom: 10px;

  width: 100%;
  min-height: 70px;
`;

const DateText = styled.p`
  color: var(--dove-gray);
  font-family: "Dana-Regular", Helvetica, Arial, serif;
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
  font-family: "Dana-Regular", Helvetica, Arial, serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  margin: 0 30px 0 24px;
  width: 114px;

  ${(props) =>
    props.startDateSave
      ? props.endDateSave
        ? props.startDateBill
          ? props.endDateBill
            ? css`
                margin: 0 104px 0 24px;
              `
            : css`
                margin: 0 104px 0 24px;
              `
          : props.endDateBill
          ? css`
              margin: 0 104px 0 24px;
            `
          : css`
              margin: 0 104px 0 24px;
            `
        : props.startDateBill
        ? props.endDateBill
          ? css`
              margin: 0 104px 0 24px;
            `
          : css`
              margin: 0 104px 0 24px;
            `
        : props.endDateBill
        ? css`
            margin: 0 104px 0 24px;
          `
        : css`
            margin: 0 106px 0 24px;
          `
      : props.endDateSave
      ? props.startDateBill
        ? props.endDateBill
          ? css`
              margin: 0 60px 0 24px;
            `
          : css`
              margin: 0 60px 0 24px;
            `
        : props.endDateBill
        ? css`
            margin: 0 60px 0 24px;
          `
        : css`
            margin: 0 60px 0 24px;
          `
      : props.startDateBill
      ? props.endDateBill
        ? css`
            margin: 0 55px 0 24px;
          `
        : css`
            margin: 0 55px 0 24px;
          `
      : props.endDateBill
      ? css`
          margin: 0 55px 0 24px;
        `
      : css`
          margin: 0 58px 0 24px;
        `}
`;

const DateTextMarginHigh = styled.p`
  color: var(--dove-gray);
  font-family: "Dana-Regular", Helvetica, Arial, serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  margin: 0 38px 0 24px;
  width: 114px;
  ${(props) =>
    props.endDateSave
      ? css`
          margin: 0 81px 0 24px;
        `
      : css``}
`;

const DateTextBordered = styled.p`
  color: var(--dove-gray);
  font-family: "Dana-Regular", Helvetica, Arial, serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  margin: 0 20px 0 24px;
  padding-right: 30px;
  padding-left: 20px;
  width: 114px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DateTextFirstRow = styled.p`
  color: var(--dove-gray);
  font-family: "Dana-Regular", Helvetica, Arial, serif;
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
  font-family: "Dana-Regular", Helvetica, Arial, serif;
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
  font-family: "Dana-Regular", Helvetica, Arial, serif;
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

const Checkbox = styled.input.attrs({ type: "checkbox" })`
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
  font-family: "Dana-Regular", Helvetica, Arial, serif;
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
  height: calc(100vh - 482px);

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
  font-family: "Dana-Regular", Helvetica, Arial, serif;
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
    props.color === "blue"
      ? css`
          background: var(--blue);
        `
      : props.color === "gray"
      ? css`
          background: var(--dove-gray);
        `
      : props.color === "green"
      ? css`
          background: var(--caribbean-green);
        `
      : css`
          background: var(--dark-blue);
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
  font-family: "Dana-Regular", Helvetica, Arial, serif;
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

  border-top: 1px solid var(--dove-light-gray);
  margin-top: 10px;
`;
const ShowTotalText = styled.p`
  color: black;
  font-family: "Dana-Regular", Helvetica, Arial, serif;
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
  background: var(--dark-blue);
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

  top: 135px;

  ${(props) =>
    props.active
      ? css`
          opacity: 1;
          visibility: visible;
          height: auto;
          max-height: auto;
        `
      : css``}

  ${(props) =>
    props.isAdmin
      ? css`
          background: var(--dark-blue);
          &::-webkit-scrollbar {
            width: 0px;
            background: var(--dark-blue);
          }

          &::-webkit-scrollbar-thumb {
            background: var(--dark-blue);
          }
        `
      : css`
          background-color: var(--green);
          &::-webkit-scrollbar {
            width: 0px;
            background: var(--green);
          }

          &::-webkit-scrollbar-thumb {
            background: var(--green);
          }
        `}
      
  
    order: 1;
  max-height: 240px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0px;
    background: var(--dark-blue);
    border-radius: 0 8px 8px 0;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--dark-blue);
    border-radius: 0 8px 8px 0;
  }
`;

const SelectedOption = styled.div`
  border-radius: 8px;
  color: #f5f6fa;
  position: relative;

  order: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "";
    background: url("img/arrow-down.svg");
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

  ${(props) =>
    props.isAdmin
      ? css`
          background-color: var(--dark-blue);
        `
      : css`
          background-color: var(--green);
        `}
`;

const Option = styled.div`
  padding: 12px 24px;
  cursor: pointer;

  ${(props) =>
    props.isAdmin
      ? css`
          &:hover {
            background: var(--blue);
          }
        `
      : css`
          &:hover {
            background: var(--dove-gray);
          }
        `}
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

export default Address;
