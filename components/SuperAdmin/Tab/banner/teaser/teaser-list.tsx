import React from "react";
import styles from "../../../../../styles/banners/bannerlistdata.module.scss";
import { useRouter } from "next/router";
import {
  useDeleteService,
  useGetTeaserBanner,
} from "../../../../../networkAPI/queries";
import Image from "next/image";
import RightArrow from "components/svg-icons/rightarrow";
import LeftArrow from "components/svg-icons/leftarrow";
import { toast } from "react-hot-toast";
// import styles1 from "../../../styles/Merchant/priceservice.module.scss";

interface activeProps {
  setSubTab: any;
  setCurrentId: any;
}

const TeaserDataList = ({ setSubTab, setCurrentId }: activeProps) => {
  const router = useRouter();

  const { data: QueryData, refetch } = useGetTeaserBanner();
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
      }
    },
    [deleteMutate]
  );

  React.useEffect(() => {
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
    <div className={"styles.mainTable"}>
      <div className={styles.tabledata}>
        <div className={styles.maintableBoxx}>
          <div className={styles.tableBoxx}>
            <div>
              <h3>Teaser Banner</h3>
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
                  <th className={styles.Thead}>Merchant Name</th>
                  <th className={styles.Thead}>Image</th>
                  <th className={styles.Thead}>Status</th>
                  <th className={styles.Thead}>Action</th>
                </tr>
                {QueryData?.data?.map((item: any, index: any) => {
                  return (
                    <tr key={index} className={styles.Thead}>
                      <td className={styles.Thead1}>{index + 1}.</td>
                      <td className={styles.Thead}>
                        <span style={{ color: "blue" }}>
                          <u>{item?.merchant_name}</u>
                        </span>
                      </td>
                      <td className={styles.Thead}>
                        {}
                        <Image
                          src={item?.banner_image[0]}
                          alt=""
                          priority={true}
                          height={50}
                          width={200}
                        />
                      </td>

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
                          {" "}
                          <Image
                            src="/svg/edit.svg"
                            height={20}
                            width={20}
                            priority={true}
                            alt="Logo Image"
                            className={styles.imageLogo}
                          />
                        </td>
                        <td>
                          <Image
                            src="/svg/delete-bin.svg"
                            height={20}
                            width={20}
                            alt="Logo Image"
                            priority={true}
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
  );
};

export default TeaserDataList;
