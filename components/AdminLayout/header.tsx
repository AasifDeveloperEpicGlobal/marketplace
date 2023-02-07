import React, { useEffect, useState } from "react";
import Styles from "styles/order.module.scss";
import UserIcon from "../constants/icons/UserIcon";
import SearchIcon from "../constants/icons/SearchIcon";
import {
  useBuyerQuery,
  useGetMerchantDetails,
  useGetUserDetail,
  useGetUserDetails,
  useUserById,
  useUserLogOut,
} from "networkAPI/queries";
import { useOnClickOutside } from "usehooks-ts";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Router, useRouter } from "next/router";
import { useCookies } from "react-cookie";
import styles from "styles/Merchant/Header.module.scss";
import Link from "next/link";
import NotificationBell from "components/constants/icons/notification";
import Image from "next/image";
import { dehydrate, QueryClient } from "react-query";
import { parseCookies } from "nookies";
import axiosInstance from "networkAPI/axios";
import MenuBar from "components/svg-icons/menu-bar";
import useSideNav from "redux/hooks/use-side";
const DashboardHeader = () => {
  const [, , removeCookie] = useCookies(["jwt"]);
  const router = useRouter();
  const [userId, setUserId] = useState<any>("");
  const dispatch = useAppDispatch();

  const [totalLeadsCount, setTotalLeadsCount] = useState<number>(0);
  const { user, isAuthenticated } = useAppSelector((state) => state.user);
  
  const { mutate: logout } = useUserLogOut();

  const Logout = async () => {
    // dispatch(handleLogout());
    await axiosInstance.post("/api/logout");

    router.reload();
  };

  const [dropdown, setDropdown] = React.useState(false);
  const dropdownRef = React.useRef<HTMLLIElement>(null);
  useOnClickOutside(dropdownRef, () => setDropdown(false));
  const [merchantName, setMerchantName] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");

  const [dropdown1, setDropdown1] = React.useState(false);
  const dropdownRef1 = React.useRef<HTMLLIElement>(null);
  useOnClickOutside(dropdownRef1, () => setDropdown1(false));

  const { data, error } = useBuyerQuery();
  const { data: merchant } = useGetMerchantDetails();
  // const { data: merchantData }: any = useGetUserDetails();
  const { data: merchantData, refetch } = useGetUserDetail();
  // const { data: Notifications } = useNotification();
  const count = 11;
  
  const userDAta = merchantData?.data?.user.find(
    (item2: any) => item2._id == user?._id
  );

  const test = data?.data?.filter(
    (td: any) =>
      merchantData?._id == td.merchant &&
      td?.isCompleted == false &&
      td?.isDeclined == false
  ).length;

  useEffect(
    () => {
      // if(data?.data?.data?.map()merchant_Id===user?._id){
      //   setTotalLeadsCount(data?.data?.totalDocuments)
      // }
      data?.data?.filter((item: any, index: any) => {
        item?.merchant_Id == merchantData?._id ? setTotalLeadsCount(test) : 0;
      });
      setUserId(user?.email);
      setMerchantName(merchantData?.company_Name);
      setMobileNumber(merchantData?.mobile_no);
    },
    // []
    [data, user, test, merchantData]
  );

  const [navToggle, setNavToggle] = useState(false);

  const navToggleHandler = () => {
    setNavToggle(!navToggle);
  };

  const { onSideNav, isNav } = useSideNav();

  return (
    <>
      <div className={Styles.topheaderdashboard}>
        <div className={Styles.leftside}>
          <div className={styles.adminheadicon}>
            <div
              // className={styles["mobile-button"]}
              onClick={() => onSideNav(!isNav)}
            >
              <MenuBar height={22} width={22} />
            </div>
          </div>
          <div>Admin Dashboard</div>
        </div>
        <div className={Styles.rightside}>
          <div className={Styles.dropdownaction}>
            <div className={Styles.userimagewithtext}>
              <div className={Styles.text}>{/* <span>Admin</span>{" "} */}</div>
              <div>
                <NotificationBell />
              </div>

              <div className={Styles.image}>
                <span onClick={() => setDropdown(!dropdown)}>
                  <UserIcon />
                </span>{" "}
                {dropdown ? (
                  <div
                    style={{
                      opacity: dropdown ? 1 : 0,
                    }}
                    className={styles.dropdown}
                  >
                    <ul>
                      <Link href="#">
                        <li>Company:{merchantName}</li>
                      </Link>
                      <li>Mobile:{mobileNumber}</li>

                      <li
                        onClick={() =>
                          router.push(
                            "/onboarding/dashboard/editcompany-details"
                          )
                        }
                      >
                        Edit Company Details
                      </li>

                      <li
                        onClick={() =>
                          router.replace("/onboarding/dashboard/edit-bussiness")
                        }
                      >
                        Business Details
                      </li>

                      <li className={styles.logout_button}>
                        <div onClick={Logout}>Logout</div>
                      </li>
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};
export default DashboardHeader;

export const getServerSideProps = async (context: any) => {
  const access_token = parseCookies({ req: context.req });
  

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    "userdetails1",
    async () =>
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/get_user`, {
        headers: {
          //@ts-ignore
          authorization: `bearer ${access_token.access_token}`,
        },
      }).then((response) => response.json())
  );

  // Pass data to the page via props
  return { props: { dehydratedState: dehydrate(queryClient) } };
};
