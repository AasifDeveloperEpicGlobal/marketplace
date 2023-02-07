import React, { useMemo, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import styles from "../../../styles/Merchant/pricingmain.module.scss";
import SuperAdminLayout from "components/SuperAdmin/Layout";

import Sms from "components/SuperAdmin/Tab/leads/sms";
import Calling from "components/SuperAdmin/Tab/leads/calling";
import Email from "components/SuperAdmin/Tab/leads/email";
import BookYourDemoLead from "components/SuperAdmin/Tab/leads/bookyourdemo";
import BulkEnquiryLead from "components/SuperAdmin/Tab/leads/bulkenquiry";
import SupplierCentralLead from "components/SuperAdmin/Tab/leads/suppliercentral";

const Leads: NextPage = () => {
  const router = useRouter();

  const [test, setTest] = useState<string>("email");
  // Service
  // Package
  // Subscription
  const tabArray = [
    {
      text: "Email",
      value: "email",
    },
    {
      text: "Calling",
      value: "calling",
    },
    {
      text: "SMS",
      value: "sms",
    },
    {
      text: "Book Your Demo",
      value: "demo",
    },
    {
      text: "Bulk Enquiry",
      value: "bulk-enquiry",
    },
    {
      text: "Supplier Central",
      value: "supplier",
    },
  ];

  const refInput = useMemo(() => {
    switch (test) {
      case "sms":
        return (
          <div>
            <Sms />;
          </div>
        );
        break;
      case "calling":
        return <Calling />;

        break;

      case "demo":
          return <BookYourDemoLead />;
  
          break;
      case "bulk-enquiry":
            return <BulkEnquiryLead />;
    
            break;

      case "supplier":
              return <SupplierCentralLead />;
      
              break;

      default:
        return <Email />;
        break;
    }
  }, [test]);

  return (
    <SuperAdminLayout>
      <div className={styles.mov}>
        <div style={{ background: "white", margin: "10px 10px" }}>
          <h1 className={styles.subcatHeading}>Leads Details</h1>
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
export default Leads;
