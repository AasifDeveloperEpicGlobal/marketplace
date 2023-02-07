import React, { useEffect, useState } from "react";
import Link from "next/link";
import { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/Merchant/bookyourdemo.module.scss";
import TopHeader from "./topheader";
import NewFooter from "./newwfooter";
import { useBookDemo } from "networkAPI/queries";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import TimeSlot from "components/TimeSlot";

const BookYourDemo: NextPage = () => {
  const router = useRouter();
  const currentDate = new Date();
  const currDate = currentDate.toISOString().slice(0, 10);
  const [toDate, setToDate] = useState<string>(currDate);
  const [name, setName] = useState<string>("");
  const [business_name, setBusinessName] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [type, setType] = useState<string>("demo");
  const [process, setProcess] = useState<string>("");

  // post data api
  const { data: demoData, mutate, isSuccess, isError } = useBookDemo();

  //For Email validation starts

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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

  //Mobile validation starts

  const [data, setData] = useState({
    mobile: "",
  });

  const onChange = (e: any) => {
    const { name, value } = e.target;

    if (
      name === "mobile" &&
      value.length <= 10
      //  && value[0] == 6
    ) {
      setData({ ...data, [name]: value });
      setMobile(data?.mobile);
    } else if (name !== "mobile") {
      setData({ ...data, [name]: value });
    }
  };
  //@ts-ignore
  console.log(demoData?.message);
  const handleSubmit = React.useCallback(() => {
    emailValidation();
    mutate(
      {
        merchant_Id: "",
        name,
        email,
        mobile: data?.mobile,
        business_name,
        process,
        date: toDate,
        type,
      },
      {
        onSuccess: () => {
          //@ts-ignore
          // toast.success(demoData?.message)
          router.reload();
          setName("");
          setBusinessName("");
          setMobile("");
          setProcess("");
        },
        onError: () => {
          //@ts-ignore
          toast.error(demoData?.message);
        },
      }
    );
  }, [
    business_name,
    data,
    demoData,
    email,
    emailValidation,
    mutate,
    name,
    process,
    router,
    toDate,
    type,
  ]);

  console.log(isError, isSuccess, demoData);
  useEffect(() => {
    //@ts-ignore
    if (isSuccess) {
      //@ts-ignore
      if (demoData?.success) {
        //@ts-ignore
        toast.success(demoData?.message);

        // router.reload()
      } else {
        //@ts-ignore
        toast.error(demoData ? demoData?.message : "");
      }
    }

    // if(!isError){
    //    //  @ts-ignore
    //  toast.error(demoData?demoData?.message:"")

    // }
  });

  //mobile validation ends
  console.log(email, data?.mobile);

  return (
    <div className={styles.container_width}>
      <TopHeader />

      <div className={styles.headingBox}>
        <h1>Book your Demo ! </h1>
      </div>
      <div className={styles.demoSection}>
        <div>
          <div className={styles.mov}>
            <div className={styles.topTable}>
              <div className={styles.inputFlex}>
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    name="name"
                    className={styles.inputForm}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email "
                    name="email"
                    value={email}
                    className={styles.inputForm}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <span className={styles.emailvalidationmessage}>{message}</span>
                <div>
                  <input
                    type="text"
                    placeholder="Enter Business Name"
                    name="businessName"
                    className={styles.inputForm}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>
                <div className="numberinput">
                  <input
                    type="number"
                    placeholder="Mobile Number"
                    name="mobile"
                    className={styles.inputForm}
                    value={data.mobile}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                </div>
                <div className={styles.inputForm}>
                  <select
                    name="process"
                    id=""
                    className={styles.insideinput}
                    onChange={(e) => setProcess(e.target.value)}
                  >
                    <option value="ERP-Billing -Laundry Dry-cleaning Software">
                      ERP-Billing -Laundry Dry-cleaning Software{" "}
                    </option>
                    <option value="Marketplace - Registration Process">
                      Marketplace - Registration Process
                    </option>
                  </select>
                </div>
                <div>
                  <input
                    className={styles.demoDate}
                    type="date"
                    name="toDate"
                    value={toDate}
                    min={toDate}
                    placeholder="filter By date"
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.inputForm}>
                <TimeSlot />
              </div>

              <div className={styles.inputFlex3}>
                <button
                  type="button"
                  className={styles.demoButton}
                  onClick={handleSubmit}
                >
                  Request Demo
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.demoBox}>
          <h3>
            No obligation, no fee get register yourself and connect with the
            correct expert!
          </h3>

          <p>
            Get answers to your unique questions and find out why E-laundry is
            the right choice for you.
          </p>
          <div>
            <Image
              data-lazyloaded="1"
              src="/omratrade/bookyoudemo.jpeg"
              height={400}
              width={700}
              alt="Logo Image"
              className={styles.imageLogo}
            />
          </div>
        </div>
      </div>
      <NewFooter />
    </div>
  );
};
export default BookYourDemo;
