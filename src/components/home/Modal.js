import React from 'react';

function Modal(props) {
  const divStyle = {
    display: props.displayModal ? 'block' : 'none',
  };
  function closeModal(e) {
    e.stopPropagation();
    props.closeModal();
  }
  return (
    <div className="modal" onClick={closeModal} style={divStyle}>
      <div className="close-container" onClick={closeModal}>
        <span className="close">&times;</span>
      </div>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="status-section">
          <div className="status">
            <p>وضیعت استعلام</p>
          </div>
        </div>

        <div className="row">
          <p className="field-title">شناسه بازارگاه</p>
          <p className="field-value"></p>
          <p className="field-title">آدرس گیرنده</p>
          <p className="field-value"></p>
        </div>
        <div className="row">
          <p className="field-title">وزن بارنامه</p>
          <p className="field-value"></p>
          <p className="field-title">شماره ماشین</p>
          <p className="field-value"></p>
        </div>
        <div className="row">
          <p className="field-title">تاریخ بارنامه</p>
          <p className="field-value"></p>
          <p className="field-title">کد ملی گیرنده</p>
          <p className="field-value"></p>
        </div>
        <div className="row">
          <p className="field-title">شماره بارنامه</p>
          <p className="field-value"></p>
        </div>
        <div className="row">
          <p className="field-title">نام کالا</p>
          <p className="field-value"></p>
        </div>
        <div className="row">
          <p className="field-title">شناسه تشخیص</p>
          <p className="field-value"></p>
        </div>
        <div className="row">
          <p className="field-title">مبدا حمل</p>
          <p className="field-value"></p>
        </div>
        <div className="row">
          <p className="field-title">فی فروش</p>
          <p className="field-value"></p>
        </div>
        <div className="row">
          <p className="field-title">شماره حواله</p>
          <p className="field-value"></p>
        </div>
        <div className="row">
          <p className="field-title">وزن حواله</p>
          <p className="field-value"></p>
          <p className="field-title">تاریخ حواله</p>
          <p className="field-value"></p>
        </div>
        <div className="row"></div>
        <div className="row">
          <p className="field-title">نام گیرنده</p>
          <p className="field-value"></p>
          <p className="field-title">نام خریدار</p>
          <p className="field-value"></p>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {};

export default Modal;
