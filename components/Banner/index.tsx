import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import { useGetBanner, useGetTeaserBanner } from "../../networkAPI/queries";
import styles from "../../styles/Merchant/smallbanner.module.scss";
import { Carousel } from "react-responsive-carousel";
import { dehydrate, QueryClient } from "react-query";
import React, { useState, CSSProperties } from "react";

import axios from "axios";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const HomePageTeaserBanner: NextPage = (props) => {
  console.log(props);
  const router = useRouter();
  //   const bannerData = useGetBanner().data?.data;
  // const { data: bannerData, refetch } = useGetBanner();
  const {
    data: bannerData,
    refetch,
    isLoading,
    isFetched,
    isSuccess,
  } = useGetTeaserBanner();
  const [test, setTest] = useState<any>([]);
  React.useEffect(() => {
    // setTest(bannerData)
    // refetch();
  }, [bannerData, refetch]);

  let [color, setColor] = useState("#ffffff");

  return (
    <div className={styles.right}>
      <div>
        <Carousel
          autoPlay={true}
          // @ts-ignore
          autoPlaySpeed={4000}
          showThumbs={false}
          infiniteLoop={true}
        >
          <div
            onClick={() =>
              router.push(
                `/merchant-homepage?id=${bannerData?.data[0]?.merchant_id}`
              )
            }
          >
            <Image
              src={
                bannerData?.data[0]?.banner_image
                  ? bannerData?.data[0]?.banner_image[0]
                  : "/"
              }
              className={styles.imagestyle}
              width={1500}
              priority
              height={480}
              alt={"teaser"}
            />
          </div>

          <div
            onClick={() =>
              router.push(
                `/merchant-homepage?id=${bannerData?.data[1]?.merchant_id}`
              )
            }
          >
            <Image
              src={
                bannerData?.data[1]?.banner_image[0]
                  ? bannerData?.data[1]?.banner_image[0]
                  : "/"
              }
              className={styles.imagestyle}
              width={1500}
              priority={true}
              height={480}
              alt="image1"
            />
          </div>

          <div
            onClick={() =>
              router.push(
                `/merchant-homepage?id=${bannerData?.data[2]?.merchant_id}`
              )
            }
          >
            <Image
              src={
                bannerData?.data[2]?.banner_image[0]
                  ? bannerData?.data[2]?.banner_image[0]
                  : "/"
              }
              className={styles.imagestyle}
              width={1500}
              priority={true}
              height={480}
              alt="image1"
            />
          </div>
          <div
            onClick={() =>
              router.push(
                `/merchant-homepage?id=${bannerData?.data[3]?.merchant_id}`
              )
            }
          >
            <Image
              src={
                bannerData?.data[3]?.banner_image[0]
                  ? bannerData?.data[3]?.banner_image[0]
                  : "/"
              }
              className={styles.imagestyle}
              width={1500}
              priority={true}
              height={480}
              alt="image1"
            />
          </div>
          <div
            onClick={() =>
              router.push(
                `/merchant-homepage?id=${bannerData?.data[4]?.merchant_id}`
              )
            }
          >
            <Image
              src={
                bannerData?.data[4]?.banner_image[0]
                  ? bannerData?.data[4]?.banner_image[0]
                  : "/"
              }
              className={styles.imagestyle}
              width={1500}
              priority={true}
              height={480}
              alt="image1"
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default HomePageTeaserBanner;

export const ServerSideProps = async (context: any) => {
  // const access_token = parseCookies({ req: context.req });

  const category_name = context.req.query;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    "teaser",
    async () =>
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/banner/get_teaser_banner`

          // {
          //   headers: {
          //     authorization: `bearer ${access_token.access_token}`,
          //   },
          // }
        )
        .then((response) => response.data)
  );
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
