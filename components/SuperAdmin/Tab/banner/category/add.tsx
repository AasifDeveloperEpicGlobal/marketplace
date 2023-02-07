import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAppSelector } from "redux/hooks";
import {
  useAddCategoryBanner,
  useGetCategory,
  useGetMerchantDetails,
} from "../../../../../networkAPI/queries";
import styles from "../../../../../styles/banners/addbanner.module.scss";

interface activeProps {
  setSubTab: any;
}

const AddCategoryBannerComponent = ({ setSubTab }: activeProps) => {
  const router = useRouter();


  const [type, setType] = useState<string>("showcase1");
  const [banner_image, setBanner_image] = useState<any>([]);
  const [category_id, setCategory_id] = useState<string>("");
  const [category_name, setCategoryName] = useState<string>("");

  const { error, isLoading, data, mutate } = useAddCategoryBanner();

  const { data: productData } = useGetMerchantDetails();
  const filterdata = productData?.data;

  const { data: category } = useGetCategory();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({
      category_id,
      category_name,

      banner_image,
      type: type,
    });
  };
  useEffect(() => {
    const filterData = category?.data?.find(
      (item: any) => item._id == category_id
    );
    setCategoryName(filterData?.category_name);
  }, [category?.data, category_id]);

  useEffect(() => {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || error.message);
    }

 //@ts-ignore
 if (data?.success) {
   //@ts-ignore
  toast.success(data?.message);
  setSubTab("list");
 
 
}
  }, [error, data, router, setSubTab]);

  const options = [{ value: "teaser", label: "teaser" }];



  return (
    <div className={styles.mov}>
      <h1 className={styles.subcatHeading}>Add Category Banner </h1>

      <div className="box3">
        <form action="" onSubmit={handleLogin}>
          <ul className="box345">
            <li>
              <label htmlFor="banner_type" className="omra-lael">
                Banner Type
              </label>

              <h2>{type}</h2>
            </li>

            <li>
              <label htmlFor="banner_type" className="omra-lael">
                Select Category
              </label>

              <select
                style={{
                  maxHeight: "100px",
                }}
                name="type"
                className={styles.inputBox}
                value={category_id}
                onChange={(e) => setCategory_id(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {category?.data?.map((item: any, index: any) => {
                  // (type);
                  return (
                    <>
                      <option key={index} value={item._id}>
                        {item.category_name}
                      </option>
                    </>
                  );
                })}
              </select>
            </li>

            <li>
              <label htmlFor="banner_image" className="omra-lael">
                Banner image
              </label>
              <input
                type="file"
                name="banner_image"
                id="banner_image"
                onChange={(e: any) => setBanner_image(e.target.files[0])}
              />
            </li>

            <li style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
              <button className={styles.Add_Button}>Add Banners</button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};
export default AddCategoryBannerComponent;
