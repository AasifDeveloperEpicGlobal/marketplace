import React, { useRef, useState } from "react";
import styles from "../../../../../styles/Merchant/pricing1.module.scss";
import {
  useBuyerQuery,
  useBuyerQueryCount,
  useBuyerQuerySuperAdmin,
  useGetDemoData,
} from "../../../../../networkAPI/queries";
// import styles from "../../../../../styles/Merchant/pricing1.module.scss";
// @ts-ignore
import Image from "next/image";
import RightArrow from "components/svg-icons/rightarrow";
import LeftArrow from "components/svg-icons/leftarrow";
import { parseCookies } from "nookies";
import { dehydrate, QueryClient } from "react-query";
import WhiteCancelButton from "components/svg-icons/whitecancelbutton";
import useClickOutside from "components/svg-icons/outsideclick";

const BookYourDemoLead = () => {
  const [message, setMessage] = useState<string>("");
  const [merchant, setMerchant] = useState<string>("");
  const { data: QueryData } = useGetDemoData();
  const { data: count } = useBuyerQueryCount();
  const HandleMessageView = (msg: any) => {
    setMessage(msg.buyer_Message);
    setMerchant(msg._id);
  };
  const EmailLeads = QueryData?.data?.filter(
    (item: any) => item.type == "demo"
  );
  
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setIsVisible(false));

  return (
    <div className={styles.addsectionbottom}>
      <div className={styles.tablepadding}>
        <div className={styles.mainTable}>
          <div className={styles.maintableBoxx}>
            <div className={styles.tableBoxx}>
              <div>
                <h3>Book Your Demo Leads Data</h3>
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
              <div className={styles.tablescroll}>
                <table
                  id="table-to-xls"
                  className={styles.tableMerchant}
                  // style={{ overflowX: "auto" }}
                >
                  <thead>
                    <tr className={styles.Thead}>
                      <th className={styles.Thead1}>S no</th>
                      <th className={styles.Thead}>Merchant Id</th>
                      <th className={styles.Thead}>Name</th>
                      <th className={styles.Thead}>Email</th>
                      <th className={styles.Thead}>Mobile</th>
                      <th className={styles.Thead}>Business Name</th>
                      <th className={styles.Thead}>Process</th>
                      <th className={styles.Thead}>Demo Date</th>
                      <th className={styles.Thead}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EmailLeads?.map((item: any, index: any) => {
                      return (
                        <tr key={index} className={styles.Thead}>
                          <td className={styles.Thead1}>{index + 1}.</td>
                          <td className={styles.Thead}>
                            <span style={{ color: "blue" }}>
                              <u>{item?.merchant_Id}</u>
                            </span>
                          </td>

                          <td className={styles.Thead}>
                            <span>{item?.name.slice(0, 20)}</span>
                          </td>

                          <td className={styles.Thead}>
                            <span>{item?.email}</span>
                          </td>

                          <td className={styles.Thead}>
                            <span>{item?.mobile}</span>
                          </td>
                          
                          <td className={styles.Thead}>
                            <span>{item?.business_name}</span>
                          </td>
                          
                          <td className={styles.Thead}>
                            <span>{item?.process}</span>
                          </td>
                          
                          <td className={styles.Thead}>
                            <span>{item?.date}</span>
                          </td>
                          {/* <td className={styles.Thead}>
                            <span
                              ref={ref}
                              onClick={() => setIsVisible(!isVisible)}
                            >
                              <p className={styles.lineclamp}>
                                {item?.business_name}
                              </p>
                              <div
                                className={styles.tooltipbox}
                                onClick={() => HandleMessageView(item)}
                              >
                                <button
                                  className={styles.viewmorebutton}
                                  onClick={() => setIsVisible(!isVisible)}
                                >
                                  View more..
                                </button>
                                <span>
                                  {isVisible && merchant == item._id ? (
                                    <p className={styles.tooltip}>{message}</p>
                                  ) : (
                                    ""
                                  )}
                                </span>
                              </div>
                            </span>
                          </td> */}

                          <td className={styles.Thead}>
                            {item?.createdAt ? "Active" : "Inactive"}
                          </td>

                          {/* <td
                            style={{
                              display: "flex",
                              gap: "10px",
                              justifyContent: "center",
                            }}
                          >
                            <td>
                              <Image
                                data-lazyloaded="1"
                                src="/svg/edit.svg"
                                height={20}
                                width={20}
                                alt="Logo Image"
                                className={styles.imageLogo}
                              />
                            </td>
                            <td>
                              <Image
                                data-lazyloaded="1"
                                src="/svg/delete-bin.svg"
                                height={20}
                                width={20}
                                alt="Logo Image"
                                className={styles.imageLogo}
                              />
                            </td>
                          </td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookYourDemoLead;
