import React, { useEffect } from "react";

import { NextPage } from "next";
import Router from "next/router";
import styles from "../../styles/Merchant/admin.module.scss";
import { useAppSelector } from "../../redux/hooks";
import SuperAdminLayout from "components/SuperAdmin/Layout";

const DashBoard2: NextPage = () => {
  return (
    <>
      <SuperAdminLayout>
        <div>
          <h1 className={styles.heading_box}>
            {" "}
            Welcome to your SuperAdmin Dashboard
          </h1>
        </div>
      </SuperAdminLayout>
    </>
  );
};
export default DashBoard2;
