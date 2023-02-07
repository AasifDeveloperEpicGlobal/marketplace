import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import styles from "../styles/Merchant/contactus.module.scss";
import TopHeader from "./topheader";
import NewFooter from "./newwfooter";
import Calender from "components/svg-icons/calender";
import EmailContact from "components/svg-icons/email contact";
import CallContact from "components/svg-icons/call-contact";
import LocationContact from "components/svg-icons/location-contact";
import { useSendEmail, useSendEmailForContact } from "networkAPI/queries";
import { toast } from "react-hot-toast";
import { isError } from "react-query";

const ContactUs: NextPage = () => {
  //For Email validation starts
  const [email, setEmail] = useState("");
  const [name, setName] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [businessName, setBusinessName] = useState<string>("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [message, setMessage] = useState("");
  const {
    data: sendData,
    isSuccess,
    isLoading,
    mutate: mutateEmail,
    isError,
  } = useSendEmailForContact();

  const emailValidation = () => {
    const regEx = /^([a-zA-Z0-9\.-_]+)@([a-z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})$/;
    if (regEx.test(email)) {
    } else if (!regEx.test(email) && email !== "") {
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
    } else if (name !== "mobile") {
      setData({ ...data, [name]: value });
    }
  };
  const handleSubmit = () => {
    emailValidation();
    if (data.mobile.length == 10 && email != "" && businessName != "") {
      mutateEmail(
        {
          name,
          businessName,
          merchantEmail: email,
          description,
          email,
          phoneNumber: data?.mobile,
        },
        {
          onSuccess: () => {},
        }
      );
    } else {
      toast.error(
        data.mobile.length < 10
          ? "Enter 10 digit mobile number"
          : businessName.length < 1
          ? "Enter Business Name"
          : "Enter Email Id"
      );
    }
  };
  //@ts-ignore
  console.log("messAGE", sendData?.message);
  useEffect(() => {
    if (isSuccess) {
      //@ts-ignore
      toast.success(sendData?.message);
    }
    // //@ts-ignore
    // if (sendData?.success) {
    //   //@ts-ignore
    //   toast.error(sendData?.message);
    // }
    //@ts-ignore
    if (isError) {
      //@ts-ignore
      toast.error(sendData?.message);
    }
  }, [isSuccess, sendData]);

  //mobile validation ends

  return (
    <div className={styles.container_width}>
      <TopHeader />
      <div className={styles.contactSection}>
        <div className={styles.leftpart}>
          <h1 className={styles.contactBox}>Get in touch with us</h1>
          <p>
            Feel free to ask questions. Need to get in touch with us? Either
            fill out the form with your inquiry or find the department email you
            {"'"}d like to contact.
          </p>
          <h1 className={styles.contactPara}>Want to reach out directly?</h1>
          <p>
            Wanted to reach us directly just drop a mail or visit us any time.
          </p>
          <div className={styles.tableMain}>
            <div className={styles.smallBox}>
              <div className={styles.smallBox3}>
                <div>
                  <CallContact />
                </div>
                <div className={styles.notificationName}>
                  Phone:
                  <p>9667264383</p>
                </div>
              </div>
            </div>
            <div className={styles.smallBox}>
              <div className={styles.smallBox3}>
                <div>
                  <EmailContact />
                </div>
                <div className={styles.notificationName}>
                  Email <p>info@elaundry.co.in</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.tableMain}>
            <div className={styles.smallBox}>
              <div className={styles.smallBox3}>
                <div>
                  <LocationContact />
                </div>
                <div className={styles.notificationName}>
                  Locations <p>Delhi, Mumbai, Noida</p>
                </div>
              </div>
            </div>
            <div className={styles.smallBox}>
              <div className={styles.smallBox3}>
                <div>
                  <Calender />
                </div>
                <div className={styles.notificationName}>
                  Working Days <p>Monday To Sunday</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.mov}></div>
        <div className={styles.topTable}>
          <div className={styles.tableBoxx}>
            <h1 className={styles.subcatHeading}>Contact Us</h1>
          </div>

          <div className={styles.inputFlex}>
            <div>
              <h3>Merchant Name</h3>
              <input
                type="text"
                placeholder="Merchant Name
                "
                name="name"
                className={styles.inputForm}
                onChange={(e: any) => setName(e.target.value)}
              />
            </div>

            <div className={styles.emailbox}>
              <div>
                <h3>Email address</h3>
                <input
                  type="email"
                  placeholder="abc@gmail.com"
                  name="Email"
                  value={email}
                  required
                  onChange={handleOnChange}
                  className={styles.inputForm}
                />
              </div>
              <span className={styles.emailvalidationmessage}>{message}</span>
            </div>
          </div>

          <div className={styles.inputFlex}>
            <div>
              <h3>Mobile</h3>
              <input
                type="number"
                placeholder="Mobile:"
                name="mobile"
                required
                className={styles.inputForm}
                value={data.mobile}
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </div>
            <div>
              <h3>Business Name</h3>
              <input
                type="text"
                placeholder="Business Name"
                name="business-name"
                className={styles.inputForm}
                onChange={(e: any) => setBusinessName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className={styles.textareaBox}>
              <h3>Leave us a message</h3>
              <textarea
                rows={6}
                cols={43}
                name="description"
                className={styles.TextareaBox1}
                placeholder="Please type your message here.."
                onChange={(e: any) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.inputFlex3}>
            <button
              type="button"
              className={styles.saveButton}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <NewFooter />
    </div>
  );
};
export default ContactUs;
