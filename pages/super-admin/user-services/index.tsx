import SuperAdminLayout from "components/SuperAdmin/Layout";
import {
  useGetMerchantDetailsData,
  useGetUserBySearch,
  useUpdateCallServices,
  useUpdateEmailServices,
  useUpdateLeadServices,
  useUpdateServices,
} from "networkAPI/queries";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "redux/hooks";
import styles from "../../../styles/Merchant/dashcode.module.scss";
// @ts-ignore
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import RightArrow from "components/svg-icons/rightarrow";
import LeftArrow from "components/svg-icons/leftarrow";

const Services = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>();
  const [totalPages, setTotalPage] = useState<number>();
  const { user } = useAppSelector((state) => state);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState<string>("");
  const [totalCount, setTotalCount] = useState();
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(20);
  const dropdownRef = useRef<any>("");
  const [isActive, setIsActive] = useState<boolean>(true);
  const [initialDataCount, setInitialCount] = useState("1");
  const [finalDataCount, setFinalDataCount] = useState("");
  const [searchText, setSearchText] = useState<string>("");
  const { data, refetch } = useGetMerchantDetailsData(currentPage);

  const { data: getUser } = useGetUserBySearch(searchText);
  const tableData = searchText ? getUser : data?.user;
  const { mutate } = useUpdateServices();
  const { mutate: callMutate } = useUpdateCallServices();
  const { mutate: emailMutae } = useUpdateEmailServices();
  const { mutate: leadsMutate } = useUpdateLeadServices();

  const handleUpload = (item: any) => {
    mutate({
      isUpload: !item.isUpload,

      _id: item._id as string,
    });
    router.reload();
  };

  const handleCall = (item: any) => {
    console.log(item.isCall, !item.isCall);

    callMutate({
      isCall: !item.isCall,

      _id: item._id as string,
    });
    router.reload();
  };

  const handleLead = (item: any) => {
    console.log(item.isLead, !item.isLead);
    leadsMutate({
      isLead: !item.isLead,

      _id: item._id as string,
    });
    router.reload();
  };

  const handleEmail = (item: any) => {
    console.log(item.isEmail, !item.isEmail);

    emailMutae({
      isEmail: !item.isEmail,

      _id: item._id as string,
    });
    router.reload();
  };
  useEffect(() => {
    refetch();
    // setCurrentPage(data?.currentPage);
    setTotalPage(data?.totalPages);
    setFinalDataCount(tableData?.length);
    setMin(data?.min);
    setMax(data?.max);
    setTotalCount(data?.count);
  }, [data]);

  const handleRight = () => {
    if (data?.currentPage < data?.totalPages) {
      setCurrentPage(data?.nextPage);
    }

    // setFinalDataCount(tableData?.length)
    // setInitialCount(tableData?.length)
  };

  const handleLeft = () => {
    if (data?.currentPage > 1) {
      setCurrentPage(data?.currentPage > 1 ? data?.currentPage - 1 : 1);
    }

    setInitialCount(tableData?.length);
  };
  return (
    <div>
      <SuperAdminLayout>
        <div className={styles.superadmintabledata}>
          <div className={styles.mov}>
            <div>
              <h1 className={styles.subcatHeading}> User Services</h1>
              <p>
                Here is data of Merchant List
                <span style={{ color: "red" }}>({data?.count})</span>
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
          <div className={styles.mainTable}>
            <div className={styles.maintableBoxx}>
              <div className={styles.tableBoxx}>
                <div>
                  <h3>All User Services</h3>
                </div>
                <div >
                  <input type="text" style={{width:"300px",height:"30px",textAlign:"center"}} placeholder={"Search user"} value={searchText} onChange={(e:any)=>setSearchText(e.target.value)}/>
                </div>
                <div className={styles.arrowBox}>
                  <div>
                    <span style={{ color: "red" }}>
                      {min} - {max}
                    </span>
                    of {totalCount}
                  </div>
                  <div
                    onClick={handleLeft}
                    style={
                      data?.currentPage == 1
                        ? {
                            display: "blur",
                            opacity: "0.5",
                            cursor: "not-allowed",
                          }
                        : { display: "block" }
                    }
                  >
                    <RightArrow />
                  </div>
                  <div
                    onClick={handleRight}
                    style={
                      data?.currentPage == data?.totalPages
                        ? { opacity: "0.5", cursor: "not-allowed" }
                        : { display: "block" }
                    }
                  >
                    <LeftArrow />
                  </div>
                </div>
              </div>
              <div className={styles.tableBox}>
                <div className={styles.tablescroll}>
                  <table id="table-to-xls" className={styles.tableMerchant}>
                    <thead>
                      <tr className={styles.Thead}>
                        <th className={styles.Thead1}>S no</th>

                        <th className={styles.Thead}>Merchant Name</th>
                        <th className={styles.Thead}>Email</th>
                        <th className={styles.Thead}>Mobile</th>

                        <th className={styles.Thead}>Upload </th>
                        <th className={styles.Thead}>Leads</th>
                        <th className={styles.Thead}>Email</th>
                        <th className={styles.Thead}>Call</th>
                        <th className={styles.Thead}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData
                        ?.filter((role: any) => role.role == "Admin")
                        .map((item: any, index: any) => {
                          return (
                            <tr key={index} className={styles.Thead}>
                              <td className={styles.Thead1}>
                                {data?.min + index + 1}.
                              </td>

                              <td className={styles.Thead}>
                                {item?.Merchant_Name}
                              </td>
                              <td className={styles.Thead}>{item?.email}</td>
                              <td className={styles.Thead}>
                                {item?.mobile_no}
                              </td>
                              <td className={styles.Thead}>
                                <input
                                  type="checkbox"
                                  checked={item?.isUpload}
                                  onClick={() => handleUpload(item)}
                                />
                              </td>
                              <td className={styles.Thead}>
                                {item?.isLead}
                                <input
                                  type="checkbox"
                                  checked={item?.isLead}
                                  onClick={() => handleLead(item)}
                                />
                              </td>
                              <td className={styles.Thead}>
                                <input
                                  type="checkbox"
                                  checked={item?.isEmail}
                                  onClick={() => handleEmail(item)}
                                />
                              </td>
                              <td className={styles.Thead}>
                                {item?.isCall}
                                <input
                                  type="checkbox"
                                  checked={item?.isCall}
                                  onClick={() => handleCall(item)}
                                />
                              </td>

                              <td className={styles.Thead}>
                                {item?.createdAt ? "Active" : "Inactive"}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.topTable}>
            <div className={styles.tableBoxx}>
              <div>All Merchant</div>
              <div className={styles.arrowBox}>
                <div>1 - 10 of 640</div>
                <div>
                  <RightArrow />
                </div>
                <div>
                  <LeftArrow />
                </div>
              </div>
            </div>
            {tableData
              ?.filter((role: any) => role.role == "Admin")
              .map((item: any, index: any) => {
                return (
                  <div className={styles.tableMain} key={index}>
                    <div className={styles.boxFlex}>
                      <div>
                        <h4>S no</h4>
                      </div>
                      <div className={styles.Thead1}>{index + 1}.</div>
                    </div>
                    <div className={styles.boxFlex}>
                      <h4>Merchant Id</h4>
                      <div className={styles.Thead}>
                        <span style={{ color: "blue" }}>
                          <u>{item?.GST_No}</u>
                        </span>
                      </div>
                    </div>
                    <div className={styles.boxFlex}>
                      <h4>Merchant Name</h4>
                      <div>
                        <div className={styles.Thead}>
                          {item?.Merchant_Name}
                        </div>
                      </div>
                    </div>
                    <div className={styles.boxFlex}>
                      <h4>Email</h4>
                      <div className={styles.Thead}>{item?.email}</div>
                    </div>
                    <div className={styles.boxFlex}>
                      <h4>Mobile</h4>
                      <div className={styles.Thead}>{item?.mobile_no}</div>
                    </div>
                    <div className={styles.boxFlex}>
                      <h4>Types of business</h4>
                      <div className={styles.Thead}>
                        {item?.TypesOf_Bussiness}
                      </div>
                    </div>
                    <div className={styles.boxFlex}>
                      <h4>Designation</h4>
                      <div className={styles.Thead}>
                        {item?.Merchant_Designation}
                      </div>
                    </div>
                    <div className={styles.boxFlex}>
                      <h4>Company Name</h4>
                      <div className={styles.Thead}>{item?.company_Name}</div>
                    </div>
                    <div className={styles.boxFlex}>
                      <h4>Year Of Establishment</h4>
                      <div className={styles.Thead}>
                        {item?.Year_of_establishment}
                      </div>
                    </div>
                    <div className={styles.boxFlex}>
                      <h4>Joining On</h4>
                      <div className={styles.Thead}>
                        {item?.createdAt.slice(0, 10)}
                      </div>
                    </div>
                    <div className={styles.boxFlex}>
                      <h4>Last Leads</h4>
                      <div className={styles.Thead}>
                        {item?.createdAt.slice(0, 10)}
                      </div>
                    </div>

                    <div className={styles.boxFlex}>
                      <h4>Status</h4>
                      <div className={styles.Thead}>
                        {item?.createdAt ? "Active" : "Inactive"}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </SuperAdminLayout>
    </div>
  );
};

export default Services;
