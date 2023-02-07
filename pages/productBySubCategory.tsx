/* eslint-disable jsx-a11y/alt-text */
import "react-multi-carousel/lib/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import TopHeader from "pages/topheader";
import React, { useEffect, useRef, useState } from "react";

import {
  useGetBanner,
  useGetCategory,
  useProductsByCategory,
  usePublicProduct,
  usePublishedProduct,
} from "networkAPI/queries";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

import styles from "../styles/Merchant/merchant_homepage.module.scss";

import SubProductCard from "components/Cards/productItemCard";
import { decode, encode as base64_encode } from "base-64";
import NewFooter from "./newwfooter";
import { dehydrate, QueryClient } from "react-query";

const ProductBySubcategory: NextPage = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState<string>("");
  const dropdownRef = useRef<any>("");
  const [title, setTitle] = useState<string>("");

  const merchant_id = router.query.id as string;
  const queryCategory = router.query.category as string;
  const querysubcategory1 = router.query.subcategory as string;

  const querysubcategory = decodeURI(querysubcategory1);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const { data, status } = usePublicProduct();
  const { data: productBySubcat, status: status2,refetch } = usePublishedProduct();
  

  const data2 = useGetCategory();

  const bannerData = useGetBanner().data?.data;
  //@ts-ignore

  const merchantItem = productBySubcat?.filter(
    (item: any) => item.sub_category == querysubcategory
  );
 useEffect(() => {
   const findCategory = merchantItem?.find((item: any) => item)?.category;
    findCategory ? setTitle(findCategory) : null;
  }, [merchantItem, refetch]);
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

      <div className={styles.paraBox3}>
        <p>
          <span onClick={() => router.push(`/subcategory?id=${queryCategory}`)}>
            {decodeURI(queryCategory)}
          </span>{" "}
          {`>`} {querysubcategory}
        </p>
      </div>

      <div className="">
        <div className={styles.productdiv}>
          <SubProductCard
            title={title}
            merchant_id={merchant_id}
            subCat={querysubcategory}
            count={merchantItem?.length}
            data={merchantItem}
          />
        </div>
      </div>

      {/**End ============== */}

      <NewFooter />
    </div>
  );
};

export default ProductBySubcategory;


export const getServerSideProps = async (context: any) => {
  // const access_token = parseCookies({ req: context.req });

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    "publish",
    async () =>
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/get_publish_product`,
        {
          // headers: {
          //   authorization: `bearer ${access_token.access_token}`,
          // },
        }
      ).then((response) => response.json())
  );

 

  // Pass data to the page via props
  return { props: { dehydratedState: dehydrate(queryClient) } };
};

