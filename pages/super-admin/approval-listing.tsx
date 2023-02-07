import React, { useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Popup from "../../components/popup";
import {
  useApprovedProduct,
  useDeclinedProduct,
  useGetwaitingProductSearch,
  useGetWatingProductByDate,
  usePublicProduct,
  useWaitingProduct,
} from "../../networkAPI/queries";
import styles from "../../styles/Merchant/approval-listing.module.scss";
import SuperAdminLayout from "components/SuperAdmin/Layout";
import Link from "next/link";
import { dehydrate, QueryClient } from "react-query";
import { parseCookies } from "nookies";

const ApprovalListing: NextPage = () => {
  const [isApproved, setisApproved] = useState<boolean>(false);
  const [isDeclined, setIsDeclined] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  const router = useRouter();
  const [query, setQuery] = useState<string>("");

  const dropdownRef = useRef<any>(null);
  const [select, setSelect] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean[]>([]);
  const [toDate, setToDate] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [selectOption, setSelectOption] = useState("");
  const { data: getWaitingProductFilterByDate, refetch: waitingFilter } =
    useGetWatingProductByDate(selectOption);

  const togglePopup = (index: number) => {
    const temp = [...isOpen];
    temp[index] = !temp[index];
    setIsOpen(temp);
  };

  const getData = usePublicProduct();
  const { data: WaitingProduct, refetch } = useWaitingProduct();
  const test = getData.data;
  // const refetch = WaitingProduct.refetch;
  const { error, isLoading, data, mutate, isSuccess } = useApprovedProduct();
  const { data: Search, refetch: refetchData } =
    useGetwaitingProductSearch(query);
  const filterData = selectOption
    ? getWaitingProductFilterByDate
    : query
    ? Search
    : WaitingProduct?.data;

  const {
    error: err,
    isLoading: Loading,
    data: data1,
    mutate: mutate1,
    isSuccess: isSuccess1,
  } = useDeclinedProduct();

  const { data: FilterByDate } = useGetWatingProductByDate(selectOption);

  // const filterData1 = selectOption
  //   ? FilterByDate
  //   : query
  //   ? search
  //   : WaitingProduct?.data;
  const filterData1 = selectOption
    ? FilterByDate
    : query
    ? Search
    : WaitingProduct?.data;

  let minDate = new Date(fromDate).getTime();
  let maxDate = new Date(toDate).getTime();
  const testdata = filterData?.filter(
    (item: any) =>
      new Date(item.updatedAt.slice(0, 10)).getTime() >= minDate &&
      new Date(item.updatedAt.slice(0, 10)).getTime() <= maxDate
  );

  const finalfilterData = fromDate && toDate ? testdata : filterData;

  const today2 = new Date();
  const yesterday: Date = new Date(today2);
  const todayDate: Date = new Date(today2);
  const weekly: Date = new Date(today2);
  const montnly: Date = new Date(today2);

  yesterday.setDate(yesterday.getDate() - 1);
  todayDate.setDate(todayDate.getDate());
  weekly.setDate(weekly.getDate() - 7);
  montnly.setMonth(montnly.getMonth() - 1);

  const DateOptions = [
    { label: "Today", value: todayDate.toISOString().slice(0, 10) },
    { label: "Yesterday", value: yesterday.toISOString().slice(0, 10) },
    { label: "Last week", value: weekly.toISOString().slice(0, 10) },
    { label: "Last Month", value: montnly.toISOString().slice(0, 10) },
  ];

  useEffect(() => {
    // for (let i = 0; i <= filterData?.length; i++) {
    //   setIsOpen([...isOpen, false]);
    // }
    for (let i = 0; i <= finalfilterData?.length; i++) {
      setIsOpen([...isOpen, false]);
    }
  }, [finalfilterData]);

  // useEffect(() => {
  //   if (!isOpen) return;
  //   function handleOutsideClick(event: any) {
  //     if (!dropdownRef.current && dropdownRef.current.contains(event.target)) {
  //       return
  //     }
  //     setSelect("");
  //     setIsOpen(false);
  //   }
  //   window.addEventListener("mousedown", handleOutsideClick);
  //   return () => window.removeEventListener("mousedown", handleOutsideClick);
  // }, [isOpen]);

  const handleApproved = (item: any) => {
    mutate({
      id: item._id,

      isApproved: true,
    });
  };

  const handleDeclined = (e: any, item: any) => {
    e.preventDefault();

    mutate1({
      id: item._id,

      isDeclined: true,
      status: select,
    });
  };

  useEffect(() => {
    if (isOpen) {
      setIsDeclined(true);
    }
  }, [isOpen]);

  useEffect(() => {
    setisApproved(true);
  }, []);

  useEffect(() => {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || error.message);
    }

    if (isSuccess == true) {
      toast.success("product Approved successfully");
      refetch();
      // router.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data, router, isSuccess]);

  /// for declined
  useEffect(() => {
    if (err instanceof AxiosError) {
      toast.error(err?.response?.data?.message || err.message);
    }

    if (isSuccess1 == true) {
      toast.success("Declined  Successfull");
      refetch();
    }
  }, [err, data1, router, isSuccess1]);

  const handlSelect = (e: any) => {
    setSelectOption(e.target.value);
    setToDate("");
    setQuery("");
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectOption("");
    setToDate("");
  };

  return (
    <>
      <SuperAdminLayout>
        <div className={"styles.Flex_Container"} ref={dropdownRef}>
          {" "}
          <div className={styles.superadmintabledata}>
            <div className={styles.mov}>
              <div>
                <h1 className={styles.subcatHeading}>Waiting for Approval</h1>
                <p>
                  Here is the data{" "}
                  <span style={{ color: "red" }}>
                    ({finalfilterData?.length})
                  </span>
                  of Pending Approval Products
                </p>{" "}
              </div>
              <div>
                <button type="button" className={styles.downloadButton}>
                  <Link href="#"> Download </Link>
                </button>
              </div>
            </div>
            <form action="">
              <div className={styles.formBox}>
                <span className={styles.approvedInput}>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleSearch}
                  />
                </span>
                <span className={styles.approvedInput}>
                  <select
                    name="selectOtion"
                    value={selectOption}
                    placeholder="filterby Option"
                    // onChange={(e) => setSelectOption(e.target.value)}
                    onChange={handlSelect}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {DateOptions?.map((item: any, index: any) => {
                      return (
                        <option value={item.value} key={index}>
                          {item.label}
                        </option>
                      );
                    })}
                  </select>
                </span>
                <div style={{ display: "flex", gap: "20px" }}>
                  {/* <label htmlFor="fromdate">from</label> */}
                  <div className={styles.fromto}>
                    <span>From :</span>
                    <input
                      className={styles.approvedInputDate}
                      type="date"
                      name="fromdate"
                      value={fromDate}
                      placeholder="filter By date"
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>
                  <div className={styles.fromto}>
                    <span>To :</span>
                    <input
                      className={styles.approvedInputDate}
                      type="date"
                      name="toDate"
                      value={toDate}
                      placeholder="filter By date"
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </form>
            {finalfilterData?.map((item: any, index: any) => {
              if (item.isApproved == false && item.isDeclined == false) {
                return (
                  <div key={index} className={styles.boxSection}>
                    <div ref={dropdownRef}>
                      <table className={styles.table3}>
                        <tbody>
                          <tr>
                            <th>Product Image</th>
                            <td>
                              <Image
                                src={item?.product_image1[0] || "/"}
                                alt=""
                                width="100px"
                                height="100px"
                              />
                            </td>
                          </tr>
                          <tr>
                            <th>Company</th>
                            <td>{item.vendors_name}</td>
                          </tr>
                          <tr>
                            <th>Product Name</th>
                            <td>{item.product_name}</td>
                          </tr>
                          <tr>
                            <th>Product Category</th>
                            <td>{item.category}</td>
                          </tr>
                          <tr>
                            <th>SubCategory</th>
                            <td>{item.sub_category}</td>
                          </tr>
                          <tr>
                            <th>Product Price(per/unit)</th>
                            <td>{item.price}</td>
                          </tr>
                          <tr>
                            <th>Product Description</th>
                            <td>
                              <p>{item.product_description}</p>
                            </td>
                          </tr>
                          <tr>
                            <th>Uploaded Date:</th>
                            <td>
                              <p>{item.createdAt.slice(0, 10)}</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className={styles.AprovalStyle}>
                        <div>
                          <button
                            type="button"
                            className="approve-button"
                            onClick={() => handleApproved(item)}
                          >
                            Approve
                          </button>
                        </div>
                        <span>
                          <div
                            ref={dropdownRef}
                            style={{
                              position: "relative",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <button
                              type="button"
                              className="reject-button"
                              onClick={() => togglePopup(index)}
                            >
                              {isOpen[index] ? "Cancel" : "Decline"}
                            </button>
                            {isOpen[index] && (
                              <Popup
                                content={
                                  <>
                                    <div className={styles.FormButton}>
                                      <form
                                        onSubmit={(e) =>
                                          handleDeclined(e, item)
                                        }
                                      >
                                        <select
                                          name="cars"
                                          id="cars"
                                          className={styles.rejectdopdown}
                                          onChange={(e) =>
                                            setSelect(e.target.value)
                                          }
                                        >
                                          <option value="reason_of_rejection">
                                            Reason of Rejection{" "}
                                          </option>
                                          <option value="Mismatch Domain Details">
                                            Mismatch Domain Details
                                          </option>
                                          <option value="Picture quality mismatch">
                                            Picture quality mismatch
                                          </option>
                                          <option value="Wrong Specification">
                                            Wrong Specification
                                          </option>
                                          <option value="Mislabelling of Products">
                                            Mislabelling of Products
                                          </option>
                                          <option value="others">Others</option>
                                        </select>
                                        <textarea
                                          id="mytext"
                                          style={{
                                            display:
                                              select == "others"
                                                ? "block"
                                                : "none",
                                          }}
                                          placeholder="Other reason"
                                          rows={3}
                                          cols={22}
                                        />
                                        <span>
                                          {" "}
                                          <button
                                            className={styles.CheckboxButton}
                                          >
                                            Submit
                                          </button>
                                        </span>
                                      </form>
                                    </div>
                                  </>
                                }
                                handleClose={togglePopup}
                              />
                            )}
                          </div>
                        </span>
                      </div>
                      {/* </div> */}
                    </div>
                  </div>
                );
              }
            })}
          </div>{" "}
        </div>
      </SuperAdminLayout>
    </>
  );
};

export default ApprovalListing;

// export const getServerSideProps = async (context: any) => {
//   const access_token = parseCookies({ req: context.req });

//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery(
//     "waitingsProducts",
//     async () =>
//       await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/getproductForApproval`, {
//         headers: {
//           //@ts-ignore
//           authorization: `bearer ${access_token.access_token}`,

//         },

//       }).then((response) => response.json())
//   );

//   // Pass data to the page via props
//   return { props: { dehydratedState: dehydrate(queryClient) } };
//     }
