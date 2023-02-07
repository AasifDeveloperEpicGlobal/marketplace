import React, { useEffect } from "react";
import styles from "../../../../../styles/Merchant/pricing1.module.scss";
import {
  useDeleteService,
  useGetService,
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
const TaxDataList = ({ setSubTab, setCurrentId }: activeProps) => {
  // main api call
  const { data: QueryData, refetch } = useGetService();
  const { mutate: deleteMutate, data: deletedData } = useDeleteService();
  const handleUpdate = (data: any) => {
    setCurrentId(data);
    setSubTab("update");
  };

  const DeleteService = React.useCallback(
    (e: React.MouseEvent<HTMLImageElement, MouseEvent>, item: any) => {
      e.preventDefault();
      const isConfirm = window.confirm(`Are you sure to Delete ${item?.name}`);
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

  //======================End  User Deactivate=========
  useEffect(() => {
    refetch();

    if (deletedData) {
      // @ts-ignore

      // toast.error(deletedData?.message);
      // refetch();
      //@ts-ignore
      if (deletedData?.success == true) {
        // @ts-ignore
        toast.success(deletedData?.message);

        refetch();
      }
    }
  }, [deletedData, refetch]);

  return (
    <div className={styles.addsectionbottom}>
      <div className={styles.mainTable}>
        <div>
          <div className={styles.maintableBoxx}>
            <div className={styles.tableBoxx}>
              <div>
                <h3>All Taxes</h3>
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
                      <th className={styles.Thead}>Service Name</th>
                      <th className={styles.Thead}>Rate</th>
                      <th className={styles.Thead}>Unit</th>
                      <th className={styles.Thead}>Quantity</th>
                      <th className={styles.Thead}>Amount</th>

                      <th className={styles.Thead}>Benefits</th>
                      <th className={styles.Thead}>Type</th>
                      <th className={styles.Thead}>Status</th>
                      <th className={styles.Thead}>Action</th>
                    </tr>
                    {QueryData?.data?.map((item: any, index: any) => {
                      return (
                        <tr key={index} className={styles.Thead}>
                          <td className={styles.Thead1}>{index + 1}.</td>
                          <td className={styles.Thead}>
                            <span style={{ color: "blue" }}>
                              <u>{item?.name}</u>
                            </span>
                          </td>
                          <td className={styles.Thead}>{item?.rate}</td>
                          <td className={styles.Thead}>{item?.unit}</td>
                          <td className={styles.Thead}>{item?.quantity}</td>
                          <td className={styles.Thead}>{item?.price}</td>

                          <td className={styles.Thead}>{item?.benifits}</td>
                          <td className={styles.Thead}>{item?.type}</td>

                          <td className={styles.Thead}>
                            {item?.createdAt ? "Active" : "Inactive"}
                          </td>

                          <td
                            style={{
                              display: "flex",
                              gap: "10px",
                              justifyContent: "center",
                              padding: "10px",
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
                            <td

                            // onClick={() =>
                            //   router.push(
                            //     `/super-admin/all-merchant/edit?id=${item?._id}`
                            //   )
                            // }
                            >
                              <Image
                                data-lazyloaded="1"
                                src="/svg/delete-bin.svg"
                                height={20}
                                width={20}
                                alt="Logo Image"
                                className={styles.imageLogo}
                                onClick={(e) => DeleteService(e, item)}
                              />
                            </td>
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

export default TaxDataList;
