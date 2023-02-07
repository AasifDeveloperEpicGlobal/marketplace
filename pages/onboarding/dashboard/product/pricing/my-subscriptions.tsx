/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../../../../../styles/Merchant/allproduct.module.scss";
import {
  useGetInvoice,
  useGetSubscription,
  useProducts,
} from "../../../../../networkAPI/queries";
import AdminLayout from "components/AdminLayout";
import RightArrow from "components/svg-icons/rightarrow";
import LeftArrow from "components/svg-icons/leftarrow";
import ExternalLink from "components/svg-icons/externallink";
import Download from "components/svg-icons/download";
import Link from "next/link";
import Cancel from "components/svg-icons/cancel";
import Paid from "components/AdminComponent/paid";
import Unpaid from "components/AdminComponent/unpaid";
import PayNow from "components/Pricing/paynowbutton";

const SubscriptionPage: NextPage = (props) => {
  const [modal, setModal] = useState(false);
  const [paymentLink, setPaymentLink] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState(true);
  const { data: InvoiceData, refetch } = useGetInvoice();
  const [subscriptionData, setSubscriptionData] = useState<any>({});
  const invoice = InvoiceData?.data?.data[0];
  console.log(InvoiceData);
  console.log(InvoiceData?.data?.data?.filter((item:any)=>item.payment_status==true).length);
  const subscribedData= InvoiceData?.data?.data?.filter((item:any)=>item.payment_status==true)

  const modalbutton = () => {
    setModal(true);
  };

  const closemodalicon = () => {
    setModal(false);
  };

  const handleDownload = () => {
    window.open("/super-admin/pricing/invoice", "_blank");
    // window.open("/invoice","_blank")
  };
  const PayLink = (item: any) => {
    setPaymentLink(item?.payment_link);
    window.open(item?.payment_link, "_blank");
  };
  useEffect(() => {
    InvoiceData?.data?.data?.map((item: any) => {
      setSubscriptionData(item);
    });
  }, [InvoiceData]);
 

  return (
    <div className={styles.container_width}>
      <AdminLayout>
        <div>
          <div className={styles.mov}>
            <div>
              <h2 className={styles.subcatHeading}>Subscription Details</h2>
              <p>
                Here is data of my Subscriptions
                <b>
                  {" "}
                  <span style={{ color: "red" }}>
                    (
                    {
                      //@ts-ignore
                      subscribedData?.length
                    }
                    )
                  </span>{" "}
                </b>
              </p>
            </div>
          </div>
        </div>



        <div className={styles.mainTable}>
          <div className={styles.maintableBoxxsubscription}>
            <div className={styles.tableBoxx}>
              <div>
                <h3>Subscription Details</h3>
              </div>

              <div className={styles.arrowBox}>
                <div>
                  <span className={styles.paginationtext}>1 - 10 </span>of 640
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
              <div className={styles.tablescroll}>
                <table id="table-to-xls" className={styles.tableMerchant}>
                  <thead>
                    <tr className={styles.Thead}>
                      <th className={styles.Thead1}>Sr No.</th>
                      <th className={styles.Thead1}>Service </th>{" "}
                      <th className={styles.Thead1}>Validity</th>
                      <th className={styles.Thead1}>Duration</th>
                      <th className={styles.Thead1}>Rate</th>
                      <th className={styles.Thead1}>Tax</th>
                      <th className={styles.Thead}>Amount</th>
                      <th className={styles.Thead}>Due Date</th>
                      <th className={styles.Thead}>Status</th>
                      <th className={styles.Thead}>Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribedData?.map((item: any, index: any) => {
                      return  (
                        <tr className={styles.Thead} key={index}>
                          <td className={styles.Thead1}> {index + 1}.</td>
                          <td className={styles.Thead}>
                            {item?.plan?.map((item: any, index: number) => {
                              console.log(item.label);
                              return (
                                <div key={index}>
                                  <li>{item?.label}</li>
                                </div>
                              );
                            })}
                          </td>
                          <td>{item?.validity}</td>
                          <td>
                            <p>
                              {item?.start_date.slice(0, 10)} To &nbsp;
                              {item?.end_date.slice(0, 10)}
                            </p>
                          </td>
                          <td>{item.price}</td>
                          <td>{item?.Amount - item?.price}</td>
                          <td>{item?.Amount}</td>
                          <td className={styles.Thead}>
                            {" "}
                            {item.end_date.slice(0, 10)}
                          </td>

                          {item?.payment_status ? (
                            <>
                              <td className={styles.Thead}>
                               Active
                              </td>
                            </>
                          ) : (
                            <>
                              <td className={styles.Thead}>
                                Inactive
                              </td>
                            </>
                          )}

                          {item?.payment_status ? (
                            <td
                              className={styles.Thead}
                              onClick={handleDownload}
                            >
                              <Link href="">
                                <span className={styles.downloadtext}>
                                  Download
                                </span>
                              </Link>
                            </td>
                          ) : (
                            <td style={{ color: "lightgray" }}> Download</td>
                          )}
                        </tr>
                      ) 
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

export default SubscriptionPage;
