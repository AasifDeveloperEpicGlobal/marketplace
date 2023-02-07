import React, { useEffect, useRef, useState } from "react";

import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import {
  useDeleteCategory,
  useGetCategory,
  useGetCategoryForUploadProduct,
  useHideShowCategory,
} from "../../../networkAPI/queries";
import styles from "../../../styles/Merchant/category.module.scss";
// @ts-ignore
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import SuperAdminLayout from "components/SuperAdmin/Layout";
import RightArrow from "components/svg-icons/rightarrow";
import LeftArrow from "components/svg-icons/leftarrow";
import toast from "react-hot-toast";
const AllCategory: NextPage = () => {
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();
  const [categoryData, setCategoryData] = useState<any>([]);
  const { data, status, refetch, isLoading } = useGetCategoryForUploadProduct();
  const { data: deletedData, mutate: deleteMutate } = useDeleteCategory();
  const { data: hideShowData, mutate } = useHideShowCategory();
  const Show = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    item: any
  ) => {
    mutate(
      {
        id: item._id,
        isHide: show,
      },

      {
        onSuccess: () => {
          if (hideShowData) {
            // @ts-ignore
            toast.success(hideShowData?.message);
            refetch();
            //@ts-ignore
            if (hideShowData?.success) {
              router.push("/super-admin/category");
            }
          }
        },
      }
    );
    // router.reload();
  };

  const Hide = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    item: any
  ) => {
    mutate(
      {
        id: item._id,
        isHide: !show,
      },
      {
        onSuccess: () => {
          if (hideShowData) {
            // @ts-ignore
            toast.success(hideShowData?.message);
            refetch();
            //@ts-ignore
            if (hideShowData?.success) {
              router.push("/super-admin/category");
            }
          }
        },
      }
    );
  };

  const DeleteCategory = React.useCallback(
    (e: React.MouseEvent<HTMLImageElement, MouseEvent>, item: any) => {
      // e.preventDefault();
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
              if (deletedData) {
                // @ts-ignore
                toast.success(deletedData?.message);

                //@ts-ignore
                if (deletedData?.success) {
                  router.push("/super-admin/category");
                  refetch();
                }
              }
            },
          }
        );
        // router.reload();
      }
    },
    [deleteMutate, deletedData, refetch, router]
  );
  React.useEffect(() => {
    setCategoryData(data?.data);
    //@ts-ignore
    if (deletedData?.success) {
      // router.push("/super-admin/category");
      refetch();
    }
  }, [data, deletedData, refetch, router]);

  return (
    <>
      <SuperAdminLayout>
        {isLoading ? (
          <div>Loading wait..........</div>
        ) : (
          <div className={styles.superadmintabledata}>
            <div className={styles.mov}>
              <div>
                <h1 className={styles.subcatHeading}>All Category List</h1>
                <p>
                  Here is the data
                  <span style={{ color: "red" }}>
                    (
                    {
                      //@ts-ignore
                      categoryData?.length
                    }
                    )
                  </span>
                  of Category List
                </p>
              </div>
              <div>
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className={styles.downloadButton}
                  table="table-to-xls"
                  filename="CategoryDetails"
                  sheet="tablexls"
                  buttonText="Download"
                />
              </div>
            </div>
            <div className={styles.maintableBoxx}>
              <div className={styles.tableBoxx}>
                <div>
                  <h3>All Category List</h3>
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
                <table id="table-to-xls" className={styles.tableBox}>
                  <thead className={styles.tableMain3}>
                    <tr>
                      <th>S No.</th>
                      <th>Category Image</th>
                      <th>Category Name</th>
                      <th>Count</th>
                      <th>Update</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      //@ts-ignore
                      categoryData?.map((item: any, index: any) => {
                        return (
                          <tr key={index} className={styles.tableMain}>
                            <td>{index + 1}</td>
                            <td className={styles.Image_Section}>
                              <Image
                                src={
                                  item.category_image[0]
                                    ? item.category_image[0]
                                    : ""
                                }
                                alt=""
                                width="60px"
                                priority={true}
                                height="60px"
                              />
                            </td>
                            <td>{item.category_name}</td>{" "}
                            <td>{item.category_name}</td>
                            <td>
                              <Image
                                data-lazyloaded="1"
                                src="/svg/edit.svg"
                                height={20}
                                width={20}
                                priority={true}
                                alt="Logo Image"
                                className={styles.imageLogo}
                                onClick={() =>
                                  router.push(
                                    `/super-admin/category/edit?_Id=${
                                      item._id
                                    }&name=${encodeURIComponent(
                                      item.category_name
                                    )}`
                                  )
                                }
                              />
                            </td>
                            <td>
                              <div className={styles.editdelete}>
                                {/* <div>
                                  <Image
                                    data-lazyloaded="1"
                                    src="/svg/delete-bin.svg"
                                    height={20}
                                    width={20}
                                    priority={true}
                                    alt="Logo Image"
                                    className={styles.imageLogo}
                                    onClick={(e) => DeleteCategory(e, item)}
                                  />
                                </div> */}
                                <div>
                                  {item.isHide == true ? (
                                    <Image
                                      src="/svg/eye-slash-solid.svg"
                                      width={20}
                                      height={20}
                                      priority={true}
                                      alt=""
                                      className={styles.passwordhideiconn}
                                      onClick={(e) => Show(e, item)}
                                    />
                                  ) : (
                                    <Image
                                      src="/svg/eye-solid.svg"
                                      width={20}
                                      height={20}
                                      priority={true}
                                      alt=""
                                      className={styles.passwordshowiconn}
                                      onClick={(e) => Hide(e, item)}
                                    />
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </SuperAdminLayout>
    </>
  );
};

export default AllCategory;

// export const getServerSideProps = async (context: any) => {
//   const access_token = parseCookies({ req: context.req });
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery(
//     "category",
//     async () =>
//       await fetch(
//         `${process.env.NEXT_PUBLIC_SERVER_URL}/api/category/get_category`
//       ).then((response) => response.json())
//   );
//   // Pass data to the page via props
//   return { props: { dehydratedState: dehydrate(queryClient) } };
// };
