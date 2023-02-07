import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAppDispatch } from "redux/hooks";
import {
  useGetMerchantDetailsData,
  useGetUserBySearch,
} from "../../../../../networkAPI/queries";
import styles from "../../../../../styles/Merchant/pricing1.module.scss";
// @ts-ignore
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import PackageDataList from "./package-data-list";
import AddPackages from "./add";
import UpdatePackages from "./update-package";

const PackageListComponent: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<number>();

  const router = useRouter();
  const dispatch = useAppDispatch();

  const [searchText, setSearchText] = useState<string>("");

  const [tabToggle, setTabToggle] = useState<boolean>(false);
  const AddNew = () => {
    setTabToggle(!tabToggle);
  };
  const { data, status } = useGetMerchantDetailsData(currentPage);

  const { data: getUser } = useGetUserBySearch(searchText);

  const tableData = searchText ? getUser : data?.user;
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
                {subTab == "create" ? "All Packages" : " "}
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
      {subTab == "list" ? (
        <PackageDataList setSubTab={setSubTab} setCurrentId={setCurrentId} />
      ) : subTab == "update" ? (
        <UpdatePackages setSubTab={setSubTab} currentId={currentId} />
      ) : (
        <AddPackages setSubTab={setSubTab} />
      )}
    </div>
  );
};
export default PackageListComponent;
