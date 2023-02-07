import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useEffect, useState } from "react";

import { useGetCategory, useGetMerchantDetails } from "networkAPI/queries";
import Image from "next/image";
import { useRouter } from "next/router";
import Slider from "react-slick";
import styles from "styles/Merchant/updatedproductcard.module.scss";
import { string } from "yup";

// function ProductCard({title,data}) {
interface Props {
  title: string;
  data: any;
  merchant_id: string;
}
function MerchantProduct({ title, merchant_id, data }: Props) {
  const router = useRouter();
  const data2 = useGetCategory();

  const [categoryName, setCategoryName] = useState<string>("");
  // const { data: userData } = useGetMerchantDetails();
  const category_data = data2.data;
  // const userCheck = userData?.data?.user.map(
  //   (item: any) => item.isActive == true
  // );
  

 

  const slideToShow = () => {
    if (data?.data?.length < 5) {
      return 3;
    } else {
      return 5;
    }
  };

  const settings = {
    autoplay: true,
    dots: true,
    infinite: true,
    slidesToShow: slideToShow(),
    slidesToScroll: 1,
    speed: 500,
    autoplaySpeed: 2000,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 475,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <React.Fragment>
      {data ? (
        <div key={""} className={styles.box_height}>
          <h1 className={styles.heading_section3}>{title}</h1>
          <div className={styles.merchantBox}>
            {data?.map((item: any, index: any) => {
             
              return (
                <div
                  className={styles.cardproduct33}
                  key={index}
                  onClick={() =>
                    router.push(
                      `/product?id=${item._id}&category=${item.category}&merchant=${item.auther_Id}`
                    )
                  }
                >
                  <div className={styles.productimg}>
                    <Image
                      src={
                        item?.product_image1[0]
                          ? item?.product_image1[0]
                          : "/omratrade/homebanner.png"
                      }
                      height={200}
                      width={300}
                      alt="productr image"
                      className={styles.productimagesrc}
                    />
                  </div>
                  <div className={styles.productcontent}>
                    <h4>{item.product_name}</h4>
                    {/* <p>{item.SubTypeOf_Bussiness}</p> */}
                    <p>{item?.SubTypeOf_bussiness}</p>
                  </div>
                  <div className={styles.productcartbtn}>
                    <button
                      type="submit"
                      onClick={() =>
                        router.push(
                          `/product?id=${item._id}&category=${item.category}&merchant=${item.auther_Id}`
                        )
                      }
                    >
                      View More
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}

export default MerchantProduct;
