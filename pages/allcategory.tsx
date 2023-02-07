/* eslint-disable jsx-a11y/alt-text */
import "react-multi-carousel/lib/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import TopHeader from "pages/topheader";
import React, { useEffect, useRef, useState } from "react";
import Footer from "components/Footer/footer";

import {
  useGetBanner,
  useGetCategory,
  useGetSubCategory,
  useProductsByCategory,
  usePublicProduct,
  usePublishedProduct,
} from "networkAPI/queries";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import styles from "../styles/Merchant/newcategory.module.scss";
import AllCategoryItem from "components/Cards/allCategoryCard";
import NewFooter from "./newwfooter";

const AllCategoryList: NextPage = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState<string>("");
  const dropdownRef = useRef<any>("");
  const [title, setTitle] = useState<string>("");

  const merchant_id = router.query.id as string;
  const queryCategory = router.query.category as string;
  const querysubcategory = router.query.subcategory as string;

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const { data, status } = usePublicProduct();
  const { data: subcategory } = useGetSubCategory();
  const { data: productBySubcat, status: status2 } = usePublishedProduct();

  const { data: categoryData } = useGetCategory();
  console.log(categoryData)

  const bannerData = useGetBanner().data?.data;

  const merchantItem = productBySubcat?.data.filter(
    (item: any) => item.sub_category == querysubcategory
  );

  useEffect(() => {
    const findCategory = merchantItem?.find((item: any) => item)?.category;
    findCategory ? setTitle(findCategory) : null;
  }, [merchantItem]);

  useEffect(() => {
    if (!isOpen) return;
    function handleOutsideClick(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSelect("");
      }
    }
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

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

      <div className={styles.productdiv33}>
        <div className={styles.productdiv}>
          <AllCategoryItem
            data={subcategory?.data}
            category={categoryData?.data}
            title="All Categories"
          />
        </div>
      </div>

      {/**End ============== */}

      <div>
        <NewFooter />
      </div>
    </div>
  );
};

export default AllCategoryList;
