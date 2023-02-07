/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import {
  useGetMerchantDetails,
  usePublishedProduct,
  useUpdateDiscountBanner,
} from "../../../../../networkAPI/queries";
// import styles from "../../../../styles/Merchant/addcategory.module.scss";
import styles from "../../../../../styles/Merchant/addcategory.module.scss";
import Image from "next/image";

interface serviceProps {
  currentId: any;
  setSubTab: any;
}

const UpdateDiscountBanner = ({ currentId, setSubTab }: serviceProps) => {
  const router = useRouter();

  const [type, setType] = useState<string>("teaser");
  const [preview, setPreview] = useState<any>({ name: "", image: "" });
  const [banner_image, setBanner_image] = useState<any>([]);
  const [product_id, setProduct_id] = useState<string>("");
  const [product_name, setProduct_Name] = useState<string>("");
  const [mmdata, setMdata] = useState<any>([]);
  const { error, isLoading, data, mutate } = useUpdateDiscountBanner();
  const { data: productData } = usePublishedProduct();
  const filterdata = productData?.data?.user;
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({
      product_id,
      product_name,

      banner_image,

      id: currentId?._id,
    });
  };

  useEffect(() => {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || error.message);
    }

    if (data) {
      toast.success("upload Successfull");
      // router.replace("/super-admin/banners/teaser");
    }
    //@ts-ignore
    if (data?.success == true) {
      // handleResetForm();
      setSubTab("list");

      // reset()
    }
  }, [error, data, router, setSubTab]);

  useEffect(() => {
    setProduct_id(currentId?.product_id);
    const MerchantName = productData?.data?.find(
      (item: any) => item._id == currentId?._id
    );
    setProduct_Name(currentId?.product_name);
    //    const preview =bannerPreviewData?.data?.find((item:any)=>item._id==currentId?._id)
    setPreview({
      name: currentId.product_name,
      image: currentId?.banner_image,
    });
  }, [currentId, filterdata, productData]);

  return (
    <div className={styles.mov}>
      <h1 className={styles.subcatHeading}>Add Merchant Banner </h1>

      <div className="box3">
        <form action="" onSubmit={handleLogin}>
          <ul className="box345">
            <li>
              <label htmlFor="banner_type" className="omra-lael">
                Banner Type
              </label>

              <h2>{currentId?._id}</h2>
            </li>

            <li>
              <label htmlFor="banner_type" className="omra-lael">
                Select Merchant
              </label>

              <select
                style={{
                  maxHeight: "100px",
                }}
                name="type"
                className={styles.inputBox}
                //   value={preview?.name}
                defaultValue={preview?.product_name}
                onChange={(e) => setProduct_id(e.target.value)}
                required
              >
                <option value="">Select Product</option>
                {productData?.data?.map((item: any, index: any) => {
                  return (
                    <>
                      {/* @ts-ignore**/}
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
            <li>
              <img
                src={
                  banner_image?.image ? banner_image.preview : preview?.image
                }
                alt=""
                width={100}
                height={100}
              />
            </li>

            <li style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
              <button className={styles.Add_Button}>Add Banners</button>
            </li>
          </ul>
        </form>
        <ul className="formstyle"></ul>
      </div>
    </div>
  );
};
export default UpdateDiscountBanner;
