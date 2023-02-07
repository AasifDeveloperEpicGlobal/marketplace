import React, { useRef, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAppSelector } from "redux/hooks";
import {
  useGetApprovedProductBySearch,
  useGetFilterProductByDate,
  usePublicProduct,
  usePublishedProduct,
} from "../../networkAPI/queries";
import styles from "../../styles/Merchant/approved-listing.module.scss";
import SuperAdminLayout from "components/SuperAdmin/Layout";
import LeftArrow from "components/svg-icons/leftarrow";
import RightArrow from "components/svg-icons/rightarrow";
import Link from "next/link";
import { dehydrate, QueryClient } from "react-query";
import { parseCookies } from "nookies";

const Approved_Product: NextPage = () => {
  const router = useRouter();
  const dropdownRef = useRef<any>(null);
  const [query, setQuery] = useState("");
  const [fromDate, setFromDate] = useState<any>("");
  const [toDate, setToDate] = useState<any>("");
  const [selectOption, setSelectOption] = useState("");
  const getData = usePublicProduct();
  const test = getData.data;
  const { error, isLoading, data, isSuccess } = usePublishedProduct();
  console.log(data)
  const { data: Search } = useGetApprovedProductBySearch(query);
  const { data: FilterByDate } = useGetFilterProductByDate(selectOption);
  const filterData = selectOption ? FilterByDate : query ? Search : data;
  let minDate = new Date(fromDate).getTime();
  let maxDate = new Date(toDate).getTime();
  console.log(filterData);
  //@ts-ignore
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
  const handleToDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(e.target.value);
    setQuery("");
    setSelectOption("");
  };
  const currentDate = todayDate.toISOString().slice(0, 10);

  return (
    <>
      <SuperAdminLayout>
        <div className={"styles.Flex_Container"} ref={dropdownRef}>
          <div className={styles.superadmintabledata}>
            <div className={styles.mov}>
              <div>
                <h1 className={styles.subcatHeading}> Approved Product</h1>
                <p>
                  Here is the data{" "}
                  <span style={{ color: "red" }}>
                    ({finalfilterData?.length})
                  </span>
                  of Approved Product List
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
                    // onChange={(e) => setQuery(e.target.value)}
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
                    <option value={""}>Select</option>
                    {DateOptions?.map((item: any, index: any) => {
                      return (
                        <option value={item.value} key={index}>
                          {item.label}
                        </option>
                      );
                    })}
                  </select>{" "}
                </span>
                <div className={styles.fromdate}>
                  {/* <label htmlFor="fromdate">from</label> */}
                  <div className={styles.fromto}>
                    <span>From :</span>
                    <input
                      className={styles.approvedInputDate}
                      type="date"
                      name="fromdate"
                      value={fromDate}
                      max={currentDate}
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
                      max={currentDate}
                      placeholder="filter By date"
                      onChange={handleToDate}
                    />
                  </div>
                </div>
              </div>
            </form>
            <div className={styles.maintableBoxx}>
              <div className={styles.tableBoxx}>
                <div>
                  <h3>Approved Product</h3>
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
              </div>
              <div className={styles.tableBox}>
                <table>
                  <tbody>
                    <tr className={styles.Thead}>
                      <th className={styles.Thead}>S No.</th>
                      <th className={styles.Thead}>Product Image</th>
                      <th className={styles.Thead}>Merchant Name</th>
                      <th className={styles.Thead}>Product Name</th>
                      <th className={styles.Thead}>Product Category</th>
                      <th className={styles.Thead}>Product Price(per/unit)</th>
                      <th className={styles.Thead}>Uploaded Date</th>
                      <th className={styles.Thead}>Approved Date</th>
                    </tr>
                    {finalfilterData?.map((item: any, index: any) => {
                      return (
                        <tr key={index} className={styles.Thead}>
                          <td>{index + 1}</td>
                          <td className={styles.Thead}>
                            <Image
                              src={
                                item?.product_image1[0]
                                  ? item?.product_image1[0]
                                  : "/"
                              }
                              alt=""
                              width="60px"
                              priority={true}
                              height="60px"
                              className={styles.ImageBox}
                            />
                          </td>
                          <td className={styles.Thead}>
                            <div className="vendors_name">
                              {item.vendors_name}
                            </div>
                          </td>
                          <td className={styles.Thead}>
                            <div className="product_name">
                              {item.product_name}
                            </div>
                          </td>
                          <td className={styles.Thead}>
                            <div className="category">{item.category}</div>
                          </td>
                          <td className={styles.Thead}>
                            <div className="price">{item.price}</div>
                          </td>
                          <td className={styles.Thead}>
                            <p>{item.createdAt.slice(0, 10)}</p>
                          </td>
                          <td className={styles.Thead}>
                            <p>{item.updatedAt.slice(0, 10)}</p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>{" "}
        </div>
      </SuperAdminLayout>
    </>
  );
};

export default Approved_Product;

export const getServerSideProps = async (context: any) => {
  // const access_token = parseCookies({ req: context.req });

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    "publish",
    async () =>
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/get_publish_product`,
        {
          // headers: {
          //   //@ts-ignore
          //   authorization: `bearer ${access_token.access_token}`,
          // },
        }
      ).then((response) => response.json())
  );

  // Pass data to the page via props
  return { props: { dehydratedState: dehydrate(queryClient) } };
};
