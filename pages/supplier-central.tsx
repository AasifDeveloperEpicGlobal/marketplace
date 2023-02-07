import type { NextPage } from "next";
import styles from "../styles/Merchant/supplier-central.module.scss";
import Image from "next/image";
import TopHeader from "pages/topheader";
import NewFooter from "./newwfooter";
import React, { useEffect, useState } from "react";
import { Http2ServerRequest } from "http2";
import {
  useSuppliersEnquiry,
  useUpdateSupplierEnquiry,
} from "networkAPI/queries";
import { useRouter } from "next/router";

const AboutUs: NextPage = () => {
  //Mobile validation starts
  const router = useRouter();

  const [data, setData] = useState({
    mobile: "",
  });
  const [status, setStatus] = useState("1");
  const [warning, setWarning] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [business_name, setBusinessName] = useState("");

  // post Api
  const {
    data: suppliersData,
    mutate,
    isSuccess,
    isError,
  } = useSuppliersEnquiry();
  const {
    data: suppliersData2,
    mutate: mutateSupplier,
    isError: isError2,
    isSuccess: isSuccess2,
  } = useUpdateSupplierEnquiry();

  console.log(isError, suppliersData);

  const onChange = (e: any) => {
    const { name, value } = e.target;

    if (
      name === "mobile" &&
      value.length <= 10
      //  && value[0] == 6
    ) {
      setData({ ...data, [name]: value });
    } else if (name !== "mobile") {
      setData({ ...data, [name]: value });
    }
  };

  //For Email validation starts

  const emailValidation = () => {
    const regEx = /^([a-zA-Z0-9\.-_]+)@([a-z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})$/;
    if (!regEx.test(email) && email !== "") {
      setMessage("Email is not Valid");
    } else {
      setMessage("");
    }
  };
  const handleOnChange = (e: any) => {
    setEmail(e.target.value);
  };

  //For Email validation ends

  const test = true;

  const handleRegister = () => {
    if (data?.mobile) {
      mutate({
        mobile: data?.mobile,
      });
    } else {
      setWarning("Please Enter Your Mobile number");
    }
  };

  const handleSubmit = () => {
    emailValidation();
    if (email) {
      mutateSupplier({
        email,
        business_name,
        id: currentId as string,
      });
    } else {
      setWarning("Enter Email");
    }
  };

  console.log(isSuccess, suppliersData);
  useEffect(() => {
    if (isError) {
      setWarning("Mobile no. already exist, please contact with Customer Care");
    }
    if (isError2) {
      setWarning("Something went wrong");
    }
    if (isSuccess) {
      //@ts-ignore
      // setWarning(suppliersData?.message);
      //@ts-ignore
      setCurrentId(suppliersData?.data?._id);
      setStatus("2");
    }
    if (isSuccess2) {
      //@ts-ignore
      setWarning(suppliersData2?.message);
      router.reload();

      setStatus("1");
    }
    const timer = setTimeout(() => {
      setWarning("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [
    isError,
    isError2,
    isSuccess,
    isSuccess2,
    router,
    suppliersData,
    suppliersData2,
    warning,
  ]);
  console.log(status);
  const testcomponet = React.useMemo(() => {
    switch (status) {
      case "1":
        return (
          <>
            <div className={styles.main}>
              <div className={styles.searchSection}>
                <div>
                  <input
                    type="number"
                    id="gsearch"
                    name="mobile"
                    placeholder="Enter your Mobile Number"
                    className={styles.searchBar}
                    value={data.mobile}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                </div>
                <div>
                  <button
                    className={styles.sellingButton}
                    onClick={handleRegister}
                  >
                    Register Now
                  </button>
                </div>
              </div>
              <div
                className={
                  isError ? styles.warningmessage : styles.successmessage
                }
              >
                {warning}
              </div>
            </div>
          </>
        );

        break;
      case "2":
        return (
          <>
            <div className={styles.main}>
              <div className={styles.searchSection}>
                <div>
                  <input
                    type="text"
                    id="business-name"
                    name="text"
                    value={business_name}
                    placeholder="Business Name"
                    className={styles.inputfields}
                    onChange={(e: any) => setBusinessName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Id"
                    name="Email"
                    value={email}
                    onChange={handleOnChange}
                    className={styles.inputfields}
                  />
                </div>
                <div>
                  <button
                    className={styles.sellingButton}
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div
                className={
                  isError2 ? styles.warningmessage : styles.successmessage
                }
              >
                {warning}
              </div>
            </div>
          </>
        );

      default:
        break;
    }
  }, [
    business_name,
    data.mobile,
    email,
    handleRegister,
    handleSubmit,
    isError,
    isError2,
    message,
    onChange,
    status,
    warning,
  ]);

  //mobile validation ends

  return (
    <div className={styles.container_width}>
      <TopHeader />
      <div className={styles.imageBox}>
        <div className={styles.bannerTop}>
          <Image
            src="/omratrade/global.jpg"
            width={1700}
            height={550}
            priority
            alt="jfgg"
            className={styles.imgSize}
          />
        </div>
        <div className={styles.main}>
          <div className={styles.heading}>
            <h1>
              Want to give more visibility of your products to millions of B2B
              customers globally?
            </h1>
          </div>
        </div>
      </div>
      {testcomponet}

      <div className={styles.midContainer}>
        <div className={styles.heading}>
          <h1>How it Works</h1>
        </div>

        <div className={styles.iconMain}>
          <div>
            <div className={styles.leftside2}>
              <Image
                src="/omratrade/icon111.png"
                width={100}
                height={100}
                priority
                alt="jfgg"
              />
            </div>
            <div>
              <h2>REGISTER YOUR BUSINESS</h2>
            </div>
            <div>
              <p>
              The prior most step in commencing the business with the simplest of processes is to get the essential practicalities of the business like nature of business, GST and others accessible.
              </p>
            </div>
          </div>
          <div>
            <div className={styles.leftside2}>
              <Image
                src="/omratrade/icon222.png"
                width={100}
                height={100}
                priority
                alt="jfgg"
              />
            </div>
            <div>
              <h2>CALL AND VERIFY</h2>
            </div>
            <div>
              <p>
                Next in order the relationship manager will get in touch over a
                phone call to verify all the obligatory and mandatory details
                for the upload action of the product and thereby the creation of
                the profile.
              </p>
            </div>
          </div>
          <div>
            <div className={styles.leftside2}>
              <Image
                src="/omratrade/icon333.png"
                width={100}
                height={100}
                priority
                alt="jfgg"
              />
            </div>
            <div>
              <h2>SKILL TEAM</h2>
            </div>
            <div>
              <p>
                With the most efficient team having expertise in the area, the
                product will be uploaded on the portal and a profile matching
                all the details will be created.
              </p>
            </div>
          </div>
          <div>
            <div className={styles.leftside2}>
              <Image
                src="/omratrade/icon444.png"
                width={100}
                height={100}
                priority
                alt="jfgg"
              />
            </div>
            <div>
              <h2>BUYER</h2>
            </div>
            <div>
              <p>
                Eventually the buyer will be able to contact and connect with
                the business.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className={styles.bannerTop1}>
          <Image
            src="/omratrade/group.png"
            width={1700}
            height={700}
            priority
            alt="jfgg"
          />
          <div className={styles.textBox}>
            Suppliers have grown their business
            <p>{1.5}X with Elaundry within a year</p>
          </div>
        </div>
      </div>

      <div>
        <NewFooter />
      </div>
    </div>
  );
};

export default AboutUs;
