import React, { useState } from "react";
import styles from "../../../../../styles/Merchant/pricing1.module.scss";
// @ts-ignore
import ReactHTMLTableToExcel from "react-html-table-to-excel";


import Sms from "./sms";
import Calling from "./calling";
import Email from "./email";

const PriceHome = () => {
  const [subTab, setSubTab] = useState<string>("email");
  const [currentId, setCurrentId] = useState<string>("");

  const ativebuttonsRefs = React.useMemo(() => {
    switch (subTab) {
      case "sms":
        return (
          <div className={styles.mov}>
            <div>
              <button
                onClick={() => setSubTab("sms")}
                className={styles.downloadButton3}
              >
                {/* {subTab == "create" ? "Price List" : " "} */}
              </button>
            </div>
          </div>
        );

        break;
      case "calling":
        return (
          <div className={styles.mov}>
            <div>
              <button
                onClick={() => setSubTab("calling")}
                className={styles.downloadButton3}
              >
                {subTab == "calling" ? "All Services" : " "}
              </button>
            </div>
          </div>
        );

        break;

      default:
        return (
          <div className={styles.mov}>
            <div>
              <button
                onClick={() => setSubTab("email")}
                className={styles.downloadButton3}
              >
                {subTab === "email" ? "Add New" : " "}
              </button>
            </div>
            <div>
              {subTab === "list" ? (
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
        );
        break;
    }
  }, [subTab]);

  return (
    <div>
      {ativebuttonsRefs}

      {subTab === "sms" ? (
        <Sms />
      ) : subTab === "calling" ? (
        <Calling  />
      ) : (
        <Email  />
      )}
    </div>
  );
};

export default PriceHome;
