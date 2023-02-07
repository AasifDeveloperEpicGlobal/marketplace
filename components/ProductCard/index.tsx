import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useEffect } from "react";

import { useGetCategory, useGetMerchantDetails } from "networkAPI/queries";
import Image from "next/image";
import { useRouter } from "next/router";
import Slider from "react-slick";
import styles from "styles/Merchant/updatedproductcard.module.scss";
import {encode} from "base-64"

// function ProductCard({title,data}) {
interface Props {
  title: string;
  data: any;
  count: number;
}
function ProductCard({ title, data, count }: Props) {
  const router = useRouter();
  const data2 = useGetCategory();

  const category_data = data2.data;
  // console.log("hello bsggs", data);

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
    speed: 5000,
    autoplaySpeed: 5000,

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
      {data?.data ? (
        <div key={""} className={styles.box_height}>
          <h1 className={styles.heading_section3}>{title + " -" + [count]}</h1>
          <div className="df">
            {
              <Slider {...settings}>
                {data?.data.map((item: any, index: any) => {
                  return (
                    <div
                      className={styles.cardproduct}
                      key={index}
                      onClick={() =>
                        router.push(
                          `/product?id=${item._id}&category=${encodeURI(item.category)}&merchant=${item.auther_Id}`
                        )
                      }
                    >
                      <div className={styles.productimg}>
                        <Image
                          src={
                            item?.sub_category_image[0]
                              ? item?.sub_category_image[0]
                              : "/omratrade/homebanner.png" ||
                                item?.product_image2[0]
                              ? item?.product_image2[0]
                              : "/omratrade/homebanner.png" ||
                                item?.product_image3[0]
                              ? item?.product_image3[0]
                              : "/omratrade/homebanner.png"
                          }
                          height={200}
                          width={300}
                          alt="productr image"
                          className={styles.productimagesrc}
                        />
                      </div>
                      <div className={styles.productcontent}>
                        <h4>{item.sub_category_name}</h4>
                        <p>{item.sub_category_name}</p>
                      </div>
                      <div className={styles.productcartbtn}>
                        <button
                          type="submit"
                          onClick={() =>
                            router.push(
                              `/product?id=${item._id}&category=${encodeURI(item.category)}&merchant=${item.auther_Id}`
                            )
                          }
                        >
                          View More
                        </button>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            }
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}

export default ProductCard;
