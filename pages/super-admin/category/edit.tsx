/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

import { AxiosError } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import { useGetCategory, useUpdateCategory } from "../../../networkAPI/queries";
import styles from "../../../styles/Merchant/addcategory.module.scss";
import SuperAdminLayout from "components/SuperAdmin/Layout";

const Update_Category: NextPage = () => {
  const router = useRouter();
  const _Id = router.query._Id;
  const previewCategory = router?.query.name as string;

  const { data: GetCategory, refetch } = useGetCategory();
  const category = GetCategory?.data?.find((item: any) => item._id == _Id);
  const categorypre = category?.category_name;
  const [category_name, setCategory_name] = useState<string>(categorypre);
  const [category_image, setCategory_image] = useState<any>({
    preview: "",
    image: "",
  });
  const { error, isLoading, data, mutate } = useUpdateCategory();
  const handleLogin = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  

      mutate(
        {
          category_name,

          category_image: category_image?.image,
          id: _Id as string,
        },
        {
          onSuccess: () => {
            if (data) {
              // @ts-ignore

              toast.success(data?.message);
              refetch();
              //@ts-ignore
              if (data?.success) {
                router.push("/super-admin/category");
              }
            }
          },
        }
      );
    },
    [category_name, mutate, category_image, _Id, data, refetch, router]
  );
  useEffect(() => {
    refetch();
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || error.message);
    }
  }, [error, data, router, refetch]);

  const handleChange = (e: any) => {
    if (e.target.files.length) {
      setCategory_image({
        preview: URL.createObjectURL(e.target.files[0]),
        image: e.target.files[0],
      });
    }
  };
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
          Add Product Category{" "}
        </h1>
        <div className="box3">
          <form action="" onSubmit={handleLogin}>
            {/* <h1>{_Id}</h1> */}
            <ul className="box345">
              <li>
                <img
                  src={
                    category_image?.image
                      ? category_image.preview
                      : category?.category_image
                  }
                  alt=""
                  height={200}
                  width={200}
                />
              </li>
              <li>
                <label htmlFor="category_image" className="omra-lael">
                  Category image
                </label>
                <input
                  type="file"
                  name="category_image"
                  id="category_image"
                  onChange={handleChange}
                />
              </li>
              <li>
                <label htmlFor="category_name" className="omra-lael">
                  Category Name
                </label>
                <input
                  type="text"
                  name="category_name"
                  id="category_name"
                  defaultValue={categorypre}
                  onChange={(e) => setCategory_name(e.target.value)}
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
export default Update_Category;
