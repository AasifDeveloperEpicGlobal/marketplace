import Download from "components/svg-icons/download";
import ExternalLink from "components/svg-icons/externallink";
import { useDeleteSubscription, useGetSubscription } from "networkAPI/queries";
import styles from "../../../../../styles/Merchant/pricing1.module.scss";
import Image from "next/image";
import React, { useEffect } from "react";
import RightArrow from "components/svg-icons/rightarrow";
import LeftArrow from "components/svg-icons/leftarrow";
import toast from "react-hot-toast";
import { saveAs } from 'file-saver'
import Invoice2 from "./invoice";

interface activeProps {
  setSubTab: any;
  setCurrentId: any;
}
const PaymentDetails = ({ setSubTab, setCurrentId }: activeProps) => {
  const { data: QueryData, refetch } = useGetSubscription();
  const { mutate: deleteMutate, data: deletedData } = useDeleteSubscription();

  const handleUpdate = (data: string) => {
    setCurrentId(data);

    setSubTab("update");
  };
  const handleDownload = (data:any) => {
    console.log(data)
    // window.open("/super-admin/pricing/invoice", "_blank");
    // window.open(`/invoice?id=${data?._id}`,"_blank")
    // console.log("invoice",data)
   
      
    // setSubTab("invoice")
   
    
  };

  const handleDownloadReceipt =(image:string)=>{
    saveAs(image, 'image.jpg')
  }


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
  }, [deletedData]);

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
        toast.error("this user has paid for service so you can't delete it");
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
                <h3>Payment List</h3>
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
                      <th className={styles.Thead}>Total</th>
                      <th className={styles.Thead}>Plan</th>
                      <th className={styles.Thead}>Payment Mode</th>
                      <th className={styles.Thead}>Action</th>
                      <th className={styles.Thead}>Payment</th>
                      <th className={styles.Thead}>Reciept</th>
                      <th className={styles.Thead}>Invoice</th>
                    </tr>
                    {QueryData?.data?.data.map((item: any, index: any) => {
                      console.log(item);
                      return (
                        <tr key={index} className={styles.Thead}>
                          <td className={styles.Thead1}>{index + 1}.</td>
                          <td className={styles.Thead}>{item?.gst}</td>
                          <td className={styles.Thead}>{item?.vendors_name}</td>
                          <td className={styles.Thead}>{item?.mobile_no}</td>
                          <td className={styles.Thead}>{item?.Amount}</td>
                          <td className={styles.Thead}>
                            {item?.plan?.map((arr: any, index: number) => {
                              return (
                                <div key={index}>
                                  <li>{arr?.label}</li>
                                </div>
                              );
                            })}
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
                            {item?.payment_status == false ? (
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
                            ) : (
                              <td>
                                {" "}
                                <Image
                                  data-lazyloaded="1"
                                  src="/svg/edit.svg"
                                  height={20}
                                  width={20}
                                  alt="Logo Image"
                                  className={styles.imageLogo}
                                />
                              </td>
                            )}

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
                          <td  className={styles.imageLogo}>
                            <Image src={item?.image?item.image[0]:"/"} height={50} width={50} alt="" onClick={()=>handleDownloadReceipt(item?.image[0])} />
                          </td>
                          <td
                            style={{
                              display: "flex",
                              gap: "10px",
                              justifyContent: "center",
                              padding: "10px",
                            }}
                          >
                            {item?.payment_status ? (
                              <span onClick={()=>handleDownload(item)}>
                                <Download />
                              </span>
                            ) : (
                              <span style={{ color: "grey" }}>
                                <Download />
                              </span>
                            )}

                            <span>
                              <ExternalLink />
                            </span>
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
      </div>
    </div>
  );
};

export default PaymentDetails;
