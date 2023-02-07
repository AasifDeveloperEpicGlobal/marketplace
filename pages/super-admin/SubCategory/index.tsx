import React, { useEffect, useRef, useState } from "react";
import styles from "../../../styles/Merchant/allcategorylist.module.scss";
import { NextPage } from "next";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";

// @ts-ignore
import {
  useDeleteSubCategory,
  useGetCategory,
  useGetSubCategory,
  useHideShowSubCategory,
} from "../../../networkAPI/queries";
import SuperAdminLayout from "components/SuperAdmin/Layout";
import Link from "next/link";
import RightArrow from "components/svg-icons/rightarrow";
import LeftArrow from "components/svg-icons/leftarrow";
import { dehydrate, QueryClient } from "react-query";
import { parseCookies } from "nookies";

const SubCategory: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState<string>("");
  const [category_id, setCategory_id] = useState<string>("");
  const dropdownRef = useRef<any>("");
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const { data, refetch } = useGetSubCategory();
  const { data: deletedData, mutate: deleteMutate } = useDeleteSubCategory();
  const { data: category_data } = useGetCategory();
  const { data: hideShowData, mutate } = useHideShowSubCategory();
  const Show = React.useCallback(
    (e: React.MouseEvent<HTMLImageElement, MouseEvent>, item2: any) => {
      e.preventDefault();
      mutate(
        {
          id: item2._id,
          isHide: show,
        },
        {
          onSuccess: () => {
            //@ts-ignore
            if (hideShowData) {
              //@ts-ignore
              toast.success(hideShowData?.message);
              refetch();
              //@ts-ignore
              if (hideShowData.success) router.push("/super-admin/SubCategory");
            }
          },
        }
      );
      // router.reload();
      // refetch()
    },
    [hideShowData, mutate, refetch, router, show]
  );

  const Hide = React.useCallback(
    (e: React.MouseEvent<HTMLImageElement, MouseEvent>, item2: any) => {
      e.preventDefault();
      mutate(
        {
          id: item2._id,
          isHide: !show,
        },
        {
          onSuccess: () => {
            //@ts-ignore
            if (hideShowData) {
              //@ts-ignore
              toast.success(hideShowData?.message);
              refetch();
              //@ts-ignore
              if (hideShowData.success) router.push("/super-admin/SubCategory");
            }
          },
        }
      );
    },
    [hideShowData, mutate, refetch, router, show]
  );

  const DeleteSubCategory = React.useCallback(
    (e: React.MouseEvent<HTMLImageElement, MouseEvent>, item: any) => {
      e.preventDefault();
      const isConfirm = window.confirm(
        `Are you sure to Delete ${item?.category_name}`
      );
      if (isConfirm) {
        deleteMutate(
          {
            id: item._id,
          },
          {
            onSuccess: () => {
              // @ts-ignore
              // delay(5000);
              // router.push("/onboarding/dashboard/product/all-product");
              // router.prefetch();
              // window.location.replace();
              // ref.current
              // router.reload();
            },
          }
        );
        // router.reload();
      }
    },
    [deleteMutate]
  );

  useEffect(() => {
    // refetch2();
    //@ts-ignore
    if (deletedData) {
      //@ts-ignore
      toast.success(deletedData?.message);
      refetch();
      //@ts-ignore
      if (deletedData.success) router.push("/super-admin/SubCategory");
    }
  }, [deletedData, refetch, router]);

  useEffect(() => {
    category_data?.data?.map((item: any) => {
      setCategory_id(item.category_name);
    });
    if (category_data?.status == 200) {
      // refetch2()
    }
  }, [category_data, category_id]);

  return (
    <>
      <SuperAdminLayout>
        <div className={styles.mov}>
          <div>
            <h1 className={styles.subcatHeading}>Subcategory List </h1>
            <p>
              Here is the data
              <span style={{ color: "red" }}>({data?.data?.length})</span> of
              Subcategory List
            </p>
          </div>
          <div>
            <button type="button" className={styles.downloadButton}>
              <Link href="#"> Download </Link>
            </button>
          </div>
        </div>
        <div className={styles.maintableBoxx}>
          <div className={styles.tableBoxx}>
            <div>
              <h3>Subcategory List</h3>
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
          <div className={styles.Flex_Container}>
            <div>
              <div>
                <table id="table-to-xls" className={styles.tablein}>
                  <thead>
                    <tr>
                      <th>Sr No.</th>
                      <th>Category </th>
                      <th>Subcategory Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category_data?.data?.map((item: any, index: any) => {
                      return (
                        <>
                          <tr key={index} className={styles.firstableRow}>
                            <td>{index + 1}</td>
                            <td>{item.category_name}</td>
                            <td>
                              <table className={styles.table2main}>
                                <thead>
                                  <tr>
                                    <th>Sr No:</th>

                                    <th>Subcategory Name</th>

                                    <th>Image</th>

                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    //@ts-ignore
                                    data?.data
                                      ?.filter(
                                        (item3: any) =>
                                          item._id == item3.category_Id
                                      )
                                      .map((item2: any, i: any) => {
                                        return (
                                          <tr
                                            key={i}
                                            // className={styles.tableMain}
                                            className={` ${styles.Flex_Container}`}
                                          >
                                            {/* <div>{index + 1}.</div>
                                    <div>{item.category_name}</div> */}
                                            <td>{i + 1}.</td>
                                            <td>{item2.sub_category_name}</td>
                                            <td>
                                              <div>
                                                <Image
                                                  src={
                                                    item2.sub_category_image[0]
                                                      ? item2
                                                          .sub_category_image[0]
                                                      : "/omratrade/homebanner.png"
                                                  }
                                                  alt=""
                                                  width={50}
                                                  priority={true}
                                                  height={50}
                                                />
                                              </div>{" "}
                                            </td>
                                            <td
                                              style={{
                                                display: "flex",
                                                gap: "10px",
                                              }}
                                            >
                                              <div>
                                                <Image
                                                  data-lazyloaded="1"
                                                  src="/svg/edit.svg"
                                                  height={24}
                                                  priority={true}
                                                  width={24}
                                                  alt="Logo Image"
                                                  className={styles.imageLogo}
                                                  // onClick ={()=>handleUpdate(item2)}
                                                  onClick={() =>
                                                    router.push(
                                                      `/super-admin/SubCategory/edit?_Id=${item2._id}&subcat=${item2?.sub_category_name}`
                                                    )
                                                  }
                                                />
                                              </div>
                                              <div
                                                style={{
                                                  display: "flex",
                                                  gap: "10px",
                                                }}
                                              >
                                                {item2?.isHide == true ? (
                                                  <Image
                                                    src="/svg/eye-solid.svg"
                                                    width={20}
                                                    height={20}
                                                    priority={true}
                                                    alt=""
                                                    className={
                                                      styles.passwordshowiconn
                                                    }
                                                    onClick={(e) =>
                                                      Show(e, item2)
                                                    }
                                                  />
                                                ) : (
                                                  <Image
                                                    src="/svg/eye-slash-solid.svg"
                                                    width={20}
                                                    height={20}
                                                    priority={true}
                                                    className={
                                                      styles.passwordhideiconn
                                                    }
                                                    onClick={(e) =>
                                                      Hide(e, item2)
                                                    }
                                                    alt=""
                                                  />
                                                )}
                                                {/* <span>
                                          <Image
                                            src="/svg/delete-bin.svg"
                                            height={20}
                                            width={20}
                                            priority={true}
                                            alt="Logo Image"
                                            className={styles.imageLogo}
                                            onClick={(e) =>
                                              DeleteSubCategory(e, item2)
                                            }
                                          />
                                        </span> */}
                                              </div>
                                            </td>
                                          </tr>
                                        );
                                      })
                                  }
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </SuperAdminLayout>
    </>
  );
};

export default SubCategory;

// };
