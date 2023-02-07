import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAppSelector } from "redux/hooks";
import {
  useAddTeaserBanner,
  useGetMerchantDetails,
} from "../../../../../networkAPI/queries";
import styles from "../../../../../styles/banners/addbanner.module.scss";

interface activeProps {
  setSubTab: any;
}

const AddTeaserBannerComponent = ({ setSubTab }: activeProps) => {
  const router = useRouter();
  // const {
  //   error: err,
  //   user,
  //   isAuthenticated,
  // } = useAppSelector((state) => state.user);

  const [type, setType] = useState<string>("teaser");
  const [banner_image, setBanner_image] = useState<any>([]);
  const [merchant_id, setMerchant_id] = useState<string>("");
  const [merchant_name, setMerchant_Name] = useState<string>("");
  const [mmdata, setMdata] = useState<any>([]);
  const { error, isLoading, data, mutate } = useAddTeaserBanner();
  const { data: productData } = useGetMerchantDetails();
  const filterdata = productData?.data?.user;
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      merchant_id,
      merchant_name,

      banner_image,
      type: type,
    });
  };

  useEffect(() => {
    //@ts-ignore
    if (data?.success) {
      //@ts-ignore
      toast.success(data?.message);
      setSubTab("list");

      // router.replace("/super-admin/banners/teaser");
    } else {
      //@ts-ignore
      toast.error(data?.message);
    }
  }, [error, data, router, setSubTab]);

  useEffect(() => {
    const MerchantName = productData?.data?.user.find(
      (item: any) => item._id == merchant_id
    );
    setMerchant_Name(MerchantName?.Merchant_Name);
  }, [filterdata, merchant_id, productData]);

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

              <h2>{type}</h2>
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
                //   value={merchant_id}
                onChange={(e) => setMerchant_id(e.target.value)}
                required
              >
                <option value="">Select Merchant</option>
                {productData?.data?.user.map((item: any, index: any) => {
                  return (
                    <>
                      {/* @ts-ignore**/}
                      <option key={index} value={item._id}>
                        {item.Merchant_Name}
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
export default AddTeaserBannerComponent;
