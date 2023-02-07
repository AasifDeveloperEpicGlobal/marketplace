import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAppSelector } from "redux/hooks";
import {
  useGetCategory,
  useGetSubCategory,
  useSubCategory,
} from "networkAPI/queries";
import styles from "styles/Merchant/addcategory.module.scss";
import SuperAdminLayout from "components/SuperAdmin/Layout";

const Upload_SubCategory: NextPage = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const [category_Id, setCategory_Id] = useState<string>("");
  const [category_name, setCategory_name] = useState<string>("");
  const [sub_category_name, setSub_category_name] = useState<string>("");
  const [sub_category_image, setSub_category_image] = useState<any>();
  const { error, data, mutate } = useSubCategory();
  const { data: getData, status, refetch } = useGetSubCategory();
  const { data: category_data } = useGetCategory();
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      category_Id,
      category_name,
      sub_category_name,
      sub_category_image,
    });
  };
  useEffect(() => {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || error.message);
    }
    if (data) {
      // @ts-ignore
      toast.success(data?.message);
      refetch();
      // @ts-ignore

      if (data?.success) {
        router.push("/super-admin/SubCategory");
      }
      // router.reload();
    }
  }, [error, data, router, refetch]);

  useEffect(() => {
    category_data?.data.filter((item: any) => {
      item.category_name == category_name ? setCategory_Id(item._id) : "";
    });
  }, [category_name, category_data]);
  return (
    <SuperAdminLayout>
      <div className={styles.mov}>
        <h1 className={styles.subcatHeading}>Add Product Subcategory </h1>
        <div className="box3">
          <form action="" onSubmit={handleLogin}>
            <ul className="box345">
              <li>
                <label htmlFor="category" className={styles.productLabel}>
                  Product Category
                </label>
                <select
                  name="category"
                  className={styles.inputBox}
                  value={category_name}
                  onChange={(e) => setCategory_name(e.target.value)}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {category_data?.data.map((item: any, index: any) => {
                return (
                      <option key={index} value={item.category_name}>
                        {item.category_name}
                      </option>
                    );
                  })}
                </select>
              </li>
              <li>
                <label htmlFor="category_name" className="omra-lael">
                  Sub Category Name
                </label>
                <input
                  type="text"
                  name="category_name"
                  id="category_name"
                  onChange={(e) => setSub_category_name(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="category_image1" className="omra-lael">
                  Sub Category image
                </label>
                <input
                  type="file"
                  name="category_image1"
                  id="category_image1"
                  onChange={(e: any) =>
                    setSub_category_image(e.target.files[0])
                  }
                />
              </li>
              <li style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                <button className={styles.Add_Button}>Add SubCategory</button>
              </li>
            </ul>
          </form>
          <ul className="formstyle"></ul>
        </div>
      </div>
    </SuperAdminLayout>
  );
};
export default Upload_SubCategory;
