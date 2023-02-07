import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick-theme.css";
import type { NextPage } from "next";
import React, { useEffect } from "react";
import { useGetCategory, useGetMerchantDetails } from "networkAPI/queries";
import Image from "next/image";
import { useRouter } from "next/router";
import Slider from "react-slick";
import styles from "../../styles/Merchant/merchant_homepage.module.scss";

const MerchantTopIcon: NextPage = () => {
  const router = useRouter();
  return (
    <div className={styles.container_width}>
      <div className={styles.bgImage}>
        <div className={styles.flexSection}>
          <div className={styles.flexSection1}>
            <div className={styles.smallImage}>
              <Image
                src={"/omratrade/quality.png"}
                height={100}
                width={100}
                alt="india"
              />{" "}
            </div>
            <div>
              <h2> Genuine Products</h2>
            </div>
          </div>

          <div className={styles.flexSection1}>
            <div className={styles.smallImage}>
              <Image
                src={"/omratrade/trust.png"}
                height={100}
                width={100}
                alt="india"
              />{" "}
            </div>
            <div>
              <h2> Trusted Verification</h2>
            </div>
          </div>

          <div className={styles.flexSection1}>
            <div className={styles.smallImage}>
              <Image
                src={"/omratrade/discount.png"}
                height={100}
                width={100}
                alt="india"
              />{" "}
            </div>
            <div>
              <h2>Great Price</h2>
            </div>
          </div>

          <div className={styles.flexSection1}>
            <div className={styles.smallImage}>
              <Image
                src={"/omratrade/help.png"}
                height={100}
                width={100}
                alt="india"
              />{" "}
            </div>
            <div>
              <h2>Need Help</h2>
            </div>
          </div>
        </div>
      </div>
      {/* <h1 className={styles.topHeading}>Handpicked products to suit your budget</h1> */}
    </div>
  );
};

export default MerchantTopIcon;
