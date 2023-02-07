import React, { useEffect, useState } from "react";
import styles from "../../../../../styles/Merchant/pricing1.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAppDispatch } from "redux/hooks";
import {
  useDeleteSubscription,
  useGetSubscription,
  useResendPayLink,
  useSendSmsSubscibed,
} from "../../../../../networkAPI/queries";

import RightArrow from "components/svg-icons/rightarrow";
import LeftArrow from "components/svg-icons/leftarrow";
import toast from "react-hot-toast";
import Download from "components/svg-icons/download";
import ExternalLink from "components/svg-icons/externallink";

import Resend from "components/svg-icons/resend";
import Invoice2 from "pages/super-admin/pricing/invoice2";

interface activeProps {
  setSubTab: any;
  setCurrentId: any;
}

const SubscriptionDataList = ({ setSubTab, setCurrentId }: activeProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selectedData, setSelectedData] = useState<any>({});
  const [payment_link, setPaymentLink] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [receipt, setReceipt] = useState<any>([]);

  const { mutate: smsSubscribed, isSuccess } = useSendSmsSubscibed();

  // const { data, status } = useGetMerchantDetailsData(currentPage);

  const { data: QueryData, refetch } = useGetSubscription();
  const { mutate: deleteMutate, data: deletedData } = useDeleteSubscription();
  const { mutate: resendlink, data: resendata } = useResendPayLink();
  console.log(resendata);

  const handlePrint = (data: any) => {
    setReceipt(data);
    const test = QueryData?.data?.data?.find(
      (item: any) => item._id == data?._id
    );
    console.log(test?._id, data?._id);

    setSelectedData(test);
    if (test?._id == data?._id) {
      data?.payment_status
        ? window.open("pricing/invoice", "_blank", "noopener,noreferrer")
        : setAlertMessage("Please make Payment First");
    }

    if (receipt) {
      <Invoice2 itemData={receipt} />;
    }
  };

  console.log(QueryData?.data?.data);

  const handleUpdate = (data: any) => {
    setCurrentId(data);

    !data?.payment_status ? setSubTab("update") : null;
  };
  const handleSend = (id: string) => {
    setPaymentLink("https://merchant.cashfree.com/merchant/login");
    resendlink({
      payment_link,
      id,
    });
    //@ts-ignore
    toast.success(resendata ? resendata.message : "");
  };
  useEffect(() => {
    refetch();

    if (deletedData) {
      // refetch();
      //@ts-ignore
      if (deletedData?.success == true) {
        // @ts-ignore
        toast.success(deletedData?.message);

        refetch();
      } else {
        // @ts-ignore

        toast.error(deletedData?.message);
      }
    }
  }, [deletedData, refetch]);

  const DeleteMrpRate = React.useCallback(
    (e: React.MouseEvent<HTMLImageElement, MouseEvent>, item: any) => {
      e.preventDefault();

      if (!item.payment_status) {
        const isConfirm = window.confirm(
          `Are you sure to Delete ${item?.price}`
        );
        if (isConfirm) {
          deleteMutate(
            {
              id: item._id,
            },
            {
              onSuccess: () => {},
            }
          );
        }

        // router.reload();
      } else if (item.payment_status) {
        toast.error(`This plan is currently active so you can't delete `);
      }
    },
    [deleteMutate]
  );

  return (
    <div className={styles.addsectionbottom}>
      <div className={styles.mainTable}>
        <div>
          <div className={styles.maintableBoxx}>
            <div className={styles.tableBoxx}>
              <div>
                <h3>Subscription List</h3>
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
                  <tbody>
                    <tr className={styles.Thead}>
                      <th className={styles.Thead1}>S no</th>
                      <th className={styles.Thead}>GST No.</th>
                      <th className={styles.Thead}>Name</th>
                      <th className={styles.Thead}>Mobile</th>
                      {/* <th className={styles.Thead}>Email</th> */}
                      {/* <th className={styles.Thead}>Address</th> */}
                      <th className={styles.Thead}>Price</th>{" "}
                      <th className={styles.Thead}>Total</th>
                      <th className={styles.Thead}>Plan</th>
                      <th className={styles.Thead}>Start Date</th>
                      <th className={styles.Thead}>Expiry Date</th>
                      <th className={styles.Thead}>Payment Mode</th>
                      <th className={styles.Thead}>Action</th>{" "}
                      <th className={styles.Thead}>Payment</th>
                      <th className={styles.Thead}>Invoice</th>
                    </tr>
                    {QueryData?.data?.data.map((item: any, index: any) => {
                      return (
                        <tr key={index} className={styles.Thead}>
                          <td className={styles.Thead1}>{index + 1}.</td>
                          {/* <td
                        className={styles.Thead}
                       
                      >
                        <span style={{ color: "blue" }}>
                          <u>{item?.name}</u>
                        </span>
                      </td> */}

                          <td className={styles.Thead}>{item?.GST_No}</td>
                          <td className={styles.Thead}>{item?.vendors_name}</td>
                          <td className={styles.Thead}>{item?.mobile_no}</td>
                          {/* <td className={styles.Thead}>{item?.email}</td> */}
                          {/* <td className={styles.Thead}>{item?.address}</td> */}

                          <td className={styles.Thead}>{item?.price}</td>
                          <td className={styles.Thead}>{item?.Amount}</td>
                          {/* <td className={styles.Thead}>{item?.Service}</td>
                      <td className={styles.Thead}>{item?.benifits}</td> */}
                          <td className={styles.Thead}>
                            {item?.plan?.map(
                              (arrayItem: any, index: number) => {
                                return (
                                  <div key={index}>
                                    {/* <li>{index}.</li> */}
                                    <li>{arrayItem?.label + "  "}</li>
                                  </div>
                                );
                              }
                            )}
                          </td>
                          <td className={styles.Thead}>
                            {item?.start_date.slice(0, 10)}
                          </td>
                          <td className={styles.Thead}>
                            {item?.end_date.slice(0, 10)}
                          </td>

                          <td className={styles.Thead}>{item?.payment_mode}</td>

                          <td
                            style={{
                              display: "flex",
                              gap: "10px",
                              justifyContent: "center",
                              padding: "10px",
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
                                onClick={() => handleUpdate(item)}
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
                                onClick={(e) => DeleteMrpRate(e, item)}
                              />
                            </td>
                          </td>
                          <td className={styles.Thead}>
                            {item?.payment_status ? (
                              <span className={styles.PaymentSuccess}>
                                Success
                              </span>
                            ) : (
                              <span className={styles.PaymentPending}>
                                Pending
                              </span>
                            )}
                          </td>
                          <td
                            style={{
                              display: "flex",
                              gap: "10px",
                              justifyContent: "space-between",
                              padding: "10px",
                            }}
                          >
                            {/* <span className={styles.pendingpayment}> */}

                            <td
                              onClick={() => handlePrint(item)}
                              className="cursor"
                            >
                              <Download />
                            </td>

                            {/* </span> */}
                            {/* <td>
                              <ExternalLink />
                            </td> */}
                            {item?.payment_status ? null : (
                              <td
                                style={{ color: "blue" }}
                                onClick={() => handleSend(item?._id)}
                              >
                                <Resend />
                              </td>
                            )}
                          </td>
                          <span style={{ color: "red" }}>
                            {selectedData?._id == item?._id
                              ? alertMessage
                              : null}
                          </span>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDataList;
