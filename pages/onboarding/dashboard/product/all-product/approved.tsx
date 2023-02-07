/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useProducts } from "../../../../../networkAPI/queries";
import styles from "../../../../../styles/Merchant/allproduct.module.scss";
import AdminLayout from "components/AdminLayout";
import RightArrow from "components/svg-icons/rightarrow";
import LeftArrow from "components/svg-icons/leftarrow";
import { parseCookies } from "nookies";
import { dehydrate, QueryClient } from "react-query";

const fetchUsers = async () => {
  const res = await fetch("/api/user/upload_product");
  return res.json();
};

const Approved_Product: NextPage = () => {
  const router = useRouter();

  const { data, status } = useProducts();
  const [merchantGetData, setMerchantGetData] = useState<any>();
  const data1 = useProducts();

  useEffect(() => {
    //@ts-ignore
    const filterData = data?.filter(
      (item: any) => item.isApproved == true && item.isActive
    );

    setMerchantGetData(filterData);
  }, [data]);

  return (
    <div className={styles.container_width}>
      <AdminLayout>
        <div className={styles.mov}>
          <div>
            <h2 className={styles.subcatHeading}>Approved Data </h2>
            <p>
              Here is data of Approved Products
              <b>
                <span style={{ color: "red" }}>
                  ({merchantGetData?.length})
                </span>
              </b>
            </p>
          </div>
          {/* <div>
                      <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className={styles.downloadButton3}
                        table="table-to-xls"
                        filename="MerchantDetails"
                        sheet="tablexls"
                        buttonText="Download"
                      />
                    </div> */}
        </div>
        <div className={styles.mainTable}>
          <div className={styles.maintableBoxx}>
            <div className={styles.tableBoxx}>
              <div>
                <h3>All Approved Data </h3>
              </div>

              <div className={styles.arrowBox}>
                <div className="paginationcount">
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
              <div className={styles.tablemobilescroll}>
                <table
                  id="table-to-xls"
                  className={styles.tableMerchant}
                  // style={{ overflowX: "auto" }}
                >
                  <tbody>
                    <tr className={styles.Thead}>
                      <th className={styles.Thead1}>Sr No.</th>
                      {/* <th className={styles.Thead}>Product_Id</th> */}
                      <th className={styles.Thead1}>Image</th>
                      <th className={styles.Thead}>Product Name</th>
                      <th className={styles.Thead}>Category</th>
                      <th className={styles.Thead}>Price(per/piece)</th>

                      <th className={styles.Thead}> Actions</th>
                    </tr>
                    {merchantGetData?.map((item: any, index: number) => {
                      return (
                        <tr key={index} className={styles.Thead}>
                          <td className={styles.Thead1}>{index + 1}.</td>
                          {/* <td className={styles.Thead}>
                          <span style={{ color: "blue" }}>
                            <u>{item.product_Id}.</u>
                          </span>
                        </td> */}
                          <td className={styles.Thead1}>
                            <div className={styles.imagebox}>
                              <img
                                src={
                                  item.product_image1[0] ||
                                  item.product_image2[0] ||
                                  item.product_image3[0] ||
                                  item.product_image4[0] ||
                                  item.product_image5[0] ||
                                  "/omratrade/homebanner.png"
                                }
                                alt="product"
                              />
                            </div>
                          </td>
                          <td className={styles.Thead}>{item.product_name}</td>
                          <td className={styles.Thead}>{item.category}</td>
                          <td className={styles.Thead}>{item.price}</td>
                          <td>
                            {" "}
                            <Image
                              src="/svg/delete-bin.svg"
                              height={20}
                              width={20}
                              alt="Logo Image"
                              className={styles.imageLogo}
                              // onClick={() =>
                              //   router.push(
                              //     `/onboarding/dashboard/product/upload-product/edit?id=${item._id}`
                              //   )
                              // }
                            ></Image>
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
      </AdminLayout>
    </div>
  );
};

export default Approved_Product;

export const getServerSideProps = async (context: any) => {
  const access_token = parseCookies({ req: context.req });

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    "products",
    async () =>
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/get_products`,
        {
          headers: {
            //@ts-ignore
            authorization: `bearer ${access_token.access_token}`,
          },
        }
      ).then((response) => response.json())
  );

  // Pass data to the page via props
  return { props: { dehydratedState: dehydrate(queryClient) } };
};
