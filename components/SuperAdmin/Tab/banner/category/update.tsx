/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAppSelector } from "redux/hooks";
import {
  useGetCategory,
  useGetCategoryBanner,
  useGetMerchantDetails,
  useUpdateCategoryBanner,
  useUpdateTeaserBanner,
} from "../../../../../networkAPI/queries";
// import styles from "../../../../styles/Merchant/addcategory.module.scss";
import styles from "../../../../../styles/Merchant/addcategory.module.scss";
import CategoryBannerHome from ".";
import Image from "next/image";
interface serviceProps {
  currentId: any;
  setSubTab: any;
}

const UpdateCategory = ({ currentId, setSubTab }: serviceProps) => {
  const router = useRouter();
  // const {
  //   error: err,
  //   user,
  //   isAuthenticated,
  // } = useAppSelector((state) => state.user);

  const [type, setType] = useState<string>("showcase1");

  const [category_id, setCategory_id] = useState<string>("");
  const [categoryPreview, setCategoryPreview] = useState<string>("")
  const [category_name, setCategoryName] = useState<string>("");
  const [mmdata, setMdata] = useState<any>([]);
  const [previewImage, setPreviewImage] = useState("");
  const [banner_image, setBanner_image] = useState<any>({preview:"",
    image:"",
          });

  const { error, isLoading, data, mutate } = useUpdateCategoryBanner();

  const { data: productData } = useGetCategory();
  const { data: categoryData, refetch } = useGetCategoryBanner();
  

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(categoryPreview,category_name)

    mutate({
      category_id,
      category_name:category_name?category_name: categoryPreview,

      banner_image: banner_image?.image,
      id: currentId?._id,
    });
  };
//@ts-ignore 
console.log(data?.data)
  useEffect(() => {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.message || error.message);
    }

    //@ts-ignore
    if (data?.data?.success == true) {
      // handleResetForm();
      //@ts-ignore
      toast.success(data?.data?.message)
      setSubTab("list");
      refetch();
      // reset()
    }
  }, [error, data, router, refetch, setSubTab]);
 
console.log(category_id)
  useEffect(() => {
    const CategoryName = productData?.data?.find(
      (item: any) => item._id == category_id
    );
    setCategoryName(CategoryName?.category_name)
   
    const cateData = categoryData?.data.find((item: any) => item._id == currentId?._id);
    setPreviewImage(currentId.banner_image);
    setCategoryPreview(currentId.category_name)
    
  }, [categoryData, category_id, currentId, productData]);
  

  const handleChange = (e:any) => {
    if (e.target.files.length) {
      setBanner_image({
        preview: URL.createObjectURL(e.target.files[0]),
        image: e.target.files[0]
      });
    }
  };


  return (
    <div className={styles.mov}>
      <h1 className={styles.subcatHeading}>Edit Category Banner </h1>

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
                Select Category
              </label>

              <select
                style={{
                  maxHeight: "100px",
                }}
                name="type"
                className={styles.inputBox}
                // value={category_name}
                defaultValue={category_name}
                onChange={(e) => setCategory_id(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {productData?.data?.map((item: any, index: any) => {
                  return (
                    <>
                      {/* @ts-ignore**/}
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
                onChange={handleChange}
              />
            </li>
            <li>
              <img src={banner_image?.image?banner_image.preview:previewImage} alt="" width={100} height={100}  />
            </li>

            <li style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
              <button className={styles.Add_Button}>Submit</button>
            </li>
          </ul>
        </form>
        <ul className="formstyle"></ul>
      </div>
    </div>
    // </SuperAdminLayout>
  );
};
export default UpdateCategory;
