import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAppSelector } from "redux/hooks";
import { useBanner, usePublicProduct } from "../../../networkAPI/queries";
import styles from "../../../styles/Merchant/addcategory.module.scss";
import SuperAdminLayout from "components/SuperAdmin/Layout";

const Upload_Banner: NextPage = () => {
  const router = useRouter();
 

  const [banner_name, setBanner_name] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [banner_image1, setBanner_image1] = useState<any>("");
  const [banner_image2, setBanner_image2] = useState<any>("");
  const [banner_image3, setBanner_image3] = useState<any>("");
  const [banner_image4, setBanner_image4] = useState<any>("");
  const [banner_image5, setBanner_image5] = useState<any>("");
  const [product, setProduct] = useState<any>("");

  // const [product_name,setProduct_name] =useState<string>("")

  const { error, isLoading, data, mutate } = useBanner();

  const { data: productData } = usePublicProduct();
  const filterdata = productData?.data;

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({
      banner_name,
      product,
      type,
      banner_image1,
      banner_image2,
      banner_image3,
      banner_image4,
      banner_image5,
    });
  };

  useEffect(() => {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || error.message);
    }

    if (data) {
      toast.success("upload Successfull");
      router.replace("/super-admin/banner");
    }
  }, [error, data, router]);

  const options = [
    { value: "teaser", label: "teaser" },
    { value: "showcase1", label: "showcase1" },
    { value: "showcase2", label: "showcase2" },
    { value: "showcase3", label: "showcase3" },
    { value: "showcase4", label: "showcase4" },
    { value: "showcase5", label: "showcase5" },
    { value: "advertize7", label: "advertize7" },
  ];

  function handleSubmit() {
    return "hello";
  }

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     if (user.role === "SuperAdmin") {
  //       return;
  //     } else {
  //       Router.push(`/`);
  //     }
  //   } else {
  //     Router.push(`/`);
  //   }
  // }, [user, isAuthenticated]);
  return (
    <SuperAdminLayout>
      <div className={styles.mov}>
        <h1 className={styles.subcatHeading}>Add Product Banners </h1>

        <div className="box3">
          <form action="" onSubmit={handleLogin}>
            <ul className="box345">
              <li>
                <label htmlFor="banner_type" className="omra-lael">
                  Banner Type
                </label>

                <select
                  name="type"
                  className={styles.inputBox}
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {options.map((item: any, index: any) => {
                    return (
                      <>
                        <option key={index} value={item.value}>
                          {item.label}
                        </option>
                      </>
                    );
                  })}
                </select>
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
                  Banner image1
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
                  Banner image2
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
                  Banner image3
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
                  Banner image4
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
                  Banner image5
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

                <button className={styles.Add_Button}>Add Banners</button>
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
