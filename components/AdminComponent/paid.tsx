/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import styles from "../../styles/Merchant/allproduct.module.scss";
import Cancel from "components/svg-icons/cancel";
import { spawn } from "child_process";
import { useUpdatePaymentDetails } from "networkAPI/queries";

const Paid: NextPage = (props) => {
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState(true);
  const { data, mutate } = useUpdatePaymentDetails();

  const modalbutton = () => {
    setModal(true);
  };
  const closemodalicon = () => {
    setModal(false);
  };
  const handleSubmit = () => {
    if (image.length > 0) {
      // mutate(
      //   payment_mode,
      //   payment_status,
      //   image,
      // );
    } else {
      setMessage("Upload aleast one image");
    }
  };
  useEffect(() => {
    image.length > 0 ? setMessage("") : null;
    // handleSubmit();
  }, [image]);

  console.log("images", image);
  return (
    <>
      <span className={styles.paidsection}>Paid</span>
      {modal ? (
        <div className={styles.uppermodal}>
          <div>
            <div className={styles.modalbackground}>
              {/* <div className={styles.cancelmodal} onClick={closemodalicon}>
                <Cancel />
              </div> */}
              <h2>Congratulation!</h2>
              <h3>You have subscribed our</h3>
              <h4>SMS Service Pack</h4>
              <h3 className={styles.modalprice}>200 / Month</h3>
              <p>
                If you havn{"'"}t upload the payment reference,please attached
                below:
              </p>
              <div className={styles.inputfileandbutton}>
                <div className={styles.warningmessage}>
                  <span>
                    <input
                      type="file"
                      onChange={(e: any) => setImage(e.target.files)}
                    />
                  </span>
                  <span className={styles.spantext}>
                    {message ? <span>{message}</span> : null}
                  </span>
                </div>
                <div>
                  <button
                    className={styles.modaluploadbutton}
                    onClick={handleSubmit}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Paid;
