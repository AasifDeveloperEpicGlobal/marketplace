import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAppSelector } from "../../../redux/hooks";
import styles from "../../../styles/Merchant/dashboard.module.scss";
import {
  useGetUserDetail,
} from "networkAPI/queries";
import AdminLayout from "components/AdminLayout";
import { dehydrate, QueryClient } from "react-query";
//@ts-ignore
import { parseCookies } from "nookies";

const DashBoard: NextPage = () => {
  const {  user, isAuthenticated } = useAppSelector(
    (state:any) => state.user
  );

  console.log(user)
 

  const [companyName, setCompanyName] = React.useState<string>("");
  const { data: merchantData,refetch ,isSuccess } = useGetUserDetail();
   useEffect(() => {
   
    refetch()
  }, [ refetch]);

  const router = useRouter();
  return (
    <>
      <div className={styles.container_width}>
        <AdminLayout>
          <div className={styles.adminMain}>
            <div>
              <h1 className={styles.heading_box}>
                Welcome to{" "}
                <span style={{ color: "red" }}>
                  {merchantData?.company_Name}
                </span>{" "}
                {/* Dashboard  */}
              </h1>
            </div>
            {/* 
            <div className={styles.gridbox}>
              <div className={styles.flex_box1}>
                <h3> Approved Listing</h3>
              </div>
              <div className={styles.flex_box2}>
                <h3>Pending Listing</h3>
              </div>
              <div className={styles.flex_box3}>
                <h3>Pending Listing</h3>
              </div>
            </div> */}
          </div>

          {/* <Footer /> */}
        </AdminLayout>
      </div>
    </>
  );
};
export default DashBoard;

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
