/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { NextPage } from "next";
import styles from "../../styles/Merchant/allproduct.module.scss";
import Cancel from "components/svg-icons/cancel";

const Unpaid: NextPage = (props) => {
  const [modal, setModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(true);

  const modalbutton = () => {
    setModal(true);
  };
  const closemodalicon = () => {
    setModal(false);
  };
  return (
    <>
      <span
        // onClick={modalbutton}
        className={styles.unpaidsection}
      >
        Unpaid
      </span>
      {modal ? (
        <div className={styles.uppermodal}>
          <div>
            <div className={styles.modalbackground}>
              <div
                className={styles.cancelmodal}
                //  onClick={closemodalicon}
              >
                <Cancel />
              </div>
              <h2>Pending Payment!</h2>
              <h3>You have subscribed our</h3>
              <h4>SMS Service Pack</h4>
              <h3 className={styles.modalprice}>200 / Month</h3>
              <p>Please click below on Pay to make further payment.</p>
              <button className={styles.modalpaybutton}>Pay</button>{" "}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Unpaid;
