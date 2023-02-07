import React from "react";
import styles from "../../styles/Pricing/paynow.module.scss";

const PayNow = () => {
  return (
    <div>
      <button type="submit" className={styles.paynow}>
        Pay Now
      </button>
    </div>
  );
};

export default PayNow;
