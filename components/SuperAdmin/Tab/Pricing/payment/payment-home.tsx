import React, { useEffect, useState } from "react";
import styles from "../../../../../styles/Merchant/pricing1.module.scss";
// @ts-ignore
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import {
  useGetMerchantDetailsData,
  useGetUserBySearch,
} from "networkAPI/queries";
import PaymentDetails from "./payment-details";
import UpdatePayment from "./update-payment";
import Createpayment from "./create-payment";
import Invoice2 from "./invoice";

function PaymentHome() {
  const [subTab, setSubTab] = useState<string>("list");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentId, setCurrentId] = useState<object>();
  const [totalPages, setTotalPage] = useState<number>();
  const { data, status } = useGetMerchantDetailsData(currentPage);

  //   const { data: getUser } = useGetUserBySearch(searchText);

  //   const tableData = searchText ? getUser : data?.user;

  useEffect(() => {
    // setCurrentPage(data?.currentPage);
    setTotalPage(data?.totalPages);
  }, [data]);

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
                {subTab == "create" ? "All Services" : " "}
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
            {/* <div>
              <button
                onClick={() => setSubTab("create")}
                className={styles.downloadButton3}
              >
                {subTab == "list" ? "Add New" : " "}
              </button>
            </div> */}
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
      {subTab === "list" ? (
        <PaymentDetails setSubTab={setSubTab} setCurrentId={setCurrentId} />
      ) : subTab == "update" ? (
        <UpdatePayment setSubTab={setSubTab} currentId={currentId} />
      ):
       (
        <Createpayment setSubTab={setSubTab} />
      )}
    </div>
  );
}

export default PaymentHome;
