import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  useGetMerchantDetailsData,
  useGetUserBySearch,
} from "../../../../../networkAPI/queries";
import styles from "../../../../../styles/Merchant/pricing1.module.scss";
// @ts-ignore
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import TaxDataList from "./tax-data-list";
import UpdateTax from "./update-tax";
import CreateTax from "./create-tax";

const TaxList: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<number>();
  const [totalPages, setTotalPage] = useState<number>();

  const buttonRef = useRef();
  // const {

  //   user,
  //   isAuthenticated,
  // } = useAppSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState<string>("");
  const dropdownRef = useRef<any>("");
  const [isActive, setIsActive] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const [tabToggle, setTabToggle] = useState<boolean>(false);
  const AddNew = () => {
    setTabToggle(!tabToggle);
  };

  const [subTab, setSubTab] = useState<string>("list");
  const [currentId, setCurrentId] = useState<object>();
  const { data, status } = useGetMerchantDetailsData(currentPage);

  const { data: getUser } = useGetUserBySearch(searchText);

  const tableData = searchText ? getUser : data?.user;

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
                {subTab == "create" ? "All Taxes" : " "}
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
      {subTab === "list" ? (
        <TaxDataList setSubTab={setSubTab} setCurrentId={setCurrentId} />
      ) : subTab == "update" ? (
        <UpdateTax setSubTab={setSubTab} currentId={currentId} />
      ) : (
        <CreateTax setSubTab={setSubTab} />
      )}
    </div>
  );
};
export default TaxList;
