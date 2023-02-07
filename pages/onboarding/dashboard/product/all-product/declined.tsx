/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { useProducts } from "../../../../../networkAPI/queries";
import styles from "../../../../../styles/Merchant/allproduct.module.scss";
import AdminLayout from "components/AdminLayout";
import RightArrow from "components/svg-icons/rightarrow";
import LeftArrow from "components/svg-icons/leftarrow";
import { dehydrate, QueryClient } from "react-query";
import { parseCookies } from "nookies";

const fetchUsers = async () => {
  const res = await fetch("/api/user/upload-product");
  return res.json();
};

const Declined_product: NextPage = () => {
  const router = useRouter();

  // const { error, user, isAuthenticated } = useAppSelector(
  //   (state) => state.user
  // );

  const { data, status } = useProducts();
  const [merchantGetData, setMerchantGetData] = useState<any>();
  const data1 = useProducts();

  useEffect(() => {
    setMerchantGetData(data);
  }, [data]);

  const count = merchantGetData?.filter(
    (item: any) => item.isDeclined == true
  );

  return (
    <div className={styles.container_width}>
      <AdminLayout>
        <div className={styles.mov}>
          <div>
            <h2 className={styles.subcatHeading}>Declined Products</h2>
            <p>
              Here is data of Declined Products
              <b>
                <span style={{ color: "red" }}> ({count?.length})</span>
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
                <h3>All Declined Products</h3>
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
                <table id="table-to-xls" className={styles.tableMerchant}>
                  <tbody>
                    <tr className={styles.Thead}>
                      <th className={styles.Thead1}>Sr No.</th>
                      <th className={styles.Thead1}>Image</th>
                      <th className={styles.Thead}>Product Name</th>
                      <th className={styles.Thead}>Category</th>
                      <th className={styles.Thead}>Price(per/piece)</th>
                      <th className={styles.Thead}> Actions</th>
                    </tr>
                    {count?.map((item: any, index: number) => {
                      return (
                        <tr key={index} className={styles.Thead}>
                          <td className={styles.Thead1}>{index + 1}.</td>

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
                            <Image
                              data-lazyloaded="1"
                              src="/svg/edit.svg"
                              height={24}
                              width={24}
                              alt="Logo Image"
                              className={styles.imageLogo}
                              onClick={() =>
                                router.push(
                                  `/onboarding/dashboard/product/upload-product/edit?id=${item._id}`
                                )
                              }
                            />
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

export default Declined_product;

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
