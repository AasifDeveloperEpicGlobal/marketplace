import { useEffect, useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Merchant/companydescription.module.scss";

const CompanyDescription: NextPage = () => {
  return (
    <div>
      <h1 className={styles.headingBox}>USEFUL TIPS</h1>
      <div className={styles.Flex_Section}>
        <div className={styles.textBorder}>
          <Image
            src={"/omratrade/bl1.png"}
            width={480}
            height={280}
            priority={true}
            alt="blog1"
            className="imageClass"
          />
          <div className={styles.textPadding}>
            <h3>
              Complete Guide for Building On-demand Laundry Software and
              Necessary Features?
            </h3>
            <p className={styles.lineBox}>
              A perfect solution for Laundry and Dry-cleaning Industry to manage
              single store or any size of franchise model. The complete
              accessibility in a single click from anywhere, anytime to get
              proper Business Reporting. This software supports integrated
              customer wallet for advance payments.
            </p>
            <button type="button" className={styles.readButton}>
              <Link href="/blog"> Read more </Link>
            </button>
          </div>
        </div>
        <div className={styles.textBorder}>
          <Image
            src={"/omratrade/bl2.png"}
            width={480}
            height={280}
            priority={true}
            alt="image1"
            className="imageClass"
          />
          <div className={styles.textPadding}>
            <h3>
              {" "}
              Choose the Best Cleaning Management System for Your Business?
            </h3>
            <p className={styles.lineBox}>
              The complete order tracking and connectivity of all Laundry and
              Dry-Clean Models like supports customer notification, Brand Owner
              or Admin Access, Super Admin for Franchise, Store Billing,
              Connected Customer Mobile application, Rider Mobile App for Order
              Pickup and Delivery, Factory and Warehouse Management.
            </p>
            <button type="button" className={styles.readButton}>
              <Link href="/blog"> Read more </Link>
            </button>
          </div>
        </div>
        <div className={styles.textBorder}>
          <Image
            src={"/omratrade/bl3.png"}
            width={480}
            height={280}
            priority={true}
            alt="image1"
            className="imageClass"
          />
          <div className={styles.textPadding}>
            <h3>
              What to Look for In a Laundry Pick-up and Delivery Software?
            </h3>
            <p className={styles.lineBox}>
              A perfect solution for Laundry and Dry-cleaning Industry to manage
              single store or any size of franchise model. The complete
              accessibility in a single click from anywhere, anytime to get
              proper Business Reporting. This software supports integrated
              customer wallet for advance payments.
            </p>

            <button type="button" className={styles.readButton}>
              <Link href="/blog"> Read more </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDescription;
