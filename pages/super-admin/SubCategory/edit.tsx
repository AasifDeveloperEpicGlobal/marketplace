/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

import { AxiosError } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import {
  useGetSubCategory,
  useUpdateSubCategory,
} from "../../../networkAPI/queries";
import styles from "../../../styles/Merchant/addcategory.module.scss";
import SuperAdminLayout from "components/SuperAdmin/Layout";
import Image from "next/image";

const Update_Subcategory: NextPage = () => {
  const router = useRouter();
  const _Id = router.query._Id;
  const { data: subacategoryData, status, refetch } = useGetSubCategory();
  const subcategory_preview = subacategoryData?.data?.find(
    (item: any) => item._id == _Id
  );
  const [sub_category_name, setSub_Categoery_name] = useState<string>(
    subcategory_preview?.sub_category_name as string
  );
  const [sub_category_image, setSub_Category_image] = useState<any>({
    preview: "",
    image: "",
  });
  const { error, isLoading, data, mutate } = useUpdateSubCategory();
  const handleChange = (e: any) => {
    if (e.target.files.length) {
      setSub_Category_image({
        preview: URL.createObjectURL(e.target.files[0]),
        image: e.target.files[0],
      });
    }
  };

  const handleLogin = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate(
        {
          sub_category_name,
          sub_category_image: sub_category_image?.image,
          id: _Id as string,
        },
        {
          onSuccess: () => {
            // @ts-ignore
            // toast.success(data?.message);
            // refetch();
            // router.push("/super-admin/SubCategory");
          },
        }
      );
    },
    [sub_category_name, sub_category_image, _Id, mutate]
  );

  useEffect(() => {
    refetch();
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || error.message);
    }

    if (data) {
      // @ts-ignore

      toast.success(data?.message);
      refetch();
      //@ts-ignore
      if (data?.success) {
        router.push("/super-admin/SubCategory");
      }
    }
    // router.reload()
  }, [error, data, router, refetch]);

  return (
    <SuperAdminLayout>
      <div className={styles.mov}>
        <h1
          style={{
            justifyContent: "center",
            alignContent: "center",
            textAlign: "center",
          }}
        >
          Update SubCategory{" "}
        </h1>
        <div className="box3">
          <form action="" onSubmit={handleLogin}>
            <ul className="box345">
              <li>
                <Image
                  src={
                    sub_category_image?.image
                      ? sub_category_image.preview
                      : subcategory_preview?.sub_category_image[0]
                  }
                  alt="f"
                  priority={true}
                  width={200}
                  height={200}
                />
              </li>
              <li>
                <label htmlFor="subcategory_image" className="omra-lael">
                  SubCategory image
                </label>
                <input
                  type="file"
                  name="subcategory_image"
                  id="subcategory_image"
                  // defaultValue={sub_category_image}
                  onChange={handleChange}
                />
              </li>
              <li>
                <label htmlFor="subategory_name" className="omra-lael">
                  SubCategory Name
                </label>
                <input
                  type="text"
                  name="subategory_name"
                  // value={subcategory_preview.sub_category_name}
                  defaultValue={sub_category_name}
                  id="subategory_name"
                  onChange={(e) => setSub_Categoery_name(e.target.value)}
                />
              </li>
              <li style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                <button className={styles.Add_Button}>Update Category</button>
              </li>
            </ul>
          </form>
          <ul className="formstyle"></ul>
        </div>
      </div>
    </SuperAdminLayout>
  );
};
export default Update_Subcategory;
