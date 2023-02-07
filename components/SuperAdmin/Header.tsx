import MenuBar from "components/svg-icons/menu-bar";
useSideNav;
import { useBuyerQuery, useProductForApprovals } from "networkAPI/queries";
import { useRouter } from "next/router";
import React from "react";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import useSideNav from "redux/hooks/use-side";
import { useOnClickOutside } from "usehooks-ts";

// import styles from "../styles/Merchant/superadmin.module.scss";
import styles from "../../styles/Merchant/superadmin.module.scss";
import LogoutButton from "components/svg-icons/logoutButton";
import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "networkAPI/axios";

const Header = () => {
  const router = useRouter();
  const [dropdown1, setDropdown1] = React.useState(false);
  const dropdownRef1 = React.useRef<HTMLLIElement>(null);
  useOnClickOutside(dropdownRef1, () => setDropdown1(false));
  const { data: productCount } = useProductForApprovals();
  const dispatch = useAppDispatch();

  // const Logout = () => {
  //   dispatch(handleLogout());
  //   router.push("/");
  // };

  const Logout = async () => {
    // dispatch(handleLogout());
    await axiosInstance.post("/api/logout");

    router.reload();
  };

  const { data, error } = useBuyerQuery();
  const { isNav, onSideNav } = useSideNav();

  return (
    // <div className={styles.maincontainer}>
    <div className={styles.rightside}>
      <div className={styles.topbar}>
        <div className={styles.innertopbar}>
          <div className={styles.bar}>
            <div className={styles.topFlex}>
              <div
                className={styles["mobile-button"]}
                onClick={() => onSideNav(!isNav)}
              >
                <MenuBar height={22} width={22} />
              </div>
              <div>
                <li>
                  <h3>Superadmin Dashboard</h3>
                </li>
              </div>
              <div>
                <li>
                  <input
                    type="text"
                    placeholder="Search.. "
                    name="search2"
                    className={styles.searchBar}
                  />
                </li>
              </div>
            </div>
          </div>
          <div className={styles.author}>
            <ul>
              {" "}
              <div className={styles.topFlex}>
                <div className={styles.navlinks}>
                  <li ref={dropdownRef1}>
                    <i
                      className="far fa-bells3 bellIcon"
                      // onClick={() => setDropdown1(!dropdown1)}
                    ></i>
                    <span className={styles.notification_count3}>
                      {productCount?.data?.count}
                    </span>
                  </li>
                </div>
                <div>
                  <li>
                    <div className={styles.logoutMobile} onClick={Logout}>
                      <LogoutButton />
                    </div>
                  </li>
                  <li>
                    <div className={styles.logout_button} onClick={Logout}>
                      Logout
                    </div>
                  </li>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Header;
