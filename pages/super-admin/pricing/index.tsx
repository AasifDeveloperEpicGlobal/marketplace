import React, { useMemo, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import styles from "../../../styles/Merchant/pricingmain.module.scss";
import SuperAdminLayout from "components/SuperAdmin/Layout";
import SubscriptionList from "components/SuperAdmin/Tab/Pricing/subscription/subscription-list";
import PackageListComponent from "components/SuperAdmin/Tab/Pricing/package/packageList";
import ProductList from "components/SuperAdmin/Tab/Pricing/product/productList";
import TaxList from "components/SuperAdmin/Tab/Pricing/tax/tax-list";
import PaymentHome from "components/SuperAdmin/Tab/Pricing/payment/payment-home";
import PriceHome from "components/SuperAdmin/Tab/Pricing/price/price-home";

const Pricing: NextPage = () => {
  const router = useRouter();
  const [test, setTest] = useState<string>("product");
  // Service
  // Package
  // Subscription
  const tabArray = [
    {
      text: "Price",
      value: "price",
    },

    {
      text: "Service",
      value: "product",
    },
    {
      text: "Package",
      value: "package",
    },
    {
      text: "Subscription",
      value: "subscription",
    },
    {
      text: "Payment",
      value: "payment",
    },
  ];

  const refInput = useMemo(() => {
    switch (test) {
      case "package":
        return (
          <div>
            <PackageListComponent />;
          </div>
        );
        break;
      case "price":
        return <PriceHome />;


        break;
      case "subscription":
        return <SubscriptionList />;
        break;

      case "payment":
        return <PaymentHome />;
        break;

      default:
        return <ProductList />;
        break;
    }
  }, [test]);

  return (
    <SuperAdminLayout>
      <div className={styles.mov}>
        <div style={{ background: "white", margin: "10px 10px" }}>
          <h1 className={styles.subcatHeading}>Pricing View </h1>
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
export default Pricing;
