import React, { useRef, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAppSelector } from "redux/hooks";
import {
  usePublicProduct,
  usePublishedProduct,
} from "../../../networkAPI/queries";
import styles from "../../../styles/Merchant/approved-listing.module.scss";
import SuperAdminLayout from "components/SuperAdmin/Layout";
import RightArrow from "components/svg-icons/rightarrow";
import LeftArrow from "components/svg-icons/leftarrow";

const Approved_Product_By_User: NextPage = () => {
  const [isApproved, setisApproved] = useState<boolean>(false);
  const [isDeclined, setIsDeclined] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const router = useRouter();
  const dropdownRef = useRef<any>(null);
  const [select, setSelect] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean[]>([]);
  const togglePopup = (index: number) => {
    const temp = [...isOpen];
    temp[index] = !temp[index];
    setIsOpen(temp);
  };
  const getData = usePublicProduct();
  const test = getData.data;
  const { error, isLoading, data, isSuccess } = usePublishedProduct();
  const UserId = router.query?.id;
  const userProduct = data?.data?.filter(
    (item: any) => UserId == item?.auther_Id
  );

  console.log("hello baba", userProduct);

  return (
    <>
      <SuperAdminLayout>
        <div className={styles.superadmintabledata}>
          <div className={"styles.Flex_Container"} ref={dropdownRef}>
            <div className={styles.mov}>
              <div>
                <h1 className={styles.subcatHeading}>
                  {userProduct ? userProduct[0]?.vendors_name : null} Products
                  List
                </h1>
                <p>
                  Here is Merchant Products List data
                  <span style={{ color: "red" }}>
                    {" "}
                    ({userProduct?.length}){" "}
                  </span>
                  here
                </p>
              </div>
            </div>
            <div className={styles.mainTable}>
              <div className={styles.maintableBoxx}>
                <div className={styles.tableBoxx}>
                  <div>
                    <h3>{userProduct ? userProduct[0]?.vendors_name : null}</h3>
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
                </div>
                <div className={styles.tableBox}>
                  <table className={styles.Thead}>
                    <tbody>
                      <tr className={styles.Thead}>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Product Category</th>
                        <th>Product Price(per/unit)</th>
                        <th>Uploaded Date</th>
                        <th>Approved Date</th>
                      </tr>

                      {data?.data
                        ?.filter((items: any) => UserId == items?.auther_Id)
                        .map((item: any, index: any) => {
                          return (
                            <tr key={index}>
                              <td>
                                <Image
                                  src={
                                    item?.product_image1[0]
                                      ? item?.product_image1[0]
                                      : "/"
                                  }
                                  alt=""
                                  width="50px"
                                  height="50px"
                                  className={styles.ImageBox}
                                />
                              </td>

                              <td>
                                <div className="product_name">
                                  {item.product_name}
                                </div>
                              </td>
                              <td>
                                <div className="category">{item.category}</div>
                              </td>
                              <td>
                                <div className="price">{item.price}</div>
                              </td>
                              <td>
                                <p>{item.createdAt.slice(0, 10)}</p>
                              </td>
                              <td>
                                <p>{item.updatedAt.slice(0, 10)}</p>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </SuperAdminLayout>
    </>
  );
};

export default Approved_Product_By_User;
