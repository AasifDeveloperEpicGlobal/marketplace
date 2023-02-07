import React, { useState } from "react";
import styles from "../../../../../styles/Merchant/pricing1.module.scss";
// @ts-ignore
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import PriceDetails from "./price-details";
import CreatePrice from "./create-price";
import UpdatePrice from "./update-price";

const PriceHome = () => {
  const [subTab, setSubTab] = useState<string>("list");
  const [currentId, setCurrentId] = useState<string>("");

  const ativebuttonsRefs = React.useMemo(() => {
    switch (subTab) {
      case "create":
        return (
          <div className={styles.mov}>
            <div>
              <button
                onClick={() => setSubTab("list")}
                className={styles.downloadButton3}
              >
                {subTab == "create" ? "Price List" : " "}
              </button>
            </div>
          </div>
        );

        break;
      case "update":
        return (
          <div className={styles.mov}>
            <div>
              <button
                onClick={() => setSubTab("list")}
                className={styles.downloadButton3}
              >
                {subTab == "update" ? "All Services" : " "}
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
                onClick={() => setSubTab("create")}
                className={styles.downloadButton3}
              >
                {subTab === "list" ? "Add New" : " "}
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

      {subTab === "list" ? (
        <PriceDetails setSubTab={setSubTab} setCurrentId={setCurrentId} />
      ) : subTab === "update" ? (
        <UpdatePrice setSubTab={setSubTab} currentId={currentId} />
      ) : (
        <CreatePrice setSubTab={setSubTab} />
      )}
    </div>
  );
};

export default PriceHome;
