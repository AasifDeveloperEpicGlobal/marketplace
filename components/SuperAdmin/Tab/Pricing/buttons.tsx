import React, { useState } from 'react'

import styles from "../../../../styles/Merchant/pricing1.module.scss"
// @ts-ignore
import ReactHTMLTableToExcel from "react-html-table-to-excel";
interface buttonProps{
    active:boolean
}

function Activebuttons({active}:buttonProps) {
    const [tabToggle, setTabToggle] = useState<boolean>(false);
    const AddNew = () => {
      setTabToggle(!tabToggle);
    };
  return (
    <div className={styles.mov}>
        <div>
          <button onClick={AddNew} className={styles.downloadButton3}>
            {!active ? "Add New" : " All Services"}
          </button>
        </div>
        <div>
          {!active ? (
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className={styles.downloadButton3}
              table="table-to-xls"
              filename="MerchantDetails"
              sheet="tablexls"
              buttonText="Download"
            />
          ) : (
            ""
          )}
        </div>
      </div>
  )
}

export default Activebuttons