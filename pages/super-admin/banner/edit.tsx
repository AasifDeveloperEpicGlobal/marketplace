import React, { useEffect, useState } from "react";

import { AxiosError } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAppSelector } from "redux/hooks";

import { usePublicProduct, useUpdateBanner } from "../../../networkAPI/queries";
import styles from "../../../styles/Merchant/addcategory.module.scss";
import SuperAdminLayout from "components/SuperAdmin/Layout";

const Upload_Banner: NextPage = () => {
 
  const { data: productData } = usePublicProduct();
const router = useRouter();
  const _Id = router.query._Id;
  const type = router.query.type;
  const [banner_image1, setBanner_image1] = useState<any>("");
  const [banner_image2, setBanner_image2] = useState<any>("");
  const [banner_image3, setBanner_image3] = useState<any>("");
  const [banner_image4, setBanner_image4] = useState<any>("");
  const [banner_image5, setBanner_image5] = useState<any>("");
  const [product, setProduct] = useState<any>("");
const { error, isLoading, data, mutate } = useUpdateBanner();
  const field_color = {
    color: "red",
  };

  const handleLogin = (e: any) => {
    e.preventDefault();

    mutate({
      product,
      banner_image1,
      banner_image2,
      banner_image3,
      banner_image4,
      banner_image5,
      id: _Id as string,
    });
  };

  useEffect(() => {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || error.message);
    }

    if (data) {
      toast.success("update Successfull");
      router.replace("/super-admin/banner");
    }
  }, [error, data, router]);

  return (
    <SuperAdminLayout>
      <div className={styles.mov}>
        <h1>Add Product Banners</h1>

        <div className="box3">
          <form action="" onSubmit={handleLogin}>
            <ul className="box345">
              <li>
                <label htmlFor="banner_name" className="omra-lael">
                  Banner Type
                </label>
                {type}
              </li>

              <li>
                <label htmlFor="banner_type" className="omra-lael">
                  Select Product
                </label>

                <select
                  name="type"
                  className={styles.dropdownBox}
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  required
                >
                  <option value="">Select Product</option>
                  {productData?.data.map((item: any, index: any) => {
                  
                    return (
                      <>
                        <option key={index} value={item.auther_Id}>
                          {item.product_name}
                        </option>
                      </>
                    );
                  })}
                </select>
              </li>

              <li>
                <label htmlFor="banner_image" className="omra-lael">
                  Banner1
                </label>
                <input
                  type="file"
                  name="banner_image"
                  id="banner_image"
                  onChange={(e: any) => setBanner_image1(e.target.files[0])}
                />
              </li>
              <li>
                <label htmlFor="banner_image2" className="omra-lael">
                  Banner2
                </label>
                <input
                  type="file"
                  name="banner_image2"
                  id="banner_image2"
                  onChange={(e: any) => setBanner_image2(e.target.files[0])}
                />
              </li>
              <li>
                <label htmlFor="banner_image3" className="omra-lael">
                  Banner3
                </label>
                <input
                  type="file"
                  name="banner_image3"
                  id="banner_image3"
                  onChange={(e: any) => setBanner_image3(e.target.files[0])}
                />
              </li>
              <li>
                <label htmlFor="banner_image4" className="omra-lael">
                  Banner4
                </label>
                <input
                  type="file"
                  name="banner_image4"
                  id="banner_image4"
                  onChange={(e: any) => setBanner_image4(e.target.files[0])}
                />
              </li>
              <li>
                <label htmlFor="banner_image5" className="omra-lael">
                  Banner5
                </label>
                <input
                  type="file"
                  name="banner_image5"
                  id="banner_image5"
                  onChange={(e: any) => setBanner_image5(e.target.files[0])}
                />
              </li>

              <li style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                {/* <input type="submit" className='Upload-Button' /> */}

                <button className={styles.Add_Button}>Update Banner</button>
                {/* <button className="Upload-Button">Submit</button> */}
              </li>
            </ul>
          </form>
          <ul className="formstyle"></ul>
        </div>
      </div>
    </SuperAdminLayout>
  );
};
export default Upload_Banner;
