import React, { useEffect, useRef, useState } from "react";

import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAppSelector } from "redux/hooks";

import { useGetBanner } from "../../../networkAPI/queries";
import styles from "../../../styles/Merchant/adminbanner.module.scss";
import SuperAdminLayout from "components/SuperAdmin/Layout";

const Admin: NextPage = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState<string>("");
  const dropdownRef = useRef<any>("");

  // const {  user, isAuthenticated } = useAppSelector(
  //   (state) => state.user
  // );


  const { data, status } = useGetBanner();



  return (
    <>
      <SuperAdminLayout>
        <div className={"styles.Flex_Container"}>
          <h1 className={styles.heading}>All Banner List</h1>
          {data?.data.map((item: any, index: any) => {
            return (
              <div key={index}>
                <div className={styles.newMain}>
                  <div>
                    <div className="reporttable">
                      <table className={styles.table3}>
                        <tbody>
                          <tr>
                            <th>Category Name:</th>

                            <span className={styles.centerHeading}>
                              {" "}
                              {item.type}
                            </span>
                          </tr>
                          <tr>
                            <th>Banner1</th>
                            <td>
                              <Image
                                src={
                                  item?.banner_image1[0]
                                    ? item?.banner_image1[0]
                                    : "/"
                                }
                                alt=""
                                width={500}
                                height={150}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th>Banner2</th>
                            <td>
                              <Image
                                src={
                                  item?.banner_image2[0]
                                    ? item?.banner_image2[0]
                                    : "/"
                                }
                                alt=""
                                width={500}
                                height={150}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th>Banner3</th>
                            <td>
                              <Image
                                src={
                                  item?.banner_image3[0]
                                    ? item?.banner_image3[0]
                                    : "/"
                                }
                                alt=""
                                width={500}
                                height={150}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th>Banner4</th>
                            <td>
                              <Image
                                src={
                                  item?.banner_image4[0]
                                    ? item?.banner_image4[0]
                                    : "/"
                                }
                                alt=""
                                width={500}
                                height={150}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th>Banner5</th>
                            <td>
                              <Image
                                src={
                                  item?.banner_image5[0]
                                    ? item?.banner_image5[0]
                                    : "/"
                                }
                                alt=""
                                width={500}
                                height={150}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            <td className={styles.bannerFlex}>
                              <span>
                                <h3>Want to update banners?</h3>
                              </span>
                              <span>
                                <button
                                  className={styles.updatebutton}
                                  onClick={() =>
                                    router.push(
                                      `/super-admin/banner/edit?_Id=${item._id}&type=${item.type}`
                                    )
                                  }
                                >
                                  Update
                                </button>
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SuperAdminLayout>
    </>
  );
};

export default Admin;
