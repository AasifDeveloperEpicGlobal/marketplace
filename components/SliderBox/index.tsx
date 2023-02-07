/* eslint-disable @next/next/no-img-element */
import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styles from "../../styles/Merchant/sliderbox.module.scss";

import type { NextPage } from "next";

import { useRouter } from "next/router";

import React from "react";
import { useGetBanner } from "networkAPI/queries";

const SliderBox: NextPage = () => {
  const bannerData = useGetBanner().data?.data;
  const router = useRouter();

  // const slideToShow = () => {
  //   if (length < 5) {
  //     return 4;
  //   } else {
  //     return 4;
  //   }
  // };
  const slideToShow = () => {
    if (bannerData?.length < 2) {
      return 2;
    } else {
      return 4;
    }
  };

  const settings = {
    autoplay: true,
    dots: false,
    infinite: true,
    slidesToShow: slideToShow(),
    slidesToScroll: 1,
    speed: 500,
    autoplaySpeed: 2000,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
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
    <div className={`${styles.Flex_Sectionzzz} bannerslider `}>
      {bannerData
        ?.filter((item: any) => item.type == "showcase3")
        .map((item: any, index: any) => {
        
          return (
            <div key={index}>
              <Slider {...settings} arrows={false}>
                <div
                  style={{
                    background: "red",
                  }}
                >
                  <img
                    // src="/omratrade/sliderbanner.png"
                    src={
                      item.banner_image1[0]
                        ? item.banner_image1[0]
                        : "/omratrade/homebanner.png"
                    }
                    alt="facemask"
                    className={styles.sliderBox32}
                  />
                </div>
                <div>
                  <img
                    src={
                      item.banner_image2[0]
                        ? item.banner_image2[0]
                        : "/omratrade/homebanner.png"
                    }
                    alt="facemask"
                    className={styles.sliderBox32}
                  />
                </div>
                <div>
                  <img
                    src={
                      item.banner_image3[0]
                        ? item.banner_image3[0]
                        : "/omratrade/homebanner.png"
                    }
                    alt="facemask"
                    className={styles.sliderBox32}
                  />
                </div>
                <div>
                  <img
                    src={
                      item.banner_image4[0]
                        ? item.banner_image4[0]
                        : "/omratrade/homebanner.png"
                    }
                    alt="facemask"
                    className={styles.sliderBox32}
                  />
                </div>
                <div>
                  <img
                    src={
                      item.banner_image5[0]
                        ? item.banner_image5[0]
                        : "/omratrade/homebanner.png"
                    }
                    alt="facemask"
                    className={styles.sliderBox32}
                  />
                </div>
              </Slider>
            </div>
          );
        })}
    </div>
  );
};

export default SliderBox;
