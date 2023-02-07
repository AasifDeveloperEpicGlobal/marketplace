import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAppSelector } from "redux/hooks";
import {
  useGetMerchantDetails,
  useGetTeaserBanner,
  useUpdateTeaserBanner,
} from "../../../../../networkAPI/queries";
// import styles from "../../../../styles/Merchant/addcategory.module.scss";
import styles from "../../../../../styles/Merchant/addcategory.module.scss";

interface serviceProps {
  currentId: any;
  setSubTab: any;
}

const UpdateTeaser = ({ currentId, setSubTab }: serviceProps) => {
  const router = useRouter();

  const [type, setType] = useState<string>("teaser");
  const [preview, setPreview] = useState<any>({ name: "", image: "" });
  const [previewImage, setPreviewImage] = useState("");
  const [banner_image, setBanner_image] = useState<any>([]);
  const [merchant_id, setMerchant_id] = useState<string>("");
  const [merchant_name, setMerchant_Name] = useState<string>("");
  const [mmdata, setMdata] = useState<any>([]);
  const { error, isLoading, data, mutate, isSuccess } = useUpdateTeaserBanner();
  const { data: bannerPreviewData, refetch } = useGetTeaserBanner();
  const { data: productData } = useGetMerchantDetails();
  const filterdata = productData?.data?.user;
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      merchant_id: merchant_id,
      merchant_name,

      banner_image,
      id: currentId?._id,
    });
  };


 

  useEffect(() => {
    //@ts-ignore
    if (isSuccess) {
      // handleResetForm();
      //@ts-ignore
      toast.success(data?.data?.message);
      setSubTab("list");
      refetch();
      // reset()
      //@ts-ignore
    }
    // else if(!data?.data?.success) {
    //  // @ts-ignore
    //   toast.error(data?.data?.message);
    // }
  }, [error, data, router, setSubTab, refetch, isSuccess]);


  useEffect(() => {
    const MerchantName = productData?.data?.user.find(
      (item: any) => item._id == merchant_id
    );
    setMerchant_Name(MerchantName?.Merchant_Name);
    const preview = bannerPreviewData?.data?.find(
      (item: any) => item._id == currentId?._id
    );
    setPreview({
      name: currentId.merchant_name,
      image: currentId?.banner_image,
    });
    setPreviewImage(currentId?.banner_image);
  }, [
    bannerPreviewData,
    currentId?.Merchant_Name,
    currentId?._id,
    currentId?.banner_image,
    currentId.merchant_name,
    filterdata,
    merchant_id,
    productData,
  ]);

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
              <img
                src={banner_image?.image ? banner_image.preview : previewImage}
                alt=""
                width={100}
                height={100}
              />
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
                defaultValue={preview?.name}
                onChange={(e) => setMerchant_id(e.target.value)}
                required
              >
                <option value="">Select Merchant</option>
                {productData?.data?.user.map((item: any, index: any) => {
                
                  return (
                    <>
                      {/* @ts-ignore**/}
                      <option key={index} value={item._id}>
                        {item.company_Name
}
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
        <ul className="formstyle"></ul>
      </div>
    </div>
  );
};
export default UpdateTeaser;
