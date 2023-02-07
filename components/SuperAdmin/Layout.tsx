import React, { useEffect } from "react";
import { useAppSelector } from "redux/hooks";
import Header from "./Header";
import SideBar from "./SideBar";
import Router from "next/router";
import useSideNav from "redux/hooks/use-side";
import styles from "../../styles/Merchant/dashcode.module.scss";

// }
type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function SuperAdminLayout({ children }: AdminLayoutProps) {
  const { user, isAuthenticated } = useAppSelector((state) => state.user);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     if (user.role === "SuperAdmin") {
  //       return;
  //     } else {
  //       Router.push(`/`);
  //     }
  //   }
  //   // else {
  //   //   Router.push(`/`);
  //   // }
  // }, [user, isAuthenticated]);

  const { isNav, onSideNav } = useSideNav();
  const onNav = () => {
    onSideNav(!isNav);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="">
          <div
            className={styles["desktop"]}
            // style={{position:"fixed"}}
            style={{ position: "sticky", top: 0 }}
          >
            <SideBar show={isNav} onClick={onNav} />
          </div>
          <div
            className={styles["mobile"]}
            style={{
              transform: `translateX(${isNav ? "0%" : "-100%"})`,
            }}
          >
            <SideBar show={false} />
          </div>
        </div>
        <div className={styles.AdminSidebar}>
          <div
            style={{
              position: "fixed",
              zIndex: "1",
              width: "-webkit-fill-available",
            }}
          >
            <Header />
          </div>
          <div>
            <main
              className={styles.AdminContainer}
              style={{ marginTop: "70px" }}
            >
              <section className={styles.section}>{children}</section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
