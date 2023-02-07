/* eslint-disable jsx-a11y/alt-text */
import "react-multi-carousel/lib/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import TopHeader from "pages/topheader";
import React, { useEffect, useRef, useState } from "react";
import MerchantTopIcon from "components/MerchantTopIcon";

import Footer from "components/Footer/footer";

import {
  useGetBanner,
  useGetCategory,
  useGetProductByMerchant,
  usePublishedProduct,
} from "networkAPI/queries";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
// import styles from 'styles/Merchant/categoryproduct.module.scss';
import styles from "styles/Merchant/merchant_homepage.module.scss";
import MerchantProduct from "components/MerchantProduct.tsx";
import Pagination from "components/Pagination";
import NewFooter from "./newwfooter";

const MerchantProductList: NextPage = () => {
  const router = useRouter();
  const merchant_id = router.query.id as string;

  const [isOpen, setIsOpen] = useState(false);
  const [merchantItem, setMerchantItem] = useState([]);
  const [select, setSelect] = useState<string>("");
  const dropdownRef = useRef<any>("");
  const [id, setId] = useState<string>(merchant_id);
  const [title, setTitle] = useState<string>("");

  console.log(merchant_id, id);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const { data: merchantData, refetch } = useGetProductByMerchant(merchant_id);

  const data2 = useGetCategory();

  console.log(merchantData);

  useEffect(() => {
    setId(merchant_id);

    const findCategory = merchantData?.data?.find((item: any) => item.category);
    console.log(findCategory);
    findCategory ? setTitle(findCategory?.category) : null;
  }, [merchantData, merchant_id]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },

      items: 5,
    },

    desktop: {
      breakpoint: { max: 3000, min: 1024 },

      items: 5,
    },

    tablet: {
      breakpoint: { max: 1024, min: 464 },

      items: 3,
    },

    mobile: {
      breakpoint: { max: 464, min: 0 },

      items: 1,
    },
  };

  return (
    <div className={styles.container_width}>
      <Toaster position="bottom-center" />
      <TopHeader />

      <div className={styles.bannerTop}>
        <Image
          src="/omratrade/wash.png"
          width={1700}
          height={590}
          priority
          alt="jfgg"
        />
      </div>
      {/* <MerchantTopIcon /> */}

      <div className={styles.productdiv33}>
        <div className={styles.productdiv}>
          <MerchantProduct
            title={title}
            merchant_id={merchant_id}
            data={merchantData?.data}
          />
        </div>
      </div>

      {/**End ============== */}

      <div>
        {/* <div className={styles.bannerImage}>
          <Image
            src="/omratrade/machinebanner.png"
            width={1700}
            height={600}
            priority
            alt="jfgg"
          />
          <div className={styles.absolutePart}>
            <div>
              <div>
                <div className={styles.bannertext}>
                  <h1>Say Hello to Your New Smart machine</h1>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <Pagination />

        <NewFooter />
      </div>
    </div>
  );
};

export default MerchantProductList;
