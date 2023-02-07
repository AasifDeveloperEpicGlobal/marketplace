import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useEffect, useState } from "react";

import { useGetCategory, useGetMerchantDetails } from "networkAPI/queries";
import Image from "next/image";
import { useRouter } from "next/router";
import Slider from "react-slick";
import styles from "styles/Merchant/productbysubcategory.module.scss";
import { string } from "yup";
import { decode as base64_decode, encode as base64_encode } from "base-64";
// let encoded = base64_encode("YOUR_DECODED_STRING");
// let decoded = base64_decode("YOUR_ENCODED_STRING");

// function ProductCard({title,data}) {
interface Props {
  title: string;
  data: any;
  subCat: string;
  merchant_id: string;
  count: number;
}
function SubProductCard({ title, merchant_id, data, subCat, count }: Props) {
  const router = useRouter();
  const data2 = useGetCategory();
  const [categoryName, setCategoryName] = useState<string>("");
  const category_data = data2.data;
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

  let encoded = base64_encode("YOUR_DECODED_STRING");
 

  return (
    <React.Fragment>
      {data ? (
        <div key={""} className={styles.box_height}>
          {/* <h1 className={styles.heading_section3}>{title}</h1>
          <h2 className={styles.heading_section3}>
            {
              subCat
              // + " " + "(" + count + "products available" +")"
            }
          </h2> */}
          <div className={styles.merchantBox}>
            {data?.map((item: any, index: any) => {
              let category = base64_encode(item.category);
        
              return (
                <div
                  className={styles.cardproduct33}
                  key={index}
                  onClick={() =>
                    router.push(
                      `/product?id=${item._id}&category=${encodeURI(
                        item.category
                      )}&merchant=${item.auther_Id}`
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
                      priority={true}
                      alt="productr image"
                      className={styles.productimagesrc}
                    />
                  </div>
                  <div className={styles.productcontent}>
                    <h4>{item.product_name}</h4>
                    {/* <p>{item.brand}</p> */}
                  </div>
                  <div className={styles.productcartbtn}>
                    <button
                      type="submit"
                      onClick={() =>
                        router.push(
                          `/product?id=${item._id}&category=${encodeURI(
                            item.category
                          )}&merchant=${item.auther_Id}`
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
      ) : (
        "Item Not Found"
      )}
    </React.Fragment>
  );
}

export default SubProductCard;
