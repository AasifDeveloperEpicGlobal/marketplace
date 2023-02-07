import React, { useMemo, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import styles from "../../../styles/banners/banner.module.scss";
import SuperAdminLayout from "components/SuperAdmin/Layout";

import CategoryBannerHome from "components/SuperAdmin/Tab/banner/category";
import DiscountBannerHome from "components/SuperAdmin/Tab/banner/discount";
import TeaserBannerHome from "components/SuperAdmin/Tab/banner/teaser";

const Banners: NextPage = () => {
  const router = useRouter();

  const [test, setTest] = useState<string>("teaser");
  // Service
  // Package
  // Subscription
  const tabArray = [
    {
      text: "Teaser",
      value: "teaser",
    },
    {
      text: "Category",
      value: "category",
    },
    {
      text: "Discount",
      value: "discount",
    },
  ];

  const refInput = useMemo(() => {
    switch (test) {
      case "category":
        return (
          <div>
            <CategoryBannerHome />
          </div>
        );

      case "discount":
        return <DiscountBannerHome />;

      default:
        return <TeaserBannerHome   />;
    }
  }, [test]);

  return (
    <SuperAdminLayout>
      <div className={styles.mov}>
        <div style={{ background: "white", margin: "10px 10px" }}>
          <h1 className={styles.subcatHeading}>Banners Section </h1>
          <ul className={styles.priceSection1}>
            {tabArray.map((data: any, index: any) => {
              return (
                <div key={index}>
                  <li
                    value={data.value}
                    className={styles.FirstSection}
                    style={
                      test === data?.value
                        ? { background: "red" }
                        : { background: "#223268" }
                    }
                    onClick={() => setTest(data?.value)}
                  >
                    {data.text}
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
        <div style={{ background: "white", margin: "10px 10px" }}>
          <div>{refInput}</div>
        </div>
      </div>
    </SuperAdminLayout>
  );
};
export default Banners;
