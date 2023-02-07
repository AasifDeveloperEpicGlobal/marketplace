import React from "react";
import styles from "../../styles/Merchant/priceservice.module.scss";
import { NextPage } from "next";
const InputBox = (props: any) => {
  return (
    <React.Fragment>
      <form action="">
        <div className={styles.maininput}>
          <form action="">
            <div className={styles.inputbox}>
              <input type="text" className={styles.inputfeild} />
              <span className={styles.inputlabel}>{props.title}</span>
            </div>
          </form>
        </div>
      </form>
    </React.Fragment>
  );
};

export default InputBox;
