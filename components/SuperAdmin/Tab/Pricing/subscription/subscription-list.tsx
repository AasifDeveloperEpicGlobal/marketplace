import React, { useState } from "react";
import { NextPage } from "next";
import styles from "../../../../../styles/Merchant/pricing1.module.scss";
// @ts-ignore
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import SubscriptionDataList from ".";
import Subscription from "./add";
import UpdateSubscription from "./update-subscription";

const SubscriptionComponent: NextPage = () => {
  const [tabToggle, setTabToggle] = useState<boolean>(false);
  const AddNew = () => {
    setTabToggle(!tabToggle);
  };
  const [subTab, setSubTab] = useState<string>("list");
  const [currentId, setCurrentId] = useState<object>({});
  

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
                {subTab == "create" ? "Subscribed Users" : " "}
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
                {subTab == "update" ? "Subscribed Users" : " "}
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
                {subTab == "list" ? "Add New" : " "}
              </button>
            </div>
            <div>
              {subTab == "list" ? (
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
      {subTab == "list" ? (
        <SubscriptionDataList
          setSubTab={setSubTab}
          setCurrentId={setCurrentId}
        />
      ) : subTab == "update" ? (
        <UpdateSubscription setSubTab={setSubTab} currentId={currentId} />
      ) : (
        <Subscription setSubTab={setSubTab} />
      )}
    </div>
  );
};
export default SubscriptionComponent;
