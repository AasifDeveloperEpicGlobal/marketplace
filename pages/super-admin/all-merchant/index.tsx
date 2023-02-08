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
import { dehydrate, QueryClient } from "react-query";

const All_merchant: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>();
  const [totalPages, setTotalPage] = useState<number>();
  const { user } = useAppSelector((state) => state);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState<string>("");
  const dropdownRef = useRef<any>("");
  const [totalCount, setTotalCount] = useState();
  const [isActive, setIsActive] = useState<boolean>(true);
  const [initialDataCount, setInitialCount] = useState("1");
  const [finalDataCount, setFinalDataCount] = useState("");
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(20);
  const [searchText, setSearchText] = useState<string>("");
  const { data, refetch } = useGetMerchantDetailsData(currentPage);
  const { data: QueryData } = useBuyerQuery();
  const { mutate } = useDeactivateUser();
  const { data: getUser } = useGetUserBySearch(searchText);
  const tableData = searchText ? getUser : data?.user;
  useEffect(() => {
    refetch();
    // setCurrentPage(data?.currentPage);
    setTotalPage(data?.totalPages);
    setFinalDataCount(tableData?.length);
    setMin(data?.min);
    setMax(data?.max);
    setTotalCount(data?.count);
  }, [data]);
  console.log(data);

  //===========================testing for button disable====

  // const test =QueryData?.data?.filter((div: any) => user._id == div.merchant_Id )

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
  const handleUseUpdate = (item: any) => {
    router.push(`/super-admin/all-merchant/edit?id=${item?._id}`);
  };
  const HandleUserLeads = (item: any) => {
    router.push(`/super-admin/all-merchant/leads?id=${item?._id}`);
  };
  //======================End  User Deactivate=========

  return (
    <div>
      <SuperAdminLayout>
        <div className={styles.superadmintabledata}>
          <div className={styles.mov}>
            <div>
              <h1 className={styles.subcatHeading}>All Merchant List</h1>
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
                  <h3>All Merchant</h3>
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
                        <th className={styles.Thead}>Merchant Id</th>
                        <th className={styles.Thead}>Merchant Name</th>
                        <th className={styles.Thead}>Email</th>
                        <th className={styles.Thead}>Mobile</th>
                        <th className={styles.Thead}>Business</th>
                        <th className={styles.Thead}> Bussiness Type</th>
                        <th className={styles.Thead}>Designation</th>
                        <th className={styles.Thead}>Merchant Address</th>
                        <th className={styles.Thead}>Company Name</th>
                        <th className={styles.Thead}>Year Of Establishment</th>
                        <th className={styles.Thead}>Joining On</th>
                        <th className={styles.Thead}>Last Leads</th>
                        <th className={styles.Thead}>Leads Count</th>
                        <th className={styles.Thead}>Status</th>
                        <th className={styles.Thead}>Action</th>
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
                              <td
                                className={styles.Thead}
                                onClick={() => HandleUserProduct(item)}
                              >
                                <span style={{ color: "blue" }}>
                                  <u>{item?.GST_No}</u>
                                </span>
                              </td>
                              <td className={styles.Thead}>
                                {item?.Merchant_Name}
                              </td>
                              <td className={styles.Thead}>{item?.email}</td>
                              <td className={styles.Thead}>
                                {item?.mobile_no}
                              </td>
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
                              <td className={styles.Thead}>
                                {item?.company_Name}
                              </td>
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
                                <button
                                  className={styles.editButton}
                                  onClick={() => handleUseUpdate(item)}
                                >
                                  Edit
                                </button>
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

          {/* Mobile responsive table  */}
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
                      <div
                        className={styles.Thead}
                        onClick={() => HandleUserProduct(item)}
                      >
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
                      <h4>Leads Count</h4>
                      <div
                        className={styles.Thead}
                        onClick={() => HandleUserLeads(item)}
                      >
                        <span style={{ color: "blue" }}>
                          <u>{item?.leadCount}</u>
                        </span>
                      </div>
                    </div>
                    <div className={styles.boxFlex}>
                      <h4>Status</h4>
                      <div className={styles.Thead}>
                        {item?.createdAt ? "Active" : "Inactive"}
                      </div>
                    </div>
                    <div className={styles.boxFlex}>
                      <h4>Action</h4>
                      <div
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
                        <div
                          className={styles.editButton}
                          onClick={() =>
                            router.push(
                              `/super-admin/all-merchant/edit?id=${item?._id}`
                            )
                          }
                        >
                          Edit
                        </div>
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
export default All_merchant;

// export const getServerSideProps = async (context: any) => {
//   // const access_token = parseCookies({ req: context.req });

//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery(
//     "publish",
//     async () =>
//       await fetch(
//         `${process.env.NEXT_PUBLIC_SERVER_URL}/api/get_publish_product`,
//         {
//           // headers: {
//           //   //@ts-ignore
//           //   authorization: `bearer ${access_token.access_token}`,
//           // },
//         }
//       ).then((response) => response.json())
//   );

//   // Pass data to the page via props
//   return { props: { dehydratedState: dehydrate(queryClient) } };
// };
