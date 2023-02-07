import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "redux/hooks";

import {
  useBuyerQuery,
  useDeactivateUser,
  useGetMerchantDetailsData,
  useGetUserBySearch,
} from "../../../networkAPI/queries";
import styles from "../../../styles/Merchant/dashcode.module.scss";
// @ts-ignore
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import SuperAdminLayout from "components/SuperAdmin/Layout";
import RightArrow from "components/svg-icons/rightarrow";
import LeftArrow from "components/svg-icons/leftarrow";

interface SearchProps {
  citySearch: string;
  productSearch: string;
}
interface ActionTypes {
  type: string;
  payload: string;
}

const All_merchant: NextPage = () => {
  const CITYSEACRH = "CITYSEACRH";
  const PRODUCTSEACRH = "PRODUCTSEACRH";
  const [currentPage, setCurrentPage] = useState<number>();
  const [totalPages, setTotalPage] = useState<number>();

  const buttonRef = useRef();
  const { user, isAuthenticated } = useAppSelector((state) => state.user);
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
  const { data, status } = useGetMerchantDetailsData(currentPage);

  const { data: QueryData } = useBuyerQuery();

  const { data: UserData, mutate } = useDeactivateUser();
  const { data: getUser } = useGetUserBySearch(searchText);

  const tableData = searchText ? getUser : data?.user;

  useEffect(() => {
    // setCurrentPage(data?.currentPage);
    setTotalPage(data?.totalPages);
  }, [data]);

  //===========================testing for button disable====

  // const test =QueryData?.data?.filter((div: any) => user._id == div.merchant_Id )
  const test = QueryData?.data;
  const admin = data?.user?.filter((item: any) => item.role == "Admin");

  const filterByReference = (admin: any, test: any) => {
    let res = [];
    res = admin.filter((el: any) => {
      return !test.find((element: any) => {
        return element.merchant_Id === el._id;
      });
    });
    return res;
  };
  //====================== User Deactivate=========
  const HandleDeactivate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: any
  ) => {
    e.preventDefault();

    mutate({
      id: item._id,
      isActive: false,
    });
    // dispatch(handleLogout());

    router.reload();
  };

  //======================End  User Deactivate=========
  //====================== User Deactivate=========
  const HandleActivate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: any
  ) => {
    e.preventDefault();

    mutate({
      id: item._id,
      isActive: true,
    });
    router.reload();
  };
  const HandleUserProduct = (item: any) => {
    router.push(`/super-admin/all-merchant/${item?._id}`);
  };

  const HandleUserLeads = (item: any) => {
    router.push(`/super-admin/all-merchant/leads?id=${item?._id}`);
  };
  //======================End  User Deactivate=========

  useEffect(() => {
    if (!isOpen) return;
    function handleOutsideClick(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSelect("");
      }
    }
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

  return (
    <div>
      <SuperAdminLayout>
        <div className={styles.mov}>
          <div>
            <h1 className={styles.subcatHeading}>
              All Merchant List {"        "}
            </h1>
            <p>
              Here is Merchant List data{" "}
              <span style={{ color: "red" }}>({data?.data?.length})</span>
              here
            </p>
          </div>
          <div>
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className={styles.downloadButton3}
              table="table-to-xls"
              filename="MerchantDetails"
              sheet="tablexls"
              buttonText="Download"
            />
          </div>
        </div>
        <div className={styles.maintableBoxx}>
          <div className={styles.tableBoxx}>
            <div>
              <h3>All Merchant</h3>
            </div>

            <div className={styles.arrowBox}>
              <div>
                <span style={{ color: "red" }}>1 - 10 </span>of 640
              </div>
              <div>
                <RightArrow />
              </div>
              <div>
                <LeftArrow />
              </div>
            </div>
          </div>{" "}
          <div className={styles.tableBox}>
            <table
              id="table-to-xls"
              className={styles.tableMerchant}
              style={{ overflowX: "auto" }}
            >
              <tbody>
                <tr className={styles.Thead}>
                  <th className={styles.Thead}>Sr no:</th>

                  <th className={styles.Thead}>Merchant Id:</th>
                  <th className={styles.Thead}>Merchant Name:</th>
                  <th className={styles.Thead}>Email:</th>
                  <th className={styles.Thead}>Mobile:</th>
                  <th className={styles.Thead}>Business:</th>
                  <th className={styles.Thead}>Types of bussiness</th>
                  <th className={styles.Thead}>Designation</th>
                  <th className={styles.Thead}>Merchant Address:</th>
                  <th className={styles.Thead}>Company Name:</th>
                  <th className={styles.Thead}>Year Of Establishment</th>
                  <th className={styles.Thead}>Joining On:</th>
                  <th className={styles.Thead}>Last Leads:</th>
                  <th className={styles.Thead}>Leads Count:</th>
                  <th className={styles.Thead}>Status:</th>
                  <th className={styles.Thead}>Action:</th>
                </tr>
                {tableData
                  ?.filter((role: any) => role.role == "Admin")
                  .map((item: any, index: any) => {
                    return (
                      <tr key={index} className={styles.Thead}>
                        {/* <td>ABC pvt lt.</td> */}
                        <td className={styles.Thead}>{index + 1}.</td>
                        <td
                          className={styles.Thead}
                          onClick={() => HandleUserProduct(item)}
                        >
                          <span style={{ color: "blue" }}>
                            <u>{item?.GST_No}</u>
                          </span>
                        </td>
                        <td className={styles.Thead}>{item?.Merchant_Name}</td>
                        <td className={styles.Thead}>{item?.email}</td>
                        <td className={styles.Thead}>{item?.mobile_no}</td>
                        <td className={styles.Thead}>
                          {item?.SubTypeOf_bussiness}
                        </td>
                        <td className={styles.Thead}>
                          {item?.TypesOf_Bussiness}
                        </td>
                        <td className={styles.Thead}>
                          {item?.Merchant_Designation}
                        </td>
                        <td className={styles.Thead}>
                          {item?.Merchant_Address}
                        </td>
                        <td className={styles.Thead}>{item?.company_Name}</td>
                        <td className={styles.Thead}>
                          {item?.Year_of_establishment}
                        </td>
                        <td className={styles.Thead}>
                          {item?.createdAt.slice(0, 10)}
                        </td>
                        <td className={styles.Thead}>
                          {item?.createdAt.slice(0, 10)}
                        </td>
                        <td
                          className={styles.Thead}
                          onClick={() => HandleUserLeads(item)}
                        >
                          <span style={{ color: "blue" }}>
                            <u>{item?.leadCount}</u>
                          </span>
                        </td>
                        <td className={styles.Thead}>
                          {item?.createdAt ? "Active" : "Inactive"}
                        </td>

                        <td
                          style={{
                            display: "flex",
                            gap: "10px",
                            justifyContent: "center",
                            padding: "10px",
                          }}
                        >
                          {item?.isActive == true ? (
                            <button
                              className={styles.deactivateButton}
                              type="submit"
                              style={{ background: "red" }}
                              onClick={(e) => HandleDeactivate(e, item)}
                            >
                              Deactivate
                            </button>
                          ) : (
                            <button
                              className={styles.activateButton}
                              type="submit"
                              style={{ background: "green" }}
                              onClick={(e) => HandleActivate(e, item)}
                            >
                              Activate
                            </button>
                          )}

                          <td
                            onClick={() =>
                              router.push(
                                `/admindashboard/all-merchant/edit?id=${item?._id}`
                              )
                            }
                          >
                            Edit
                          </td>
                        </td>
                        {/* <td
                            onClick={() =>
                              router.push(
                                `/admindashboard/all-merchant/edit?id=${item?._id}`
                              )
                            }
                          >
                            Edit
                          </td> */}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        {/* <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={({ selected }) => setCurrentPage(selected)}
          pageRangeDisplayed={5}
          pageCount={totalPages || 0}
          previousLabel="< Prev"
          activeLinkClassName={styles.Activepagiantion}
          className={styles.Pagination}
          //@ts-ignore
          renderOnZeroPageCount={null}
        /> */}
      </SuperAdminLayout>
    </div>
  );
};
export default All_merchant;
