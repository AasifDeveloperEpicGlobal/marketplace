import React, { useEffect } from "react";
import Sidebar from "./sidebar";
import css from "styles/order.module.scss";
import { Router, useRouter } from "next/router";
import DashboardHeader from "./header";
import { useAppSelector } from "redux/hooks";
import useSideNav from "redux/hooks/use-side";

const AdminLayout = ({ children }: React.PropsWithChildren<{}>) => {
  const router = useRouter();



  const { error, user, isAuthenticated, access_token } = useAppSelector(
    (state: any) => state.user
  );
 
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     if (user.role === "Admin") {
  //       return;
  //     }
  //   } else {
  //     router.push(`/`);
  //   }
  // }, [user, isAuthenticated]);

  const { isNav } = useSideNav();

  return (
    <React.Fragment>
      <div className={css.mainouterbox}>
        <div
          className={css.rightleftbox}
          style={{ display: "flex", gap: "0px" }}
        >
          <Sidebar active={isNav} />
          <div style={{ marginTop: "0px", flex: 1, minHeight: "100vh" }}>
            <DashboardHeader />
            <div>{children}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminLayout;
