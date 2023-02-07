import React, { useEffect, useState } from "react";

import { AxiosError } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAppSelector } from "redux/hooks";

import { useCategory, useGetCategory } from "../../../networkAPI/queries";
import styles from "../../../styles/Merchant/addcategory.module.scss";
import SuperAdminLayout from "components/SuperAdmin/Layout";

const Upload_Category: NextPage = () => {
  const router = useRouter();
  const [category_name, setCategory_name] = useState<string>("");
  const [category_image, setCategory_image] = useState<any>();
  const { error, isLoading, data, mutate } = useCategory();
  const { data: getData, refetch } = useGetCategory();
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      category_name,
      category_image,
    });
  };
  useEffect(() => {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || error.message);
    }
    if (data) {
      // @ts-ignore
      toast.success(data?.message);
      // refetch();
      //@ts-ignore
      if (data?.success) {
        refetch();
        router.push("/super-admin/category");
      }
    }
  }, [error, data, router, refetch]);

  return (
    <SuperAdminLayout>
      <div className={styles.mov}>
        <h1 className={styles.subcatHeading}>Add Product Category </h1>
        <div className="box3">
          <form action="" onSubmit={handleLogin}>
            <ul className="box345">
              <li>
                <label htmlFor="category_name" className="omra-lael">
                  Category Name
                </label>
                <input
                  type="text"
                  name="category_name"
                  id="category_name"
                  onChange={(e) => setCategory_name(e.target.value)}
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
                  onChange={(e: any) => setCategory_image(e.target.files[0])}
                />
              </li>
              <li style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                <button className={styles.Add_Button}>Add Category</button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </SuperAdminLayout>
  );
};
export default Upload_Category;
