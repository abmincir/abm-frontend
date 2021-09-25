import { IonLoading, IonToast } from '@ionic/react';
import Axios from 'axios';
import React, { useState } from 'react';

const URI = process.env.REACT_APP_REST_ENDPOINT;

function Modal(props) {
  const divStyle = {
    display: props.displayModal ? 'block' : 'none',
  };

  const { bill } = props;

  function closeModal(e) {
    e.stopPropagation();
    props.closeModal();
  }

  const [checkLoading, setCheckLoading] = useState(false);

  const [showMassage, setShowMassage] = useState(false);
  const [message, setMessage] = useState('عدم ارتباط با سامانه');

  const [weight, setWeight] = useState(
    bill && bill.merchantWeight ? bill.merchantWeight : ''
  );

  const onCheckClick = async (e) => {
    e.stopPropagation();
    setCheckLoading(true);

    const data = {
      _id: bill._id,
      weight,
    };

    try {
      const result = await Axios.post(`${URI}/bill/edit`, data);
      console.log(result);

      bill.merchantWeight = weight;

      setMessage('ثبت تغییرات موفقیت آمیز بود');
    } catch (error) {
      const errorMessage = JSON.parse(error.request.response);
      console.warn(errorMessage);

      setMessage(errorMessage.err);
    } finally {
      setShowMassage(true);
      setCheckLoading(false);
    }
  };

  const statusMessage =
    !bill || !bill.status
      ? ''
      : bill.status === -1
      ? 'استعلام نشده'
      : bill.status === 0
      ? 'عدم تطابق وزن'
      : bill.status === 1
      ? 'استعلام موفق'
      : 'ناموجود';

  const statusClassName =
    !bill || !bill.status
      ? 'status'
      : bill.status === -1
      ? 'status'
      : bill.status === 0
      ? 'status orange-status'
      : bill.status === 1
      ? 'status green-status'
      : 'status red-status';

  return (
    <div className="modal" onClick={closeModal} style={divStyle}>
      <div className="close-container" onClick={closeModal}>
        <span className="close">&times;</span>
      </div>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="status-section">
          <div className={statusClassName}>
            <p>{`وضیعت استعلام : ${statusMessage}`}</p>
          </div>

          <div className={statusClassName}>
            <p>{`آخرین پیام :‌ ${
              bill ? bill.lastMessage ?? 'بررسی نشده' : 'ناموجود'
            }`}</p>
          </div>
        </div>

        {bill && (
          <div>
            <div className="row">
              <p className="field-title">شناسه بازارگاه</p>
              <p className="field-value">
                {bill.purchaseId ? bill.purchaseId : 'نامشخص'}
              </p>

              <p className="field-title">وزن بازارگاه</p>
              <p className="field-value">
                {bill.spsWeight ? bill.spsWeight : 'نامشخص'}
              </p>
            </div>

            <div className="row">
              <p className="field-title">شماره کوتاژ</p>
              <p className="field-value">
                {bill.cottageNumber ? bill.cottageNumber : 'نامشخص'}
              </p>

              <p className="field-title">وزن بازرگان</p>
              <p className="field-value">
                {bill.merchantWeight ? bill.merchantWeight : 'نامشخص'}
              </p>
            </div>

            <div className="row">
              <p className="field-title">وزن بارنامه</p>
              <p className="field-value">{bill.bill.weight}</p>

              <p className="field-title">شماره ماشین</p>
              <p className="field-value">{bill.carNumber}</p>
            </div>

            <div className="row">
              <p className="field-title">سریال بارنامه</p>
              <p className="field-value">{bill.bill.serial}</p>

              <p className="field-title">شماره بارنامه</p>
              <p className="field-value">{bill.bill.number ?? 'ناموجود'}</p>
            </div>

            <div className="row">
              <p className="field-title">تاریخ بارنامه</p>
              <p className="field-value">{bill.bill.date}</p>

              <p className="field-title">تاریخ ثبت</p>
              <p className="field-value">{bill.saveDate ?? 'ناموجود'}</p>
            </div>

            <div className="row">
              <p className="field-title">شناسه تخصیص</p>
              <p className="field-value">{bill.allocationId}</p>

              <p className="field-title">شماره حواله</p>
              <p className="field-value">{bill.draft.number}</p>
            </div>

            <div className="row">
              <p className="field-title">وزن حواله</p>
              <p className="field-value">{bill.draft.weight}</p>

              <p className="field-title">تاریخ حواله</p>
              <p className="field-value">{bill.draft.date}</p>
            </div>

            <div className="row">
              <p className="field-title">نام کالا</p>
              <p className="field-value">{bill.product.name}</p>

              <p className="field-title">فی فروش</p>
              <p className="field-value">{bill.product.pricePerSale}</p>
            </div>

            <div className="row">
              <p className="field-title">نام خریدار</p>
              <p className="field-value">{bill.customer.name}</p>

              <p className="field-title">مبدا حمل</p>
              <p className="field-value">{bill.origin.name}</p>
            </div>

            <div className="row">
              <p className="field-title">نام گیرنده</p>
              <p className="field-value">{bill.receiver.name}</p>

              <p className="field-title">کد ملی گیرنده</p>
              <p className="field-value">{bill.receiver.nationalId}</p>
            </div>

            <div className="row address-row">
              <p className="address-title">آدرس گیرنده</p>
              <p className="address-value">{bill.receiver.telAddress}</p>
            </div>

            {bill.status !== -1 && bill.status !== 2 && (
              <div className="weight-row">
                <input
                  className="weight-input"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <button className="submit-button" onClick={onCheckClick}>
                  ثبت وزن
                </button>
              </div>
            )}
          </div>
        )}

        <IonToast
          isOpen={showMassage}
          cssClass="custom-toast"
          onDidDismiss={() => setShowMassage(false)}
          message={message}
          duration={1000}
        />
        <IonLoading
          cssClass="custom-loading"
          isOpen={checkLoading}
          onDidDismiss={() => {
            setCheckLoading(false);
          }}
          message={'در حال ثبت تغییرات'}
          duration={8000}
        />
      </div>
    </div>
  );
}

export default Modal;
