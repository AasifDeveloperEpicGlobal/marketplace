import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAppSelector } from "redux/hooks";

import {
  useAddDiscountBanner,
  useGetMerchantDetails,
  usePublishedProduct,
} from "../../../../../networkAPI/queries";
import styles from "../../../../../styles/banners/addbanner.module.scss";

interface activeProps {
  setSubTab: any;
}

const AddDiscountBannerComponet = ({ setSubTab }: activeProps) => {
  const router = useRouter();
  // const {
  //   error: err,
  //   user,
  //   isAuthenticated,
  // } = useAppSelector((state) => state.user);

  const [type, setType] = useState<string>("showcase2");
  const [banner_image, setBanner_image] = useState<any>([]);
  const [product_id, setProduct_id] = useState<string>("");
  const [product_name, setProduct_name] = useState<string>("");

  const { error, isLoading, data, mutate } = useAddDiscountBanner();

  const { data: productData } = useGetMerchantDetails();
  const { data: productDataList } = usePublishedProduct();
  const filterdata = productData?.data;
 

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({
      product_id,
      product_name,

      banner_image,
      type: type,
    });
  };

  useEffect(() => {
    const name = productDataList?.data?.find(
      (item: any) => item._id == product_id
    );
    setProduct_name(name?.product_name);
  }, [productDataList, product_id]);

  useEffect(() => {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || error.message);
    }
//@ts-ignore
    if (data?.success) {
      toast.success("upload Successfull");
      setSubTab("list");
     
      // router.replace("/super-admin/banners/teaser");
    }
  }, [error, data, router, setSubTab]);

  const options = [{ value: "teaser", label: "teaser" }];

  function handleSubmit() {
    return "hello";
  }

 
  return (
    <div className={styles.mov}>
      <h1 className={styles.subcatHeading}>Add Discount Banner </h1>

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
                Select Product
              </label>

              <select
                style={{
                  maxHeight: "100px",
                }}
                name="type"
                className={styles.inputBox}
                value={product_id}
                onChange={(e) => setProduct_id(e.target.value)}
                required
              >
                <option value="">Select Product</option>
                {productDataList?.data?.map((item: any, index: any) => {
                 
                  return (
                    <>
                      <option key={index} value={item._id}>
                        {item.product_name}
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
              {/* <input type="submit" className='Upload-Button' /> */}

              <button className={styles.Add_Button}>Add Banners</button>
              {/* <button className="Upload-Button">Submit</button> */}
            </li>
          </ul>
        </form>
      </div>
    </div>
    // </SuperAdminLayout>
  );
};
export default AddDiscountBannerComponet;
