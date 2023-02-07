import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useEffect } from "react";

import { useGetCategory, useGetMerchantDetails } from "networkAPI/queries";
import Image from "next/image";
import { useRouter } from "next/router";
import Slider from "react-slick";
import styles from "styles/Merchant/updatedproductcard.module.scss";
import { decode , encode  } from "base-64";
// import { encode , decode } from 'js-base64';
import Subcategory from "components/svg-icons/subcategory";
import { escape } from "querystring";
// import { encode } from "punycode";

// function ProductCard({title,data}) {
interface Props {
  title: string;
  data: any;
  count: number;
}
function SubCategoryCard({ title, data, count }: Props) {
  const router = useRouter();
  const data2 = useGetCategory();

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

  return (
    <React.Fragment>
      {data?.data ? (
        <div key={""} className={styles.box_height}>
          <h1 className={styles.heading_section3}>
            {
              title
              // +
              // " -" + [count]
            }
          </h1>

          {
            <Slider {...settings}>
              {data?.data.map((item: any, index: any) => {
                // const category = base64_encode(item?.category_name as string);
                // const subcategory = base64_encode(item?.sub_category_name as string);
                return (
                  <div
                    className={styles.cardproduct}
                    key={index}
                    onClick={() =>
                      router.push(
                        `/productBySubCategory?id=${item._id}&category=${encodeURIComponent(
                          item.category
                        )}&subcategory=${encodeURIComponent(item.sub_category_name)}`
                      )
                    }
                  >
                    <div className={styles.productimg}>
                      <Image
                        src={
                          item?.sub_category_image[0]
                            ? item?.sub_category_image[0]
                            : "/omratrade/homebanner.png"
                          // ||
                          //   item?.product_image2[0]
                          // ? item?.product_image2[0]
                          // : "/omratrade/homebanner.png" ||
                          //   item?.product_image3[0]
                          // ? item?.product_image3[0]
                          // : "/omratrade/homebanner.png"
                        }
                        height={200}
                        width={300}
                        priority={true}
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
                            `/productBySubCategory?id=${item._id}&category=${encodeURIComponent(
                              item.category
                            )}&subcategory=${encodeURIComponent(item.sub_category_name)}`
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
      ) : null}
    </React.Fragment>
  );
}

export default SubCategoryCard;
