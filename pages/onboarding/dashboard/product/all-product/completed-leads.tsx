import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useBuyerQuery, useProducts } from "../../../../../networkAPI/queries";
import styles from "../../../../../styles/Merchant/leads.module.scss";
import AdminLayout from "components/AdminLayout";
import RightArrow from "components/svg-icons/rightarrow";
import LeftArrow from "components/svg-icons/leftarrow";
import { dehydrate, QueryClient } from "react-query";
import { parseCookies } from "nookies";

const fetchUsers = async () => {
  const res = await fetch("/api/user/upload_product");
  return res.json();
};

const CustomerQuery: NextPage = () => {
  const router = useRouter();

  const [checked, setChecked] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isDeclined, setIsDeclined] = useState<boolean>(false);

  const { data, status } = useProducts();
  const { data: QueryData } = useBuyerQuery();
  const [merchantGedivata, setMerchantGedivata] = useState<any>();

  useEffect(() => {
    setMerchantGedivata(data);
  }, [data]);
  //@ts-ignore
  const total = QueryData?.filter((td: any) => td.isCompleted == true);
  console.log(QueryData)

  return (
    <div className={styles.container_width}>
      <AdminLayout>
        <div className={styles.mov}>
          <div>
            <h2 className={styles.subcatHeading}>Completed Leads Data</h2>
            <p>
              Here is data of Completed Leads
              <span style={{ color: "red" }}>({total?.length})</span>
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
                <h3>Completed Leads</h3>
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
                      <th className={styles.Thead}>Product Name</th>
                      <th className={styles.Thead}>Buyer Email</th>
                      <th className={styles.Thead}>Contact No</th>
                      <th className={styles.Thead}>Query</th>
                      <th className={styles.Thead}> Product Details</th>
                      <th className={styles.Thead}> Leads Type</th>
                    </tr>
                    {total?.map((item: any, index: any) => {
                      return (
                        <tr key={index} className={styles.Thead}>
                          <td className={styles.Thead1}>{index + 1}.</td>
                          <td className={styles.Thead}>{item.product_name}</td>
                          <td className={styles.Thead}>{item.buyer_Email}</td>
                          <td className={styles.Thead}>{item.buyer_Mob}</td>
                          <td className={styles.Thead}>{item.buyer_Message}</td>
                          <td className={styles.Thead}>
                            <div
                              className={styles.link_color}
                              onClick={() =>
                                router.push(`/product?id=${item.product_Id}`)
                              }
                            >
                              <Link href="">
                                <a>
                                  <u>Visit Product</u>
                                </a>
                              </Link>
                            </div>
                          </td>
                          <td className={styles.Thead}>{item.type}</td>
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

export default CustomerQuery;

export const getServerSideProps = async (context: any) => {
  const access_token = parseCookies({ req: context.req });

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    "buyerQuery",
    async () =>
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/getbuyerQuery`,
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
