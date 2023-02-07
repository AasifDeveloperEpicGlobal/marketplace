import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import { useGetBanner, useGetCategoryBanner } from "../../networkAPI/queries";
import styles from "../../styles/Merchant/smallbanner.module.scss";

const SmallBanner: NextPage = () => {
  const router = useRouter();
  const { data: QueryData, refetch } = useGetCategoryBanner();
  const bannerData = useGetBanner().data?.data;
  console.log(QueryData)

  return (
    <div>
      {/* {QueryData?.data
        ?.filter((item: any) => item.type == "showcase1")
        .map((item: any, index: any) => {
          console.log(item)
          return ( */}
            <div className={styles.Flex_Section} >
              <div>
                <Image
                  src={QueryData?.data[0]?.banner_image[0]}
                  width={400}
                  height={180}
                  priority={true}
                  alt="sliderbanner"
                  className="facemask"
                  onClick={() => router.push(`/subcategory?id=${encodeURIComponent(QueryData?.data[0]?.category_name)}`)}
                />
              </div>
              <div>
                <Image
                  src={QueryData?.data[1]?.banner_image[0]}
                  width={400}
                  height={180}
                  alt="sliderbanner"
                  priority={true}
                  className="facemask"
                  onClick={() => router.push(`/subcategory?id=${encodeURIComponent(QueryData?.data[1]?.category_name)}`)}
                />
              </div>
              <div>
                <Image
                  src={QueryData?.data[2]?.banner_image[0]}
                  width={400}
                  height={180}
                  alt="sliderbanner"
                  priority={true}
                  className="facemask"
                  onClick={() => router.push(`/subcategory?id=${encodeURIComponent(QueryData?.data[2]?.category_name)}`)}
                />
              </div>
              
            </div>
          {/* );
        })} */}
    </div>
  );
};

export default SmallBanner;
