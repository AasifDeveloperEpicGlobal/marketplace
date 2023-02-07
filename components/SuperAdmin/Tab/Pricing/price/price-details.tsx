import React, { useEffect } from "react";
import styles from "../../../../../styles/Merchant/pricing1.module.scss";
import {
  useDeleteRate,
  useGetMRPRate,
} from "../../../../../networkAPI/queries";
// import styles from "../../../../../styles/Merchant/pricing1.module.scss";
// @ts-ignore
import Image from "next/image";
import RightArrow from "components/svg-icons/rightarrow";
import LeftArrow from "components/svg-icons/leftarrow";
import toast from "react-hot-toast";
interface activeProps {
  setSubTab: any;
  setCurrentId: any;
}

const PriceDetails = ({ setSubTab, setCurrentId }: activeProps) => {
  // main api call
  const { data: QueryData, refetch } = useGetMRPRate();
  const { mutate: deleteMutate, data: deletedData } = useDeleteRate();

  const handleUpdate = (data: string) => {
    setCurrentId(data);

    setSubTab("update");
  };
  useEffect(() => {
    // refetch();

    if (deletedData) {
      // @ts-ignore

      //   toast.error(deletedData?.message);
      // refetch();
      //@ts-ignore
      if (deletedData?.success == true) {
        // @ts-ignore
        toast.success(deletedData?.message);

        refetch();
      } else {
        // toast.error(deletedData?.message);
      }
    }
  }, [deletedData, refetch]);

  const DeleteMrpRate = React.useCallback(
    (e: React.MouseEvent<HTMLImageElement, MouseEvent>, item: any) => {
      e.preventDefault();
      const isConfirm = window.confirm(`Are you sure to Delete ${item?.price}`);
      if (isConfirm) {
        deleteMutate(
          {
            id: item._id,
          },
          {
            onSuccess: () => {},
          }
        );
        // router.reload();
      }
    },
    [deleteMutate]
  );

  return (
    <div className={styles.addsectionbottom}>
      <div className={styles.mainTable}>
        <div className={styles.maintableBoxx}>
          <div className={styles.tableBoxx}>
            <div>
              <h3>All Prices</h3>
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
            <table
              id="table-to-xls"
              className={styles.tableMerchant}
              // style={{ overflowX: "auto" }}
            >
              <tbody>
                <tr className={styles.Thead}>
                  <th className={styles.Thead1}>S no</th>
                  <th className={styles.Thead}>MRP</th>
                  <th className={styles.Thead}>Unit</th>
                  <th className={styles.Thead}>Status</th>
                  <th className={styles.Thead}>Actions</th>
                </tr>
                {QueryData?.data?.data?.map((item: any, index: any) => {
                  return (
                    <tr key={index} className={styles.Thead}>
                      <td className={styles.Thead1}>{index + 1}.</td>
                      <td
                        className={styles.Thead}
                        // onClick={() => HandleUserProduct(item)}
                      >
                        <span style={{ color: "blue" }}>
                          <u>{item?.price}</u>
                        </span>
                      </td>

                      <td
                        className={styles.Thead}
                        // onClick={() => HandleUserProduct(item)}
                      >
                        <span style={{ color: "blue" }}>
                          <u>{item?.unit}</u>
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
                        }}
                      >
                        <td onClick={() => handleUpdate(item)}>
                          <Image
                            data-lazyloaded="1"
                            src="/svg/edit.svg"
                            height={20}
                            width={20}
                            alt="Logo Image"
                            className={styles.imageLogo}
                          />
                        </td>
                        {/* <td>
                          <Image
                            data-lazyloaded="1"
                            src="/svg/delete-bin.svg"
                            height={20}
                            width={20}
                            alt="Logo Image"
                            className={styles.imageLogo}
                            onClick={(e) => DeleteMrpRate(e, item)}
                          />
                        </td> */}
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
  );
};

export default PriceDetails;
