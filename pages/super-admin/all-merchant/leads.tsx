import React, { useState } from "react";

import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  useBuyerQuery,
  useCustomerQueryCompleted,
  useCustomerQueryDeclined,
  useProducts,
} from "../../../networkAPI/queries";
import { useAppSelector } from "../../../redux/hooks";
import styles from "../../../styles/Merchant/leads.module.scss";
import SuperAdminLayout from "components/SuperAdmin/Layout";
import { request } from "http";

const fetchUsers = async () => {
  const res = await fetch("/api/user/upload_product");
  return res.json();
};

const CustomerLeads: NextPage = () => {
  const router = useRouter();

  const [checked, setChecked] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isDeclined, setIsDeclined] = useState<boolean>(false);

  const {  user, isAuthenticated } = useAppSelector(
    (state) => state.user
  );

  const { data, status } = useProducts();
  const { data: QueryData } = useBuyerQuery();

  const [merchantGedivata, setMerchantGedivata] = useState<any>();
  const data1 = useProducts();
  const {
    data: completed,
    isSuccess: isSuccess,
    mutate: completeMutate,
  } = useCustomerQueryCompleted();

  const {
    data: updateStatus,
    isSuccess: isSuccess1,
    mutate: declinedMutate,
  } = useCustomerQueryDeclined();

  const handleChange = () => {
    setChecked(!checked);
  };
  const handleApproved = (item: any) => {
    completeMutate({
      id: item._id,

      isCompleted: true,
    });
    router.reload();
  };

  const handleDeclined = (item: any) => {
    declinedMutate({
      id: item._id,

      isDeclined: true,
    });
    router.reload();
  };
  // useEffect(()=>{
  //   setIsCompleted(true)
  // },[])
  // useEffect(()=>{
  //   setIsDeclined(true)
  // },[])



 

  const UserId = router.query?.id;

  return (
    <div className={styles.container_width}>
      <SuperAdminLayout>
        <div className={styles.container}>
          {QueryData?.data?.filter(
            (lead: any) =>
              UserId == lead.merchant_Id &&
              lead?.isCompleted == false &&
              lead?.isDeclined == false
          ).length == 0 ? (
            <div
              style={{
                color: "red",
                fontFamily: "sans-serif",
                fontSize: "20px",
                marginTop: "200px",
                marginLeft: "200px",
              }}
            >
              {" "}
              No Leads Found
            </div>
          ) : (
            QueryData?.data
              ?.filter(
                (lead: any) =>
                  UserId == lead.merchant_Id &&
                  lead?.isCompleted == false &&
                  lead?.isDeclined == false
              )
              .map((item: any, index: any) => {
                return (
                  <div key={index} className={styles.Flex_Container}>
                    <div className={styles.lead_box}>
                      <div key={index} className={styles.lead_Flex}>
                        <div className={styles.div_box}>
                          <div>Sr No:</div>
                          <div className={styles.text_color}>{index + 1}</div>
                        </div>
                        <div className={styles.div_box}>
                          <div>Product_Id:</div>
                          <div>{item.product_Id}.</div>
                        </div>
                        <div className={styles.div_box}>
                          <div>Product Name:</div>
                          <div>{item.product_name}.</div>
                        </div>
                        <div className={styles.div_box}>
                          <div>Buyer Email</div>
                          <div>{item.buyer_Email}</div>
                        </div>
                        <div className={styles.div_box}>
                          <div>Contact No:</div>
                          <div>{item.buyer_Mob}</div>
                        </div>
                        <div className={styles.div_box}>
                          <div>Query:</div>
                          <div>{item.buyer_Message}</div>
                        </div>
                        <div className={styles.div_box}>
                          <div> Product Details</div>
                          <div
                            className={styles.link_color}
                            onClick={() =>
                              router.push(`/product?id=${item.product_Id}`)
                            }
                          >
                            <Link href="">
                              <a>
                                <u>Visit Product</u>
                              </a>
                            </Link>
                          </div>
                        </div>
                        <div className={styles.div_box}>
                          <div>Leads Type:</div>
                          <div>{item.type}</div>
                        </div>
                        <div className={styles.div_box}>
                          <div>
                            <button
                              type="button"
                              // className="approve-button"
                              onClick={() => handleApproved(item)}
                              className={styles.completedButton}
                            >
                              Done
                            </button>
                          </div>
                          <div>
                            <button
                              type="button"
                              // className="approve-button"
                              onClick={() => handleDeclined(item)}
                              className={styles.ignoreButton}
                            >
                              Ignore
                            </button>
                          </div>
                        </div>

                        {/* <span>
                        <button className={styles.call_button}>CALL NOW</button>
                      </span> */}
                      </div>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </SuperAdminLayout>
    </div>
  );
};

export default CustomerLeads;
