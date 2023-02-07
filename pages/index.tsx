import "react-multi-carousel/lib/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Category from "components/Category";
import CompanyDescription from "components/CompanyDescription";
// import SliderBox from "components/SliderBox";
import SmallBanner from "components/SmallBanner";
import UserLayout from "components/User/Layout";

import {
  useGetBanner,
  useGetCategory,
  useGetPostionCategory,
  useGetSubCategory,
  useGetTeaserBanner,
  useProductsByCategory,
  usePublicProduct,
  useSubCatByCategory,
} from "networkAPI/queries";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { Carousel } from "react-responsive-carousel";
import styles from "styles/Merchant/productcard.module.scss";
import SubCategoryCard from "components/Cards/subcategoryCard";
import NewFooter from "./newwfooter";
import { QueryClient, dehydrate } from "react-query";

import { parseCookies } from "nookies";
import dynamic from "next/dynamic";
import axios from "axios";
const  HomePageTeaserBanner =dynamic(()=>import("components/Banner"));
const  SliderBox =dynamic(()=>import("components/SliderBox"));

const HomePage: NextPage = (props) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState<string>("");
  const dropdownRef = useRef<any>("");

  const { data, status } = usePublicProduct();
  const { data: subcategoryData } = useGetSubCategory();
  const { data: homeCategory } = useGetPostionCategory();
  const findCategory = homeCategory?.data;

  const {
    data: bannerData1,
    refetch,
    isLoading,
    isFetched,
    isSuccess,
  } = useGetTeaserBanner();
  console.log("hello",bannerData1)

  const subcategoryData1 = subcategoryData?.data?.filter((item: any) =>
    findCategory?.filter(
      (item3: any) => item3.category_name == item.category_name
    )
  );

  const { data: LaundaryMachine } = useSubCatByCategory("Washing Machine");
  const { data: DryCleanMachine } = useSubCatByCategory("Dyeing Machine");

  const { data: ChemicalDetergent } = useSubCatByCategory(
    "Chemical & Detergent"
  );
  const { data: hangers } = useSubCatByCategory("Ironer");

  const { data: Qrprinter } = useSubCatByCategory("Finishing Equipments");
  const { data: laudaryBags } = useSubCatByCategory("Labels");

  const bannerData = useGetBanner().data?.data;



  return (
    <div className={styles.container_width}>
      <Toaster position="bottom-center" />
      <Head>
        <title>MarketPlace</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <UserLayout>
        <div className={` ${styles.container} homebanner`}>
          <HomePageTeaserBanner />
        </div>

        <div>
          <SmallBanner />
        </div>
        <div>
          <Category />
        </div>

        <div className={styles.container}>
          <div className={styles.right}>
            <div>
              {bannerData?.map((item: any, index: any) => {
                if (item.type == "showcase2") {
                  return (
                    <div key={index}>
                      <Carousel
                        autoPlay={true}
                        // @ts-ignore
                        autoPlaySpeed={4000}
                        showThumbs={false}
                        infiniteLoop={true}
                      >
                        <div
                          // onClick={() =>
                          //   router.push(`/product?merchant=${item.product}`)
                          // }
                        >
                          {item.banner_image1[0].length > 0 && (
                            <Image
                              src={
                                item.banner_image1[0]
                                  ? item.banner_image1[0]
                                  : "/omratrade/homebanner.png"
                              }
                              className={styles.imagestyle}
                              width={1500}
                              height={350}
                              priority={true}
                              alt="image1"
                            />
                          )}
                          {/* <p className="legend">Image 1</p> */}
                        </div>

                        <div>
                          {item.banner_image2[0].length > 0 && (
                            <Image
                              src={
                                item.banner_image2[0]
                                  ? item.banner_image2[0]
                                  : "/omratrade/homebanner.png"
                              }
                              className={styles.imagestyle}
                              width={1500}
                              height={350}
                              priority={true}
                              alt="image1"
                            />
                          )}
                          {/* <p className="legend">Image 2</p> */}
                        </div>

                        <div>
                          {item.banner_image3[0].length > 0 && (
                            <Image
                              src={
                                item.banner_image3[0]
                                  ? item.banner_image3[0]
                                  : "/omratrade/homebanner.png"
                              }
                              className={styles.imagestyle}
                              width={1500}
                              height={350}
                              priority={true}
                              alt="image44"
                            />
                          )}

                          {/* <p className="legend">Image 3</p> */}
                        </div>

                        <div>
                          {item.banner_image4[0].length > 0 && (
                            <Image
                              src={
                                item?.banner_image4[0]
                                  ? item.banner_image4[0]
                                  : "/omratrade/homebanner.png"
                              }
                              className={styles.imagestyle}
                              width={1500}
                              height={350}
                              priority={true}
                              alt="image1"
                            />
                          )}
                        </div>

                        <div>
                          {item.banner_image5[0].length > 0 && (
                            <Image
                              src={
                                item?.banner_image5[0]
                                  ? item.banner_image5[0]
                                  : "/omratrade/homebanner.png"
                              }
                              className={styles.imagestyle}
                              width={1500}
                              height={350}
                              priority={true}
                              alt="image1"
                            />
                          )}
                        </div>
                      </Carousel>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div className={styles.productdiv33}>
          <div className={styles.productdiv}>
            <SubCategoryCard
              title="Washing Machine"
              count={LaundaryMachine?.data?.length}
              data={LaundaryMachine}
            />
          </div>

          <div className={styles.productdiv}>
            <SubCategoryCard
              title="Dyeing Machine"
              count={DryCleanMachine?.data?.length}
              data={DryCleanMachine}
            />
          </div>
        </div>
        <div>
          <div>
            <SliderBox />
          </div>

          <div className={styles.productdiv}>
            <SubCategoryCard
              title="Ironer"
              count={hangers?.data?.length}
              data={hangers}
            />
          </div>
          <div className={styles.productdiv}>
            <SubCategoryCard
              title="Finishing Equipments"
              count={Qrprinter?.data?.length}
              data={Qrprinter}
            />
          </div>
          <div className={styles.productdiv}>
            <SubCategoryCard
              title="Chemical & Detergent"
              count={ChemicalDetergent?.data?.length}
              data={ChemicalDetergent}
            />
          </div>
          <div className={styles.productdiv}>
            <SubCategoryCard
              title="Labels"
              count={laudaryBags?.data?.length}
              data={laudaryBags}
            />
          </div>
          {/* <div style={{ textAlign: "right" }}>
            <div>
              <Link href={"/allcategory"} className="allCategoryButton">
                View More
              </Link>
            </div>
          </div> */}

          <div>
            <CompanyDescription />
          </div>
          {/* <FooterDescription /> */}
          {/* <div>
            <BlogDemo />
          </div> */}
          {/* <MerchantTopIcon /> */}
          {/* <Footer /> */}
          <NewFooter />
        </div>
      </UserLayout>
    </div>
  );
};

export default HomePage;

// export const ServerSideProps = async (context: any) => {
//   const access_token = parseCookies({ req: context.req });

//   const category_name = context.req.query;

//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery(
//     "publish",
//     async () =>
//       await fetch(
//         `${process.env.NEXT_PUBLIC_SERVER_URL}/api/get_publish_product`

//         // {
//         //   headers: {
//         //     authorization: `bearer ${access_token.access_token}`,
//         //   },
//         // }
//       ).then((response) => response.json())
//   );
//   return {
//     props: { dehydratedState: dehydrate(queryClient) },
//   };
// };


export const ServerSideProps = async (context: any) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    ["teaser"],
    async () =>
      await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/banner/get_teaser_banner`
      ).then((response) => response.data)
  );
  return {
    props: {
      dehydratedState: (dehydrate(queryClient)),
    },
  };
};
